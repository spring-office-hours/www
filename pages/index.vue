<script setup lang="ts">
useSeoMeta({
  title: 'Spring Office Hours - A Podcast about Spring & Java',
  description:
    'Join Dan Vega and DaShaun Carter for weekly discussions about Spring Framework, Spring Boot, and the Java ecosystem.',
  ogTitle: 'Spring Office Hours Podcast',
  ogDescription:
    'Weekly discussions about Spring Framework, Spring Boot, and the Java ecosystem.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const { data: episodesData, status } = await useFetch('/api/episodes', {
  query: { page: 1, perPage: 6 },
})

const subscribeLinks = [
  {
    name: 'Apple Podcasts',
    href: 'https://podcasts.apple.com/us/podcast/spring-office-hours/id1705442696',
    icon: 'apple',
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/show/0USQE0bCpvvzk4FRls2FEK',
    icon: 'spotify',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@SpringSourceDev',
    icon: 'youtube',
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
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <!-- Left: Text Content -->
          <div class="text-center lg:text-left order-2 lg:order-1">
            <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span class="w-2 h-2 bg-spring-300 rounded-full animate-pulse" />
              <span class="text-white text-sm font-medium">New episodes weekly</span>
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span class="text-spring-300">Spring</span> Office Hours
            </h1>

            <p class="text-lg md:text-xl text-spring-100 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Your weekly deep dive into Spring Framework, Spring Boot, and the Java ecosystem
              with Dan Vega and DaShaun Carter.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <NuxtLink
                to="/episodes"
                class="inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-spring-50 text-spring-800 font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-white/25"
              >
                Browse Episodes
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
              <NuxtLink
                to="/subscribe"
                class="inline-flex items-center justify-center px-6 py-3.5 border-2 border-white/30 hover:border-white/50 text-white font-medium rounded-lg transition-all duration-200 hover:bg-white/10"
              >
                Subscribe Now
              </NuxtLink>
            </div>

            <!-- Stats -->
            <div class="flex items-center justify-center lg:justify-start gap-8 mt-10 pt-10 border-t border-white/20">
              <div>
                <div class="text-2xl font-bold text-white">100+</div>
                <div class="text-sm text-spring-200">Episodes</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-white">Weekly</div>
                <div class="text-sm text-spring-200">New Content</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-white">1hr</div>
                <div class="text-sm text-spring-200">Avg. Length</div>
              </div>
            </div>
          </div>

          <!-- Right: Hosts -->
          <div class="order-1 lg:order-2 flex justify-center">
            <div class="relative">
              <!-- Background shape -->
              <div class="absolute inset-0 bg-gradient-to-br from-spring-500/20 to-spring-600/5 rounded-3xl transform rotate-3" />

              <!-- Hosts container -->
              <div class="relative bg-spring-950/80 backdrop-blur border border-spring-600/30 rounded-3xl p-8 md:p-10">
                <div class="flex items-end gap-4 md:gap-6">
                  <!-- Dan -->
                  <div class="flex flex-col items-center group">
                    <div class="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                      <div class="absolute -inset-2 bg-spring-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img
                        src="/dan_avatar.png"
                        alt="Dan Vega"
                        class="relative max-w-full max-h-full object-contain scale-90 transform group-hover:scale-95 transition-transform duration-300"
                      />
                    </div>
                    <div class="mt-4 text-center">
                      <div class="font-semibold text-white">Dan Vega</div>
                      <div class="text-xs text-spring-300">Spring Developer Advocate</div>
                    </div>
                  </div>

                  <!-- DaShaun -->
                  <div class="flex flex-col items-center group">
                    <div class="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                      <div class="absolute -inset-2 bg-spring-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img
                        src="/dashaun_avatar.png"
                        alt="DaShaun Carter"
                        class="relative max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div class="mt-4 text-center">
                      <div class="font-semibold text-white">DaShaun Carter</div>
                      <div class="text-xs text-spring-300">Spring Developer Advocate</div>
                    </div>
                  </div>
                </div>

                <!-- "Conversation" element -->
                <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-spring-900 border border-spring-600/40 rounded-full px-4 py-2 shadow-lg">
                  <div class="flex items-center gap-2 text-sm text-spring-100">
                    <svg class="w-4 h-4 text-spring-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                    </svg>
                    <span>Live every Monday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </section>

    <!-- Latest Episodes -->
    <section class="py-16 md:py-24">
      <div class="container-wide">
        <div class="flex items-center justify-between mb-10">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-gray-900">
            Latest Episodes
          </h2>
          <NuxtLink
            to="/episodes"
            class="text-spring-600 hover:text-spring-700 font-medium transition-colors"
          >
            View All →
          </NuxtLink>
        </div>

        <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="i in 6"
            :key="i"
            class="bg-gray-100 rounded-xl h-80 animate-pulse"
          />
        </div>

        <div
          v-else-if="episodesData?.episodes?.length"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <EpisodeCard
            v-for="episode in episodesData.episodes"
            :key="episode.id"
            :episode="episode"
          />
        </div>

        <div v-else class="text-center py-12 text-gray-500">
          No episodes found. Check back soon!
        </div>
      </div>
    </section>

    <!-- Subscribe Section -->
    <section class="py-16 md:py-24 bg-gray-50">
      <div class="container-wide">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
            Never Miss an Episode
          </h2>
          <p class="text-gray-600 mb-8">
            Subscribe to Spring Office Hours on your favorite podcast platform.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a
              v-for="link in subscribeLinks"
              :key="link.name"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-secondary"
            >
              {{ link.name }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Request Episode CTA -->
    <section class="py-16 md:py-24">
      <div class="container-wide">
        <div class="bg-gradient-to-r from-spring-600 to-spring-700 rounded-2xl p-8 md:p-12 text-center">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Have a Topic in Mind?
          </h2>
          <p class="text-spring-100 mb-8 max-w-xl mx-auto">
            We love hearing from our listeners! Submit your episode ideas, questions, or guest
            suggestions.
          </p>
          <NuxtLink
            to="/potluck"
            class="btn bg-white text-spring-700 hover:bg-spring-50"
          >
            Submit a Question or Idea
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
