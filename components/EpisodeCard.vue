<script setup lang="ts">
interface Episode {
  id: string
  slug: string
  title: string
  number: number
  season: number
  summary: string
  publishedAt?: string
  formattedDate: string
  duration?: number
  durationFormatted: string
}

const props = defineProps<{
  episode: Episode
  featured?: boolean
}>()

// Pin the time zone so the server and the browser render the same date.
const shortDate = computed(() =>
  props.episode.publishedAt
    ? new Date(props.episode.publishedAt).toLocaleDateString('en-US', {
        timeZone: 'America/New_York',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : props.episode.formattedDate
)

const length = computed(() =>
  props.episode.duration ? `${Math.round(props.episode.duration / 60)} min` : props.episode.durationFormatted
)
</script>

<template>
  <article
    class="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-spring-200"
  >
    <!-- Content -->
    <div class="p-5">
      <!-- Meta -->
      <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 mb-3">
        <span class="bg-spring-100 text-spring-700 px-2 py-0.5 rounded font-medium">
          S{{ episode.season }}E{{ episode.number }}
        </span>
        <time :datetime="episode.publishedAt" class="whitespace-nowrap">{{ shortDate }}</time>
        <span class="whitespace-nowrap">
          <span aria-hidden="true">·</span>
          <span class="sr-only">Duration:</span>
          {{ length }}
        </span>
      </div>

      <!-- Title -->
      <h3 :class="['font-semibold text-gray-900 mb-2', featured ? 'text-xl' : 'text-lg']">
        <NuxtLink
          :to="`/episodes/${episode.slug}`"
          class="hover:text-spring-600 transition-colors"
        >
          {{ episode.title }}
        </NuxtLink>
      </h3>

      <!-- Summary -->
      <p class="text-gray-600 text-sm line-clamp-2 mb-4">
        {{ episode.summary }}
      </p>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <NuxtLink
          :to="`/episodes/${episode.slug}`"
          class="inline-flex items-center gap-2 text-spring-600 font-medium text-sm hover:text-spring-700 transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          Listen Now
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
