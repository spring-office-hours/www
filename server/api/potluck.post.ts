import { createPotluckDiscussion } from '~/server/utils/github'
import { fetchAllEpisodes } from '~/server/utils/transistor'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const question = String(body?.question ?? '').trim()
  const name = String(body?.name ?? '').trim()

  // Bots fill in the hidden website field. Pretend it worked.
  if (body?.website) {
    return { success: true }
  }

  if (question.length < 10) {
    throw createError({
      statusCode: 400,
      message: 'Please provide a more detailed question (at least 10 characters)',
    })
  }

  if (question.length > 2000) {
    throw createError({ statusCode: 400, message: 'Please keep your question under 2,000 characters' })
  }

  if (name.length > 80) {
    throw createError({ statusCode: 400, message: 'Please keep your name under 80 characters' })
  }

  let episode
  if (typeof body?.episode === 'string' && body.episode) {
    const found = (await fetchAllEpisodes(event)).find((ep) => ep.attributes.slug === body.episode)
    if (found) {
      episode = {
        title: found.attributes.title,
        url: `https://springofficehours.io/episodes/${found.attributes.slug}`,
      }
    }
  }

  return await createPotluckDiscussion(event, { question, name, episode })
})
