import { fetchSchedule } from '~/server/utils/schedule'

export default defineEventHandler(async () => {
  const schedule = await fetchSchedule()
  return { schedule }
})
