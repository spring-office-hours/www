<script setup lang="ts">
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Episodes', href: '/episodes' },
  { name: 'Schedule', href: '/schedule' },
  { name: 'Ask a question', href: '/potluck' },
  { name: 'Community', href: '/community' },
  { name: 'Subscribe', href: '/subscribe' },
  { name: 'About', href: '/about' },
]

const mobileMenuOpen = ref(false)

const route = useRoute()
const { siteUrl } = useRuntimeConfig().public
const canonicalUrl = computed(() => `${siteUrl}${route.path}`)

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
})
useSeoMeta({ ogUrl: canonicalUrl })
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Skip to main content link for keyboard users -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-spring-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none"
    >
      Skip to main content
    </a>

    <!-- Header -->
    <header class="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav class="container-wide flex items-center justify-between py-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/images/spring_logo.png" alt="Spring Logo" class="w-10 h-10 rounded-lg" />
          <span class="font-display font-semibold text-xl text-gray-900 whitespace-nowrap">
            Spring Office Hours
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-gray-600 hover:text-spring-600 font-medium whitespace-nowrap transition-colors"
            active-class="text-spring-600"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <button
          type="button"
          class="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span class="sr-only">{{ mobileMenuOpen ? 'Close menu' : 'Open menu' }}</span>
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </nav>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" id="mobile-menu" class="lg:hidden border-t border-gray-100">
        <div class="container-wide py-4 space-y-2">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="block py-2 text-gray-600 hover:text-spring-600 font-medium"
            active-class="text-spring-600"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-50 border-t border-gray-100">
      <div class="container-wide py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- About -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <img src="/images/spring_logo.png" alt="Spring Logo" class="w-8 h-8 rounded-lg" />
              <span class="font-display font-semibold text-lg">Spring Office Hours</span>
            </div>
            <p class="text-gray-600 text-sm">
              A podcast about Spring Framework, Spring Boot, and the Java ecosystem with Dan Vega and DaShaun Carter.
            </p>
          </div>

          <!-- Links -->
          <div>
            <h3 class="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li v-for="item in navigation" :key="item.name">
                <NuxtLink
                  :to="item.href"
                  class="text-gray-600 hover:text-spring-600 text-sm transition-colors"
                >
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Subscribe -->
          <div>
            <h3 class="font-semibold text-gray-900 mb-4">Subscribe</h3>
            <ul class="space-y-2">
              <li v-for="platform in featuredPlatforms" :key="platform.name">
                <a
                  :href="platform.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-600 hover:text-spring-600 text-sm transition-colors"
                >
                  {{ platform.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; {{ new Date().getFullYear() }} Spring Office Hours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
