<script setup lang="ts">
useSeoMeta({
  title: 'From Our Community - Spring Office Hours',
  description:
    'Hear what the Spring community has to say about Spring Office Hours.',
})

interface Testimonial {
  quote: string
  name: string
  handle: string
  avatar?: string
  platform: 'twitter' | 'linkedin' | 'bluesky'
  featured?: boolean
}

const testimonials: Testimonial[] = [
  {
    quote: "The Spring Office Hours is truly an amazing podcast. It's always delightful to listen to the insights around what's latest happening in the Spring and Java world. It really helps to keep me ahead of curve and to know around the better ways to solve problems with Spring. I heard around GraalVM in one of those episodes where Dan and DeShaun were discussing it and then I applied it into one of my projects to run Python and JavaScript engines via GraalVM libraries right within the JVM. Thanks Dan and DeShaun for Spring Office Hours. Please keep it coming!",
    name: 'Muhammad Salman Farooq',
    handle: 'Software Architect | Java & AI Applications Developer',
    avatar: '/images/community/avatars/MuhammadSalmanFarooq .jpeg',
    platform: 'linkedin',
    featured: true,
  },
  {
    quote: "Spring.io has a release page but Spring Office Hours featuring Dan Vega and DaShaun Carter puts the releases into perspective with practical applications to boot. Every episode, I know I'll leave with at least one new gem.",
    name: 'LawrenceDCodes',
    handle: '@LawrenceDCodes',
    avatar: '/images/community/avatars/LawrenceDCodes.jpg',
    platform: 'twitter',
  },
  {
    quote: "Spring Office hours is the thing that I wish I had when I was starting my career. Navigating tech - which is a complex space is not easy - as everything moves fast - and having you guys means that people can ask for help, stay up to date, and get involved in the community. GJ!",
    name: 'ATokarev90',
    handle: '@ATokarev90',
    avatar: '/images/community/avatars/ATokarev90.png',
    platform: 'twitter',
  },
  {
    quote: "It has been such a helpful space. The sessions feel relaxed and really intentional and you can tell a lot of thought goes into making sure we the audience actually gets value. I always leave with clearer direction and practical takeaways I can use right away. It's been a great experience overall",
    name: 'Igwe Jaminel',
    handle: '@Jaminel_Igwe',
    avatar: '/images/community/avatars/IgweJaminel.jpg',
    platform: 'twitter',
  },
  {
    quote: "I have enjoyed listening to the Spring Office Hours. Dan and DeShaun always present current topics and things relevant to developer challenges. I also love the career info provided to up and coming developers. Thanks for putting in the hard work to produce these!",
    name: 'David Lucas',
    handle: 'Owner & Software Engineer at Lucas Software Engineering',
    avatar: '/images/community/avatars/david_locas.jpeg',
    platform: 'linkedin',
  },
  {
    quote: "Spring Office Hours has a fun, relaxed vibe. As a longtime listener, it feels like hanging out with two really smart friends who love Spring just as much as I do. I really appreciate how they highlight Spring features I haven't tried yet, while also keeping me up to date on the latest releases and cool projects.",
    name: 'Rajesh Duggal',
    handle: 'Engineering Manager / Senior Java Developer',
    avatar: '/images/community/avatars/rajesh_duggal.jpeg',
    platform: 'linkedin',
  },
  {
    quote: "Spring Office Hours are an excellent way to stay up to date on a wide range of topics. Whether you join live via chat or watch the sessions later, it's a great format to keep learning at your own pace while staying connected to the community.",
    name: 'Mohamed Amdouni',
    handle: 'Solution Architect / Java & AWS Tech Lead',
    avatar: '/images/community/avatars/MohamedAmdouni .jpeg',
    platform: 'linkedin',
  },
  {
    quote: "Spring Office Hours has become my go-to tech podcast because it keeps me up to date with Spring, Java, AI and the broader IT world. It motivates me to stay curious and keep learning. It also inspired me to explore new technologies such as Vaadin, Spring AI and many others that I might not have tried on my own. Dan and DeShaun are fantastic hosts!",
    name: 'Mislav Miseric',
    handle: 'Team Lead @ CONET Hrvatska',
    avatar: '/images/community/avatars/MislavMiseric.jpeg',
    platform: 'linkedin',
  },
  {
    quote: "Spring Office Hours has always been my go-to resource for staying updated with what's new in the Spring community. It's been a lifesaver for learning about newly added resources.",
    name: 'Gaurav Sharma',
    handle: 'SDE 1 @ TELUSKO',
    avatar: '/images/community/avatars/GauravSharma .jpeg',
    platform: 'linkedin',
  },
  {
    quote: "I watch Spring Office Hours on regular basis. The best way to stay up to date with what's happening in the industry. Keep it up guys!",
    name: 'Arfat Chaus',
    handle: 'Senior Software Engineer',
    avatar: '/images/community/avatars/ArfatChaus .jpeg',
    platform: 'linkedin',
  },
  {
    quote: "I enjoy attending Spring Office Hours via livestream or recorded videos, and I've built apps by following along with the sessions.",
    name: 'Vamshi Nizampatnam',
    handle: 'Experienced Software Developer | 11 Years in Java, Spring Boot, React',
    avatar: '/images/community/avatars/VamshiNizampatnam .jpeg',
    platform: 'linkedin',
  },
]

