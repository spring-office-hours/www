<script setup lang="ts">
useSeoMeta({
  title: 'Upcoming Schedule - Spring Office Hours',
  description:
    'See what episodes are coming up on Spring Office Hours. Check out planned topics and scheduled guests.',
})

const { data: scheduleData, status } = await useFetch('/api/schedule')

function formatDate(dateString: string): string {
  if (!dateString) return 'TBD'
  // Parse date parts to avoid timezone issues (YYYY-MM-DD format)
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="py-12 md:py-16">
    <div class="container-wide">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          Upcoming Schedule
        </h1>
        <p class="text-gray-600 text-lg max-w-2xl">
          Here's what we have planned for upcoming episodes. Topics and guests are subject to
          change. Want to suggest a topic?
          <NuxtLink to="/requests" class="text-spring-600 hover:text-spring-700">
            Submit a request →
          </NuxtLink>
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="status === 'pending'" class="space-y-4">
        <div v-for="i in 5" :key="i" class="bg-gray-100 rounded-xl h-32 animate-pulse" />
      </div>

      <!-- Schedule List -->
      <div v-else-if="scheduleData?.schedule?.length" class="space-y-4">
        <article
          v-for="item in scheduleData.schedule"
          :key="item.id"
          class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Date Badge -->
            <div class="flex-shrink-0">
              <div class="inline-flex items-center px-3 py-1 rounded-full bg-spring-50 text-spring-700 text-sm font-medium whitespace-nowrap">
                {{ formatDate(item.date) }}
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-gray-900">
                <span v-if="item.episodeCode" class="text-gray-400 font-normal">{{ item.episodeCode }}</span>
                {{ item.title }}
              </h2>
              <p v-if="item.guests && item.guests.trim()" class="text-gray-600 mt-1">
                with {{ item.guests }}
              </p>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-gray-50 rounded-xl">
        <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">No Upcoming Episodes</h2>
        <p class="text-gray-600 mb-6">
          We're planning new content! Check back soon or subscribe to get notified.
        </p>
        <NuxtLink to="/subscribe" class="btn btn-primary">
          Subscribe Now
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
