<script setup lang="ts">
interface Episode {
  id: string
  slug: string
  title: string
  shortTitle?: string
  number: number
  season: number
  summary?: string
  publishedAt?: string
  formattedDate: string
  duration?: number
  durationFormatted: string
}

const props = defineProps<{
  episode: Episode
  compact?: boolean
  showSeason?: boolean
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
  <article class="group relative flex gap-x-5 py-6 sm:gap-x-8">
    <div class="w-10 shrink-0 text-right sm:w-14">
      <p v-if="showSeason" class="text-sm/6 font-medium text-gray-500">S{{ episode.season }}</p>
      <p class="font-display text-3xl tracking-tight text-spring-600 tabular-nums sm:text-4xl">
        <span class="sr-only">Episode </span>{{ episode.number }}
      </p>
    </div>

    <div :class="['min-w-0 flex-1', !compact && 'lg:flex lg:gap-x-12']">
      <div class="min-w-0 flex-1">
        <h3 class="text-lg font-semibold text-balance text-gray-900 group-hover:text-spring-700">
          <NuxtLink :to="`/episodes/${episode.slug}`" class="focus-visible:outline-none">
            <span class="absolute inset-0 rounded-lg group-has-focus-visible:outline-2 group-has-focus-visible:outline-spring-600" />
            {{ episode.shortTitle || episode.title }}
          </NuxtLink>
        </h3>
        <p
          v-if="episode.summary && !compact"
          class="mt-1 line-clamp-2 max-w-[70ch] text-base/7 text-pretty text-gray-600 sm:text-sm/6"
        >
          {{ episode.summary }}
        </p>
      </div>

      <p
        :class="[
          'mt-2 text-base/7 whitespace-nowrap text-gray-500 sm:text-sm/6',
          !compact && 'lg:mt-1 lg:w-32 lg:shrink-0 lg:text-right',
        ]"
      >
        <time :datetime="episode.publishedAt">{{ shortDate }}</time>
        <span aria-hidden="true" :class="!compact && 'lg:hidden'"> · </span>
        <br v-if="!compact" class="max-lg:hidden" />
        <span class="sr-only">Duration: </span>{{ length }}
      </p>
    </div>
  </article>
</template>
