<script setup lang="ts">
interface Episode {
  id: string
  slug: string
  title: string
  number: number
  season: number
  summary: string
  formattedDate: string
  durationFormatted: string
}

defineProps<{
  episode: Episode
  featured?: boolean
}>()
</script>

<template>
  <article
    class="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-spring-200"
  >
    <!-- Content -->
    <div class="p-5">
      <!-- Meta -->
      <div class="flex items-center gap-3 text-sm text-gray-500 mb-3">
        <span class="bg-spring-100 text-spring-700 px-2 py-0.5 rounded font-medium">
          S{{ episode.season }}E{{ episode.number }}
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
