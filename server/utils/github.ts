import type { H3Event } from 'h3'
import { fetchAllEpisodes } from '~/server/utils/transistor'

const GITHUB_GRAPHQL = 'https://api.github.com/graphql'
const ASKED_BY = /^Asked (?:by (.+?)|anonymously) through /m

export interface PotluckSubmission {
  question: string
  name: string
  episode?: { title: string; url: string }
}

export interface PotluckQuestion {
  title: string
  url: string
  askedAt: string
  askedBy: string
  episode?: { title: string; path: string }
}

function discussionsConfig(event: H3Event) {
  const config = useRuntimeConfig(event)
  const [owner, name] = config.public.githubDiscussionsRepo.split('/')
  return {
    token: config.githubToken as string | undefined,
    owner,
    name,
    category: config.githubDiscussionsCategory as string,
    dryRun: !config.githubToken || config.potluckDryRun === 'true',
  }
}

async function graphql<T>(token: string, query: string, variables: Record<string, unknown>): Promise<T> {
  const response = await $fetch<{ data: T; errors?: Array<{ message: string }> }>(GITHUB_GRAPHQL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'User-Agent': 'springofficehours.io' },
    body: { query, variables },
  })
  if (response.errors?.length) {
    throw createError({ statusCode: 502, message: response.errors[0].message })
  }
  return response.data
}

async function findRepoAndCategory(token: string, owner: string, name: string, category: string) {
  const data = await graphql<{
    repository: { id: string; discussionCategories: { nodes: Array<{ id: string; name: string }> } }
  }>(
    token,
    `query($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        id
        discussionCategories(first: 25) { nodes { id name } }
      }
    }`,
    { owner, name }
  )
  const found = data.repository.discussionCategories.nodes.find((node) => node.name === category)
  if (!found) {
    throw createError({ statusCode: 500, message: `Discussion category "${category}" not found` })
  }
  return { repositoryId: data.repository.id, categoryId: found.id }
}

// A zero-width space after @ stops GitHub from notifying anyone a visitor mentions.
function noMentions(text: string): string {
  return text.replace(/@(?=[\w-])/g, '@​')
}

export async function createPotluckDiscussion(
  event: H3Event,
  submission: PotluckSubmission
): Promise<{ success: boolean; url?: string; dryRun?: boolean }> {
  const { token, owner, name, category, dryRun } = discussionsConfig(event)

  const oneLine = submission.question.replace(/\s+/g, ' ').trim()
  const title = noMentions(oneLine.length > 100 ? `${oneLine.slice(0, 99)}…` : oneLine)
  const askedName = noMentions(submission.name.replace(/[[\]()<>*_`#]/g, ''))
  const askedBy = askedName ? `Asked by ${askedName}` : 'Asked anonymously'
  const body = [
    noMentions(submission.question.trim()),
    '',
    '---',
    `${askedBy} through [springofficehours.io/ask](https://springofficehours.io/ask)`,
    submission.episode ? `Follow-up to [${submission.episode.title}](${submission.episode.url})` : '',
  ]
    .join('\n')
    .trim()

  if (dryRun) {
    if (!import.meta.dev) {
      throw createError({ statusCode: 500, message: 'GitHub token not configured' })
    }
    console.info('[potluck dry run] would create a discussion:', { title, body })
    return { success: true, dryRun: true }
  }

  const { repositoryId, categoryId } = await findRepoAndCategory(token!, owner, name, category)
  const data = await graphql<{ createDiscussion: { discussion: { url: string } } }>(
    token!,
    `mutation($repositoryId: ID!, $categoryId: ID!, $title: String!, $body: String!) {
      createDiscussion(input: { repositoryId: $repositoryId, categoryId: $categoryId, title: $title, body: $body }) {
        discussion { url }
      }
    }`,
    { repositoryId, categoryId, title, body }
  )
  return { success: true, url: data.createDiscussion.discussion.url }
}

export const fetchPotluckQuestions = defineCachedFunction(
  async (event: H3Event): Promise<{ recent: PotluckQuestion[]; answered: PotluckQuestion[] }> => {
    const { token, owner, name, category } = discussionsConfig(event)
    if (!token) return { recent: [], answered: [] }

    const { categoryId } = await findRepoAndCategory(token, owner, name, category)
    const data = await graphql<{
      repository: {
        discussions: {
          nodes: Array<{
            title: string
            url: string
            createdAt: string
            body: string
            isAnswered: boolean
            author: { login: string } | null
            answer: { body: string; url: string } | null
          }>
        }
      }
    }>(
      token,
      `query($owner: String!, $name: String!, $categoryId: ID!) {
        repository(owner: $owner, name: $name) {
          discussions(first: 50, categoryId: $categoryId, states: [OPEN], orderBy: { field: CREATED_AT, direction: DESC }) {
            nodes { title url createdAt body isAnswered author { login } answer { body url } }
          }
        }
      }`,
      { owner, name, categoryId }
    )

    const episodes = await fetchAllEpisodes(event).catch(() => [])
    const questions = data.repository.discussions.nodes.map((node) => {
      const asked = node.body.match(ASKED_BY)
      const question: PotluckQuestion & { isAnswered: boolean } = {
        title: node.title,
        url: node.url,
        askedAt: node.createdAt,
        askedBy: asked ? asked[1] || 'Anonymous' : node.author?.login || 'Anonymous',
        isAnswered: node.isAnswered,
      }
      const slug = node.answer?.body.match(/springofficehours\.io\/episodes\/([\w-]+)/)?.[1]
      const episode = slug && episodes.find((ep) => ep.attributes.slug === slug)
      if (episode) {
        question.episode = { title: episode.attributes.title, path: `/episodes/${slug}` }
      }
      return question
    })

    return {
      recent: questions.filter((q) => !q.isAnswered).slice(0, 6),
      answered: questions.filter((q) => q.isAnswered && q.episode).slice(0, 6),
    }
  },
  {
    name: 'potluck-questions',
    getKey: (event: H3Event) => {
      const { owner, name, category } = discussionsConfig(event)
      return `${owner}-${name}-${category}`
    },
    maxAge: 300,
  }
)
