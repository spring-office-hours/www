export interface Platform {
  name: string
  description: string
  href: string
  icon: string
  color: string
  featured?: boolean
}

export const platforms: Platform[] = [
  {
    name: 'Apple Podcasts',
    description: 'Listen on your iPhone, iPad, or Mac',
    href: 'https://podcasts.apple.com/us/podcast/spring-office-hours/id1684981362',
    icon: 'apple',
    color: 'bg-gray-900 hover:bg-gray-800',
    featured: true,
  },
  {
    name: 'Spotify',
    description: 'Stream on Spotify for free',
    href: 'https://open.spotify.com/show/7duUEA5BL1RRQI6aloOX4E',
    icon: 'spotify',
    color: 'bg-[#1DB954] hover:bg-[#1aa34a]',
    featured: true,
  },
  {
    name: 'YouTube',
    description: 'Watch video episodes and live streams',
    href: 'https://www.youtube.com/@SpringSourceDev',
    icon: 'youtube',
    color: 'bg-[#FF0000] hover:bg-[#cc0000]',
    featured: true,
  },
  {
    name: 'Pocket Casts',
    description: 'Listen on any device with Pocket Casts',
    href: 'https://pca.st/itunes/1684981362',
    icon: 'pocketcasts',
    color: 'bg-[#F43E37] hover:bg-[#d9352f]',
  },
  {
    name: 'Amazon Music',
    description: 'Available on Alexa and Echo devices',
    href: 'https://music.amazon.com/podcasts/8cf400c6-4a10-4e31-82b7-8be0d08047d1',
    icon: 'amazon',
    color: 'bg-[#FF9900] hover:bg-[#e68a00]',
    featured: true,
  },
  {
    name: 'RSS Feed',
    description: 'Use with any podcast app',
    href: 'https://feeds.transistor.fm/spring-office-hours',
    icon: 'rss',
    color: 'bg-orange-500 hover:bg-orange-600',
  },
]

export const featuredPlatforms = platforms.filter((platform) => platform.featured)
