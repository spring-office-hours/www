import { fetchSchedule } from '~/server/utils/notion'

export default defineEventHandler(async (event) => {
  const schedule = await fetchSchedule(event)
  return { schedule }
})
