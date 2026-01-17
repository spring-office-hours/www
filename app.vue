<script setup lang="ts">
// Enable page transitions
const nuxtApp = useNuxtApp()
const isPageLoading = ref(false)

nuxtApp.hook('page:start', () => {
  isPageLoading.value = true
})

nuxtApp.hook('page:finish', () => {
  isPageLoading.value = false
})
</script>

<template>
  <div>
    <!-- Page loading indicator -->
    <div
      v-if="isPageLoading"
      class="fixed top-0 left-0 right-0 z-[100] h-1 bg-spring-200"
    >
      <div class="h-full bg-spring-600 animate-progress" />
    </div>

    <NuxtLayout>
      <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
    </NuxtLayout>
  </div>
</template>

<style>
/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* Loading bar animation */
@keyframes progress {
  0% {
    width: 0%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}

.animate-progress {
  animation: progress 1s ease-in-out infinite;
}
</style>
