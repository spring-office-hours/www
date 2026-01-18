<script setup lang="ts">
useSeoMeta({
  title: 'Subscribe - Spring Office Hours',
  description:
    'Subscribe to Spring Office Hours podcast on your favorite platform. Available on Apple Podcasts, Spotify, YouTube, and more.',
})

const platforms = [
  {
    name: 'Apple Podcasts',
    description: 'Listen on your iPhone, iPad, or Mac',
    href: 'https://podcasts.apple.com/us/podcast/spring-office-hours/id1684981362',
    icon: 'apple',
    color: 'bg-gray-900 hover:bg-gray-800',
  },
  {
    name: 'Spotify',
    description: 'Stream on Spotify for free',
    href: 'https://open.spotify.com/show/7duUEA5BL1RRQI6aloOX4E',
    icon: 'spotify',
    color: 'bg-[#1DB954] hover:bg-[#1aa34a]',
  },
  {
    name: 'YouTube',
    description: 'Watch video episodes and live streams',
    href: 'https://www.youtube.com/@SpringSourceDev',
    icon: 'youtube',
    color: 'bg-[#FF0000] hover:bg-[#cc0000]',
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
  },
  {
    name: 'RSS Feed',
    description: 'Use with any podcast app',
    href: 'https://feeds.transistor.fm/spring-office-hours',
    icon: 'rss',
    color: 'bg-orange-500 hover:bg-orange-600',
  },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-spring-700 via-spring-800 to-spring-950 py-16 md:py-24">
      <!-- Subtle grid pattern -->
      <div class="absolute inset-0 opacity-[0.07]" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;1&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');" />

      <!-- Glowing orb accent -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-spring-400/15 rounded-full blur-3xl" />

      <div class="container-wide relative">
        <div class="max-w-3xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <svg class="w-4 h-4 text-spring-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="text-white text-sm font-medium">Never Miss an Episode</span>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Subscribe to <span class="text-spring-300">Spring Office Hours</span>
          </h1>

          <p class="text-lg md:text-xl text-spring-100 leading-relaxed">
            Get notified when new episodes are released. Available on all major podcast platforms.
          </p>
        </div>
      </div>
    </section>

    <!-- Platforms Section -->
    <section class="py-16 md:py-20">
      <div class="container-wide">
        <!-- Platforms Grid -->
        <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          v-for="platform in platforms"
          :key="platform.name"
          :href="platform.href"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-xl hover:shadow-lg transition-all"
        >
          <!-- Icon -->
          <div :class="['w-14 h-14 rounded-xl flex items-center justify-center text-white', platform.color]">
            <!-- Apple -->
            <svg v-if="platform.icon === 'apple'" class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <!-- Spotify -->
            <svg v-else-if="platform.icon === 'spotify'" class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <!-- YouTube -->
            <svg v-else-if="platform.icon === 'youtube'" class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <!-- Pocket Casts -->
            <svg v-else-if="platform.icon === 'pocketcasts'" class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 3.6c4.636 0 8.4 3.764 8.4 8.4 0 4.636-3.764 8.4-8.4 8.4-4.636 0-8.4-3.764-8.4-8.4 0-4.636 3.764-8.4 8.4-8.4zm0 2.4a6 6 0 100 12 6 6 0 000-12zm0 2.4a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2z" />
            </svg>
            <!-- Amazon -->
            <svg v-else-if="platform.icon === 'amazon'" class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.493.126.112.18.072.347-.117.504a17.91 17.91 0 01-.755.596c-.29.22-.645.47-1.063.752-.417.28-.847.547-1.29.803a15.143 15.143 0 01-2.896 1.356 10.1 10.1 0 01-3.22.564c-1.57 0-3.074-.337-4.512-1.012a14.482 14.482 0 01-3.66-2.528 7.79 7.79 0 01-.452-.428l-.217-.196a.39.39 0 01-.146-.165.208.208 0 01-.022-.062.123.123 0 01.014-.053c.017-.036.03-.057.04-.063zM6.092 15.32a1.62 1.62 0 01-.104-.195c-.073-.18-.103-.355-.089-.52.014-.173.086-.297.214-.373l.333-.14c.353-.14.698-.273 1.035-.398.338-.126.655-.24.95-.342.296-.103.543-.19.743-.257.2-.068.352-.121.458-.16.106-.04.16-.058.166-.055.085.038.13.122.132.254.002.132-.037.268-.115.408a2.365 2.365 0 01-.412.512c-.148.14-.31.28-.487.42-.178.14-.348.27-.513.39-.164.12-.304.226-.417.315l-.216.17-.155.113-.21.173c-.256.22-.54.455-.85.698-.312.243-.576.45-.795.618-.36.28-.64.487-.837.62-.197.132-.336.218-.416.258-.08.04-.133.061-.16.062-.027.001-.046-.014-.058-.045a.18.18 0 01-.016-.06c-.004-.02-.006-.037-.004-.052.001-.015.003-.024.008-.028.02-.017.09-.082.21-.195.12-.114.26-.255.418-.424.159-.168.32-.35.486-.543.165-.192.305-.37.42-.53.116-.162.178-.278.185-.35zm16.073-1.21c.188.037.354.106.494.207.14.1.265.21.373.325.11.116.203.227.28.335.077.107.143.205.198.296.056.09.104.163.148.218l.096.125c.026.028.04.05.04.065 0 .024-.018.055-.05.094-.035.04-.087.09-.154.148-.068.06-.144.124-.23.194-.086.07-.176.143-.27.216-.094.074-.182.143-.264.208-.08.064-.146.12-.196.164-.05.043-.08.066-.087.069a.105.105 0 01-.065-.01.25.25 0 01-.076-.065.562.562 0 01-.076-.123c-.024-.053-.05-.118-.078-.193-.028-.075-.053-.156-.076-.243a2.083 2.083 0 01-.052-.23 2.186 2.186 0 01-.027-.187 1.27 1.27 0 01.006-.133.23.23 0 01.027-.084.11.11 0 01.05-.048.168.168 0 01.06-.017c.02-.002.043.001.066.01.023.008.056.02.099.038.043.018.096.045.16.08.063.036.142.083.234.14.093.058.195.124.308.198.113.074.227.152.342.234z" />
            </svg>
            <!-- RSS -->
            <svg v-else-if="platform.icon === 'rss'" class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
            </svg>
          </div>

          <!-- Content -->
          <div class="flex-1">
            <h2 class="font-semibold text-gray-900 group-hover:text-spring-600 transition-colors">
              {{ platform.name }}
            </h2>
            <p class="text-sm text-gray-500">
              {{ platform.description }}
            </p>
          </div>

          <!-- Arrow -->
          <svg
            class="w-5 h-5 text-gray-400 group-hover:text-spring-600 group-hover:translate-x-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>

      <!-- RSS Info -->
      <div class="max-w-2xl mx-auto mt-12 p-6 bg-gray-50 rounded-xl text-center">
        <h3 class="font-semibold text-gray-900 mb-2">Prefer RSS?</h3>
        <p class="text-gray-600 text-sm mb-4">
          Copy our RSS feed URL to add Spring Office Hours to any podcast app:
        </p>
        <code class="block bg-white px-4 py-2 rounded-lg text-sm text-gray-700 border border-gray-200 select-all">
          https://feeds.transistor.fm/spring-office-hours
        </code>
      </div>
    </div>
    </section>
  </div>
</template>
