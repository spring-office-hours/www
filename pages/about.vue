<script setup lang="ts">
useSeoMeta({
  title: 'About - Spring Office Hours',
  description:
    'Learn about Spring Office Hours podcast and meet your hosts Dan Vega and DaShaun Carter.',
})

const hosts = [
  {
    name: 'Dan Vega',
    role: 'Spring Developer Advocate',
    bio: 'Dan has been writing software for over 20 years and creating content online since the dial-up modem days. He\'s passionate about helping developers learn new technologies and sharing his knowledge through tutorials, courses, and podcasts.',
    avatar: '/dan_avatar.png',
    socials: [
      { name: 'Twitter', href: 'https://twitter.com/therealdanvega', icon: 'twitter' },
      { name: 'YouTube', href: 'https://www.youtube.com/@danvega', icon: 'youtube' },
      { name: 'GitHub', href: 'https://github.com/danvega', icon: 'github' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/danvega/', icon: 'linkedin' },
      { name: 'Bluesky', href: 'https://bsky.app/profile/danvega.dev', icon: 'bluesky' },
      { name: 'Website', href: 'https://www.danvega.dev', icon: 'website' },
    ],
  },
  {
    name: 'DaShaun Carter',
    role: 'Spring Developer Advocate',
    bio: 'DaShaun is passionate about developer experience and helping teams deliver software more efficiently. He loves working with Spring Boot, Kubernetes, and cloud-native technologies.',
    avatar: '/dashaun_avatar.png',
    socials: [
      { name: 'Twitter', href: 'https://twitter.com/dashaun', icon: 'twitter' },
      { name: 'GitHub', href: 'https://github.com/dashaun', icon: 'github' },
      { name: 'Website', href: 'https://dashaun.com', icon: 'website' },
    ],
  },
]
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
            <svg class="w-4 h-4 text-spring-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
            </svg>
            <span class="text-white text-sm font-medium">Live every Monday</span>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            About <span class="text-spring-300">Spring</span> Office Hours
          </h1>

          <p class="text-lg md:text-xl text-spring-100 leading-relaxed">
            Your weekly deep dive into Spring Framework, Spring Boot, and the Java ecosystem.
            Join Dan and DaShaun as they explore new features, best practices, and chat with
            guests from the Spring community.
          </p>
        </div>
      </div>
    </section>

    <!-- The Show Section -->
    <section class="py-16 md:py-24">
      <div class="container-wide">
        <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 class="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">
                The Show
              </h2>
              <div class="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Every week, Dan and DaShaun get together to talk about what's happening in the Spring
                  ecosystem. Whether it's a new release, a deep dive into a specific technology, or an
                  interview with someone from the community, there's always something interesting to
                  discuss.
                </p>
                <p>
                  The show started as a way to help developers stay up to date with the rapidly evolving
                  Spring ecosystem. From Spring Boot to Spring Cloud, Spring Security to Spring Data,
                  we cover it all.
                </p>
              </div>
            </div>
            <div class="relative">
              <div class="absolute -inset-4 bg-gradient-to-br from-spring-100 to-spring-200/50 rounded-3xl transform -rotate-2" />
              <div class="relative bg-white rounded-2xl p-6 shadow-lg">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-12 h-12 bg-spring-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-spring-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">140+ Episodes</div>
                    <div class="text-sm text-gray-500">And counting!</div>
                  </div>
                </div>
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-12 h-12 bg-spring-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-spring-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">~1 Hour Each</div>
                    <div class="text-sm text-gray-500">Perfect for your commute</div>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-spring-100 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-spring-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="font-semibold text-gray-900">Weekly Episodes</div>
                    <div class="text-sm text-gray-500">New content every Monday</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Meet Your Hosts -->
    <section class="py-16 md:py-24 bg-gray-50">
      <div class="container-wide">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
            Meet Your Hosts
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Two Spring Developer Advocates who love talking about Java, Spring, and building great software.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div
            v-for="host in hosts"
            :key="host.name"
            class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <!-- Avatar Section -->
            <div class="relative bg-gradient-to-br from-spring-600 to-spring-800 p-8 pb-24">
              <div class="absolute -inset-1 bg-spring-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div class="relative flex justify-center">
                <img
                  :src="host.avatar"
                  :alt="host.name"
                  class="w-40 h-40 md:w-48 md:h-48 object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <!-- Info Section -->
            <div class="relative px-6 pb-6 -mt-16">
              <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="text-center mb-4">
                  <h3 class="text-xl font-bold text-gray-900 mb-1">
                    {{ host.name }}
                  </h3>
                  <p class="text-spring-600 text-sm font-medium">
                    {{ host.role }}
                  </p>
                </div>

                <p class="text-gray-600 text-sm text-center mb-6 leading-relaxed">
                  {{ host.bio }}
                </p>

                <!-- Social Links -->
                <div class="flex items-center justify-center flex-wrap gap-3">
                  <a
                    v-for="social in host.socials"
                    :key="social.name"
                    :href="social.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-9 h-9 rounded-full bg-gray-100 hover:bg-spring-100 flex items-center justify-center text-gray-500 hover:text-spring-600 transition-colors"
                    :title="social.name"
                  >
                    <!-- Twitter/X -->
                    <svg v-if="social.icon === 'twitter'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <!-- YouTube -->
                    <svg v-else-if="social.icon === 'youtube'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <!-- GitHub -->
                    <svg v-else-if="social.icon === 'github'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <!-- LinkedIn -->
                    <svg v-else-if="social.icon === 'linkedin'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <!-- Bluesky -->
                    <svg v-else-if="social.icon === 'bluesky'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
                    </svg>
                    <!-- Website -->
                    <svg v-else-if="social.icon === 'website'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 md:py-24">
      <div class="container-wide">
        <div class="bg-gradient-to-r from-spring-600 to-spring-700 rounded-2xl p-8 md:p-12 text-center">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Have a Topic in Mind?
          </h2>
          <p class="text-spring-100 mb-8 max-w-xl mx-auto">
            We love hearing from our listeners! Submit your episode ideas, questions, or guest
            suggestions.
          </p>
          <NuxtLink
            to="/potluck"
            class="inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-spring-50 text-spring-700 font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
          >
            Submit a Question or Idea
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
