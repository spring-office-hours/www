<script setup lang="ts">
useSeoMeta({
  title: 'Submit Episode Request - Spring Office Hours',
  description:
    'Have a topic or guest suggestion for Spring Office Hours? Submit your request and we might feature it in an upcoming episode!',
})

const form = reactive({
  name: '',
  email: '',
  topic: '',
  description: '',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

async function handleSubmit() {
  isSubmitting.value = true
  submitError.value = ''

  try {
    await $fetch('/api/requests', {
      method: 'POST',
      body: form,
    })

    submitSuccess.value = true
    // Reset form
    form.name = ''
    form.email = ''
    form.topic = ''
    form.description = ''
  } catch (error: any) {
    submitError.value = error.data?.message || 'Failed to submit request. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="py-12 md:py-16">
    <div class="container-narrow">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          Submit an Episode Request
        </h1>
        <p class="text-gray-600 text-lg max-w-xl mx-auto">
          Have a topic you'd like us to cover or a guest you'd like to hear from? Let us know!
          We love hearing from our listeners.
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
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Request Submitted!</h2>
        <p class="text-gray-600 mb-6">
          Thank you for your suggestion. We review all submissions and may feature your topic in an
          upcoming episode.
        </p>
        <button
          class="btn btn-primary"
          @click="submitSuccess = false"
        >
          Submit Another Request
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
            placeholder="John Doe"
          />
        </div>

        <!-- Email -->
        <div class="mb-6">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span class="text-red-500">*</span>
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spring-500 focus:border-spring-500 transition-colors"
            placeholder="john@example.com"
          />
          <p class="mt-1 text-sm text-gray-500">
            We'll only use this to follow up if needed. Never shared publicly.
          </p>
        </div>

        <!-- Topic -->
        <div class="mb-6">
          <label for="topic" class="block text-sm font-medium text-gray-700 mb-2">
            Topic or Guest Suggestion <span class="text-red-500">*</span>
          </label>
          <input
            id="topic"
            v-model="form.topic"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spring-500 focus:border-spring-500 transition-colors"
            placeholder="e.g., Spring Security best practices, Interview with Josh Long"
          />
        </div>

        <!-- Description -->
        <div class="mb-8">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            Additional Details (Optional)
          </label>
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spring-500 focus:border-spring-500 transition-colors resize-none"
            placeholder="Tell us more about what you'd like to hear..."
          />
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
          <span v-else>Submit Request</span>
        </button>
      </form>
    </div>
  </div>
</template>
