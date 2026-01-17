import { submitPotluckQuestion } from '~/server/utils/notion'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate required fields
  const { question, name, contact } = body

  if (!question || !name) {
    throw createError({
      statusCode: 400,
      message: 'Question and name are required',
    })
  }

  if (question.length < 10) {
    throw createError({
      statusCode: 400,
      message: 'Please provide a more detailed question (at least 10 characters)',
    })
  }

  const result = await submitPotluckQuestion(event, {
    question,
    name,
    contact: contact || '',
  })

  return result
})