// Track which avatars failed to load
const failedAvatars = ref<Set<number>>(new Set())

const handleImageError = (index: number) => {
  failedAvatars.value.add(index)
}

const shouldShowAvatar = (testimonial: Testimonial, index: number) => {
  return testimonial.avatar && !failedAvatars.value.has(index)
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
            <svg class="w-4 h-4 text-spring-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span class="text-white text-sm font-medium">Community Love</span>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            From Our <span class="text-spring-300">Community</span>
          </h1>

          <p class="text-lg md:text-xl text-spring-100 leading-relaxed">
            We're grateful for the amazing Spring community. Here's what developers are saying about Spring Office Hours.
          </p>
        </div>
      </div>
    </section>

    <!-- Testimonials Grid -->
    <section class="py-16 md:py-24">
      <div class="container-wide">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            :class="[
              'bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(22,163,74,0.15)] hover:border-spring-300',
              testimonial.featured ? 'md:col-span-2 lg:col-span-3' : ''
            ]"
          >
            <!-- Platform Icon -->
            <div class="mb-4">
              <!-- Twitter/X Icon -->
              <svg v-if="testimonial.platform === 'twitter'" class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <!-- LinkedIn Icon -->
              <svg v-else-if="testimonial.platform === 'linkedin'" class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <!-- Bluesky Icon -->
              <svg v-else-if="testimonial.platform === 'bluesky'" class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
              </svg>
            </div>

            <!-- Quote -->
            <blockquote class="text-gray-700 leading-relaxed mb-6">
              "{{ testimonial.quote }}"
            </blockquote>

            <!-- Author -->
            <div class="flex items-center gap-3">
              <img
                v-if="shouldShowAvatar(testimonial, index)"
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="w-10 h-10 rounded-full object-cover"
                @error="handleImageError(index)"
              />
              <div
                v-else
                class="w-10 h-10 rounded-full bg-spring-100 flex items-center justify-center"
              >
                <span class="text-spring-600 font-semibold text-sm">
                  {{ testimonial.name.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div>
                <div class="font-semibold text-gray-900 text-sm">{{ testimonial.name }}</div>
                <div class="text-gray-500 text-sm">{{ testimonial.handle }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state message when more testimonials come -->
        <div v-if="testimonials.length === 1" class="mt-12 text-center">
          <p class="text-gray-500">More testimonials coming soon!</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 md:py-24 bg-gray-50">
      <div class="container-wide">
        <div class="bg-gradient-to-r from-spring-600 to-spring-700 rounded-2xl p-8 md:p-12 text-center">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Join the Conversation
          </h2>
          <p class="text-spring-100 mb-8 max-w-xl mx-auto">
            Have thoughts about Spring Office Hours? We'd love to hear from you!
            Share your experience on social media.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://twitter.com/therealdanvega"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-spring-50 text-spring-700 font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Follow on X
            </a>
            <a
              href="https://www.linkedin.com/in/danvega/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-spring-50 text-spring-700 font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
