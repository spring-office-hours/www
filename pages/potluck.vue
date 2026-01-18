<script setup lang="ts">
useSeoMeta({
  title: 'Potluck Q&A & Topic Ideas - Spring Office Hours',
  description:
    'Submit your questions for our Potluck episodes or suggest topics for future shows! We dedicate episodes to answering listener questions about Spring, Java, and software development.',
})

const form = reactive({
  question: '',
  name: '',
  contact: '',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

async function handleSubmit() {
  isSubmitting.value = true
  submitError.value = ''

  try {
    await $fetch('/api/potluck', {
      method: 'POST',
      body: form,
    })

    submitSuccess.value = true
    // Reset form
    form.question = ''
    form.name = ''
    form.contact = ''
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
    <section class="relative overflow-hidden bg-gradient-to-br from-spring-700 via-spring-800 to-spring-950 py-16 md:py-24">
      <!-- Subtle grid pattern -->
      <div class="absolute inset-0 opacity-[0.07]" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;1&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');" />

      <!-- Glowing orb accent -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-spring-400/15 rounded-full blur-3xl" />

      <div class="container-wide relative">
        <div class="max-w-3xl mx-auto text-center">
          <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span class="text-2xl">🍲</span>
            <span class="text-white text-sm font-medium">Community Q&A & Ideas</span>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            <span class="text-spring-300">Potluck</span> Episodes
          </h1>

          <p class="text-lg md:text-xl text-spring-100 leading-relaxed">
            Got questions about Spring, Java, or software development? Want to suggest topics for future episodes?
            Submit them here and we might feature them in an upcoming show!
          </p>
        </div>
      </div>
    </section>

    <!-- What is Potluck Section -->
    <section class="py-16 md:py-20">
      <div class="container-wide">
        <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 class="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">
                What is a Potluck Episode?
              </h2>
              <div class="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Every now and then, we set aside our planned topics and dedicate an entire episode
                  to answering <strong>your</strong> questions. It's like a community potluck where
                  everyone brings something to the table!
                </p>
                <p>
                  These episodes are some of our favorites because they're driven entirely by what
                  you want to learn. No question is too simple or too complex.
                </p>
                <p>
                  We also love hearing your <strong>topic suggestions</strong> for future episodes.
                  Have a Spring feature you'd like us to explore or a guest you'd love to hear from?
                  Let us know!
                </p>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -inset-4 bg-gradient-to-br from-spring-100 to-spring-200/50 rounded-3xl transform -rotate-2" />
              <div class="relative bg-white rounded-2xl p-6 shadow-lg">
                <h3 class="font-semibold text-gray-900 mb-4">Topics We Cover</h3>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-spring-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-600">Spring Framework & Spring Boot</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-spring-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-600">Java language features & best practices</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-spring-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-600">Career advice & professional growth</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-spring-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-600">Architecture & design patterns</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-spring-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-gray-600">Tools & development workflows</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Submit Form Section -->
    <section class="py-16 md:py-20">
      <div class="container-narrow">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
            Submit Your Question or Topic Idea
          </h2>
          <p class="text-gray-600 max-w-xl mx-auto">
            Have a burning question or a topic you'd like us to cover? Drop it below and we might feature it in an upcoming episode!
          </p>
        </div>

        <!-- Success Message -->
        <div
          v-if="submitSuccess"
          class="max-w-xl mx-auto bg-spring-50 border border-spring-200 rounded-xl p-8 text-center"
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
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Submission Received!</h3>
          <p class="text-gray-600 mb-6">
            Thanks for your submission! We'll review it and might feature it in an upcoming
            episode. Stay tuned!
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
          class="max-w-xl mx-auto bg-white border border-gray-100 rounded-xl p-8 shadow-sm"
          @submit.prevent="handleSubmit"
        >
          <!-- Error Message -->
          <div
            v-if="submitError"
            class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm"
          >
            {{ submitError }}
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
              Your Name <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spring-500 focus:border-spring-500 transition-colors"
              placeholder="How should we give you a shoutout?"
            />
          </div>

          <!-- Contact (Optional) -->
          <div class="mb-8">
            <label for="contact" class="block text-sm font-medium text-gray-700 mb-2">
              How Can We Reach You? (Optional)
            </label>
            <input
              id="contact"
              v-model="form.contact"
              type="text"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spring-500 focus:border-spring-500 transition-colors"
              placeholder="Email, Twitter/Bluesky handle, or website"
            />
            <p class="mt-1 text-sm text-gray-500">
              So we can give you a shoutout when we answer your question!
            </p>
          </div>

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
            <span v-else>Submit</span>
          </button>
        </form>
      </div>
    </section>
  </div>
</template>
