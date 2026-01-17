import { submitEpisodeRequest } from '~/server/utils/notion'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate required fields
  const { name, email, topic, description } = body

  if (!name || !email || !topic) {
    throw createError({
      statusCode: 400,
      message: 'Name, email, and topic are required',
    })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid email address',
    })
  }

  const result = await submitEpisodeRequest(event, {
    name,
    email,
    topic,
    description: description || '',
  })

  return result
})
