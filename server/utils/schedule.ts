import { parse } from 'yaml'

export interface ScheduleItem {
  id: string
  episodeCode: string
  title: string
  date: string
  guests: string
  abstract: string
  youtube: string
}

interface ScheduleEntry {
  episode?: string
  title?: string
  date?: string
  guests?: string | string[]
  abstract?: string
  youtube?: string
}

export async function fetchSchedule(): Promise<ScheduleItem[]> {
  const file = await useStorage('assets:content').getItem<string>('schedule.yaml')
  const entries: ScheduleEntry[] = parse(String(file ?? '')) ?? []

  // Keep a show listed through its whole day in Eastern time.
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date())

  return entries
    .map((entry, index) => ({
      id: `${entry.episode || 'show'}-${index}`,
      episodeCode: entry.episode ?? '',
      title: entry.title || 'TBD',
      date: entry.date ?? '',
      guests: Array.isArray(entry.guests) ? entry.guests.join(', ') : entry.guests ?? '',
      abstract: entry.abstract ?? '',
      youtube: entry.youtube ?? '',
    }))
    .filter((item) => !item.date || item.date.slice(0, 10) >= today)
    .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'))
}
