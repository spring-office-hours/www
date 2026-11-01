import { fetchPotluckQuestions } from '~/server/utils/github'

export default defineEventHandler(async (event) => {
  try {
    return await fetchPotluckQuestions(event)
  } catch (error) {
    console.error('Failed to load potluck questions:', error)
    return { recent: [], answered: [] }
  }
})
