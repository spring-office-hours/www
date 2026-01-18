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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="text-white text-sm font-medium">Coming Up Next</span>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Upcoming <span class="text-spring-300">Schedule</span>
          </h1>

          <p class="text-lg md:text-xl text-spring-100 leading-relaxed">
            Here's what we have planned for upcoming episodes. Topics and guests are subject to change.
            Want to suggest a topic?
            <NuxtLink to="/potluck" class="text-white underline hover:text-spring-200 transition-colors">
              Submit a question or idea
            </NuxtLink>
          </p>
        </div>
      </div>
    </section>

    <!-- Schedule Content -->
    <section class="py-16 md:py-20">
      <div class="container-wide">
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
    </section>
  </div>
</template>
