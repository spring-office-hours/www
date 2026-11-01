<script setup lang="ts">
useSeoMeta({
  title: 'Ask a Question - Spring Office Hours',
  description:
    'Submit your questions for our Potluck episodes or suggest topics for future shows! We dedicate episodes to answering listener questions about Spring, Java, and software development.',
})

const route = useRoute()
const followUpSlug = computed(() => (typeof route.query.episode === 'string' ? route.query.episode : ''))

const form = reactive({
  question: '',
  name: '',
  website: '',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')
const discussionUrl = ref('')

const discussionsUrl = `https://github.com/${useRuntimeConfig().public.githubDiscussionsRepo}/discussions`
const { data: questions } = await useFetch('/api/potluck', { lazy: true })

function formatAskedAt(date: string): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

async function handleSubmit() {
  isSubmitting.value = true
  submitError.value = ''

  try {
    const result = await $fetch<{ url?: string }>('/api/potluck', {
      method: 'POST',
      body: { ...form, episode: followUpSlug.value },
    })

    discussionUrl.value = result.url ?? ''
    submitSuccess.value = true
    form.question = ''
    form.name = ''
  } catch (error: any) {
    submitError.value = error.data?.message || 'Failed to submit question. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-spring-700 via-spring-800 to-spring-950 py-12 md:py-16">
      <div class="absolute inset-0 opacity-[0.07]" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;1&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-spring-400/15 rounded-full blur-3xl" />

      <div class="container-wide relative">
        <div class="text-center">
          <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span class="text-white text-sm font-medium">Potluck episodes</span>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Ask a <span class="text-spring-300">question</span>
          </h1>

          <p class="mx-auto max-w-[48ch] text-lg text-spring-100 text-pretty">
            Ask about Spring, Java or your career. We answer listener questions on the show.
          </p>
        </div>
      </div>
    </section>

    <!-- Form and potluck explainer -->
    <section id="ask" class="py-12 md:py-16 scroll-mt-20">
      <div class="container-wide">
        <div class="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[3fr_2fr]">
          <div>
            <!-- Success Message -->
            <div
              v-if="submitSuccess"
              class="bg-spring-50 border border-spring-200 rounded-xl p-8 text-center"
            >
              <div class="w-16 h-16 bg-spring-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-spring-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Question Received!</h3>
              <p class="text-gray-600 mb-6">
                Thanks for asking. We read every question.
                <a v-if="discussionUrl" :href="discussionUrl" target="_blank" rel="noopener noreferrer" class="text-spring-700 underline">
                  See it on GitHub.
                </a>
              </p>
              <button
                class="btn btn-primary"
                @click="submitSuccess = false"
              >
                Submit Another
              </button>
            </div>

            <!-- Form -->
            <form
              v-else
              class="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 shadow-sm"
              @submit.prevent="handleSubmit"
            >
              <p class="mb-6 font-medium text-spring-700">
              We read every question. If we answer yours, we'll give you a shoutout.
            </p>

            <!-- Error Message -->
              <div
                v-if="submitError"
                class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm"
              >
                {{ submitError }}
              </div>

              <div v-if="followUpSlug" class="mb-6 bg-spring-50 border border-spring-200 rounded-lg p-4 text-sm text-spring-800">
                Your question will link to
                <NuxtLink :to="`/episodes/${followUpSlug}`" class="underline">this episode</NuxtLink>.
              </div>

              <!-- Question -->
              <div class="mb-6">
                <label for="question" class="block text-sm font-medium text-gray-700 mb-2">
                  Your Question or Topic Idea <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="question"
                  v-model="form.question"
                  rows="4"
                  required
                  minlength="10"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spring-500 focus:border-spring-500 transition-colors resize-none"
                  placeholder="Ask a question or suggest a topic for a future episode..."
                />
                <p class="mt-1 text-sm text-gray-500">
                  The more context you provide, the better we can answer your question.
                </p>
              </div>

              <!-- Name -->
              <div class="mb-6">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Your Name or Handle (Optional)
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  maxlength="80"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spring-500 focus:border-spring-500 transition-colors"
                  placeholder="How should we give you a shoutout?"
                />
                <p class="mt-1 text-sm text-gray-500">
                  Anonymous is fine.
                </p>
              </div>

              <div class="absolute -left-[9999px]" aria-hidden="true">
                <label for="website">Leave this empty</label>
                <input id="website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
              </div>

              <p class="mb-6 text-sm text-gray-500">
                Your question and name are posted publicly in our
                <a :href="discussionsUrl" target="_blank" rel="noopener noreferrer" class="underline hover:text-spring-600">GitHub Discussions</a>.
              </p>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                      fill="none"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Submitting...
                </span>
                <span v-else>Send My Question</span>
              </button>
            </form>
          </div>

          <aside class="text-gray-600">
            <h2 class="text-xl font-display font-semibold text-gray-900">What is a potluck episode?</h2>
            <p class="mt-3 text-pretty">
              Every now and then, we set aside our plans and spend a whole episode on your questions.
              No question is too simple or too complex.
            </p>
            <p class="mt-3 text-pretty">
              Topic and guest ideas are welcome too.
            </p>

            <h3 class="mt-8 font-semibold text-gray-900">Topics we cover</h3>
            <ul role="list" class="mt-3 space-y-3">
              <li class="flex items-start gap-3">
                <svg class="size-5 shrink-0 text-spring-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Spring Framework &amp; Spring Boot</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="size-5 shrink-0 text-spring-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Java language features &amp; best practices</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="size-5 shrink-0 text-spring-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Career advice &amp; professional growth</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="size-5 shrink-0 text-spring-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Architecture &amp; design patterns</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="size-5 shrink-0 text-spring-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Tools &amp; development workflows</span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>

    <section v-if="questions?.recent?.length || questions?.answered?.length" class="pb-16 md:pb-24">
      <div class="container-wide">
        <div
          :class="[
            'grid gap-8 mx-auto',
            questions?.answered?.length && questions?.recent?.length ? 'md:grid-cols-2 max-w-5xl' : 'max-w-2xl',
          ]"
        >
          <div v-if="questions?.answered?.length">
            <h2 class="text-2xl font-display font-bold text-gray-900 mb-6">Answered on the Show</h2>
            <ul class="space-y-4">
              <li
                v-for="item in questions.answered"
                :key="item.url"
                class="bg-white border border-gray-100 rounded-xl p-5"
              >
                <a :href="item.url" target="_blank" rel="noopener noreferrer" class="font-medium text-gray-900 hover:text-spring-600 transition-colors">
                  {{ item.title }}
                </a>
                <p class="mt-1 text-sm text-gray-500">Asked by {{ item.askedBy }}</p>
                <NuxtLink
                  v-if="item.episode"
                  :to="item.episode.path"
                  class="mt-3 inline-flex items-center gap-2 text-sm font-medium text-spring-700 hover:text-spring-800"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {{ item.episode.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div v-if="questions?.recent?.length">
            <h2 class="text-2xl font-display font-bold text-gray-900 mb-6">Recently Asked</h2>
            <ul class="space-y-4">
              <li
                v-for="item in questions.recent"
                :key="item.url"
                class="bg-white border border-gray-100 rounded-xl p-5"
              >
                <a :href="item.url" target="_blank" rel="noopener noreferrer" class="font-medium text-gray-900 hover:text-spring-600 transition-colors">
                  {{ item.title }}
                </a>
                <p class="mt-1 text-sm text-gray-500">
                  Asked by {{ item.askedBy }} · {{ formatAskedAt(item.askedAt) }}
                </p>
              </li>
            </ul>
            <a :href="discussionsUrl" target="_blank" rel="noopener noreferrer" class="mt-6 inline-block text-sm font-medium text-spring-700 hover:text-spring-800">
              See every question on GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
