<script setup lang="ts">
useSeoMeta({
  title: 'All Episodes - Spring Office Hours',
  description:
    'Browse all episodes of Spring Office Hours podcast. Learn about Spring Framework, Spring Boot, and the Java ecosystem.',
})

const route = useRoute()
const currentPage = computed(() => Number(route.query.page) || 1)
const perPage = 20
const searchQuery = ref('')
const selectedSeason = ref<string>('')

// Loads every episode so search and the season filter work on the client.
const { data: episodesData, status } = await useFetch('/api/episodes')

// Get unique seasons for filter
const seasons = computed(() => {
  if (!episodesData.value?.episodes) return []
  const uniqueSeasons = [...new Set(episodesData.value.episodes.map((ep: any) => ep.season))]
  return uniqueSeasons.sort((a, b) => b - a)
})

// Filter episodes based on search and season
const filteredEpisodes = computed(() => {
  if (!episodesData.value?.episodes) return []

  let episodes = episodesData.value.episodes

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    episodes = episodes.filter(
      (ep: any) =>
        ep.title.toLowerCase().includes(query) ||
        ep.summary?.toLowerCase().includes(query)
    )
  }

  // Filter by season
  if (selectedSeason.value) {
    episodes = episodes.filter((ep: any) => ep.season === Number(selectedSeason.value))
  }

  return episodes
})

// Paginate filtered results
const paginatedEpisodes = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredEpisodes.value.slice(start, start + perPage)
})

const totalPages = computed(() => Math.ceil(filteredEpisodes.value.length / perPage) || 1)

const seasonGroups = computed(() => {
  const groups: { season: number; episodes: any[] }[] = []
  for (const episode of paginatedEpisodes.value) {
    const last = groups.at(-1)
    if (last?.season === episode.season) last.episodes.push(episode)
    else groups.push({ season: episode.season, episodes: [episode] })
  }
  return groups
})

watch([searchQuery, selectedSeason], () => {
  if (currentPage.value > 1) goToPage(1)
})

function goToPage(page: number) {
  navigateTo({
    path: '/episodes',
    query: { page },
  })
}

function clearFilters() {
  searchQuery.value = ''
  selectedSeason.value = ''
  goToPage(1)
}
</script>

<template>
  <div class="py-12 md:py-16">
    <div class="container-wide">
      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          All Episodes
        </h1>
        <p class="text-gray-600 text-lg">
          Browse through all our podcast episodes about Spring and Java.
        </p>
      </div>

      <!-- Search and Filter -->
      <div class="mb-8 flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1 relative">
          <label for="episode-search" class="sr-only">Search episodes</label>
          <svg
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            id="episode-search"
            v-model="searchQuery"
            type="search"
            placeholder="Search episodes..."
            class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spring-500 focus:border-spring-500 transition-colors"
          />
        </div>

        <!-- Season Filter -->
        <div>
          <label for="season-filter" class="sr-only">Filter by season</label>
          <select
            id="season-filter"
            v-model="selectedSeason"
            class="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spring-500 focus:border-spring-500 bg-white"
          >
            <option value="">All Seasons</option>
            <option v-for="season in seasons" :key="season" :value="season">
              Season {{ season }}
            </option>
          </select>
        </div>

        <!-- Clear Filters -->
        <button
          v-if="searchQuery || selectedSeason"
          class="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          @click="clearFilters"
        >
          Clear
        </button>
      </div>

      <!-- Results count -->
      <p v-if="searchQuery || selectedSeason" class="mb-6 text-sm text-gray-500">
        Found {{ filteredEpisodes.length }} episode{{ filteredEpisodes.length !== 1 ? 's' : '' }}
      </p>

      <div v-if="status === 'pending'" class="flex flex-col gap-4">
        <div v-for="i in 6" :key="i" class="h-24 animate-pulse rounded-xl bg-gray-100" />
      </div>

      <div v-else-if="paginatedEpisodes.length" class="flex flex-col gap-10">
        <section v-for="group in seasonGroups" :key="group.season">
          <h2 class="border-b border-gray-950/10 pb-3 font-display text-xl font-semibold text-gray-900">
            Season {{ group.season }}
          </h2>
          <ul role="list" class="divide-y divide-gray-950/5">
            <li v-for="episode in group.episodes" :key="episode.id">
              <EpisodeRow :episode="episode" />
            </li>
          </ul>
        </section>
      </div>

      <div v-else class="text-center py-12 text-gray-500">
        <p v-if="searchQuery || selectedSeason">
          No episodes match your filters.
          <button class="text-spring-600 hover:underline ml-1" @click="clearFilters">
            Clear filters
          </button>
        </p>
        <p v-else>No episodes found.</p>
      </div>

      <!-- Pagination -->
      <nav
        v-if="totalPages > 1"
        class="mt-12 flex items-center justify-center gap-2"
        aria-label="Pagination"
      >
        <button
          :disabled="currentPage <= 1"
          class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </button>

        <div class="flex items-center gap-1">
          <button
            v-for="page in totalPages"
            :key="page"
            :class="[
              'w-10 h-10 rounded-lg font-medium transition-colors',
              page === currentPage
                ? 'bg-spring-600 text-white'
                : 'text-gray-600 hover:bg-gray-100',
            ]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>

        <button
          :disabled="currentPage >= totalPages"
          class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </nav>
    </div>
  </div>
</template>
