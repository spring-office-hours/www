<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: episode, status, error } = await useFetch(`/api/episodes/${slug}`)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Episode Not Found',
  })
}

useSeoMeta({
  title: () => episode.value ? `${episode.value.title} - Spring Office Hours` : 'Episode - Spring Office Hours',
  description: () => episode.value?.summary || '',
  ogTitle: () => episode.value?.title || 'Spring Office Hours Episode',
  ogDescription: () => episode.value?.summary || '',
  ogType: 'article',
  ogImage: () => episode.value?.imageUrl || '',
  twitterCard: 'summary_large_image',
})

// JSON-LD structured data
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'PodcastEpisode',
          name: episode.value?.title,
          description: episode.value?.summary,
          datePublished: episode.value?.publishedAt,
          duration: `PT${Math.floor((episode.value?.duration || 0) / 60)}M`,
          url: `https://springofficehours.io/episodes/${slug}`,
          image: episode.value?.imageUrl,
          partOfSeries: {
            '@type': 'PodcastSeries',
            name: 'Spring Office Hours',
            url: 'https://springofficehours.io',
          },
        })
      ),
    },
  ],
})

function shareEpisode() {
  if (navigator.share) {
    navigator.share({
      title: episode.value?.title,
      text: episode.value?.summary,
      url: window.location.href,
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }
}

const youtubeVideoId = computed(() => {
  const url = episode.value?.youtubeUrl
  if (!url) return null

  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
})
</script>

<template>
  <div class="py-12 md:py-16">
    <div class="container-narrow">
      <!-- Loading State -->
      <div v-if="status === 'pending'" class="animate-pulse space-y-6">
        <div class="h-8 bg-gray-200 rounded w-1/4" />
        <div class="h-12 bg-gray-200 rounded w-3/4" />
        <div class="aspect-video bg-gray-200 rounded-xl" />
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded w-full" />
          <div class="h-4 bg-gray-200 rounded w-5/6" />
          <div class="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      </div>

      <!-- Episode Content -->
      <article v-else-if="episode">
        <!-- Back Link -->
        <NuxtLink
          to="/episodes"
          class="inline-flex items-center gap-2 text-gray-600 hover:text-spring-600 mb-8 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Episodes
        </NuxtLink>

        <!-- Header -->
        <header class="mb-8">
          <!-- Meta -->
          <div class="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span class="bg-spring-100 text-spring-700 px-3 py-1 rounded-full font-medium">
              Season {{ episode.season }}, Episode {{ episode.number }}
            </span>
            <span>{{ episode.formattedDate }}</span>
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="sr-only">Duration:</span>
              {{ episode.durationFormatted }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            {{ episode.title }}
          </h1>

          <!-- Summary -->
          <p class="text-lg text-gray-600 leading-relaxed">
            {{ episode.summary }}
          </p>
        </header>

        <!-- Audio Player -->
        <div class="mb-8 bg-gray-50 rounded-xl p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Listen to This Episode</h2>
          <audio
            :src="episode.mediaUrl"
            controls
            class="w-full"
            preload="metadata"
          />
        </div>

        <!-- YouTube Video -->
        <div v-if="youtubeVideoId" class="mb-8">
          <h2 class="font-semibold text-gray-900 mb-4">Watch This Episode</h2>
          <div class="aspect-video rounded-xl overflow-hidden">
            <iframe
              :src="`https://www.youtube.com/embed/${youtubeVideoId}`"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              class="w-full h-full"
            />
          </div>
        </div>

        <!-- Share Button -->
        <div class="flex items-center gap-4 mb-8">
          <button
            class="btn btn-secondary"
            @click="shareEpisode"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share Episode
          </button>
          <a
            :href="episode.shareUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 hover:text-spring-600 transition-colors"
          >
            View on Transistor →
          </a>
        </div>

        <!-- Description / Show Notes -->
        <div class="prose prose-lg max-w-none">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Show Notes</h2>
          <div v-html="episode.description" />
        </div>

        <!-- Transcript -->
        <div v-if="episode.transcriptUrl" class="mt-12 pt-8 border-t border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Transcript</h2>
          <a
            :href="episode.transcriptUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-spring-600 hover:text-spring-700 transition-colors"
          >
            Download Transcript →
          </a>
        </div>

        <!-- Related Episodes -->
        <div
          v-if="episode.relatedEpisodes?.length"
          class="mt-12 pt-8 border-t border-gray-200"
        >
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            More from Season {{ episode.season }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EpisodeCard
              v-for="related in episode.relatedEpisodes"
              :key="related.id"
              :episode="related"
            />
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
