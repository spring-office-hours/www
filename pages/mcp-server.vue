<script setup lang="ts">
useSeoMeta({
  title: 'MCP Server - Spring Office Hours',
  description:
    'Add the Spring Office Hours MCP server to Claude, Cursor, VS Code or any MCP client. Search every episode, pull up show notes and see upcoming shows.',
  ogTitle: 'Spring Office Hours MCP Server',
  ogDescription: 'Search every Spring Office Hours episode from your AI assistant.',
})

const serverUrl = 'https://springofficehours.io/mcp'

const prompts = [
  { text: 'Which Spring Office Hours episodes covered Spring Security?', tool: 'search_episodes' },
  { text: 'Find every episode with Josh Long.', tool: 'search_episodes' },
  { text: "I'm upgrading to Spring Boot 4. Which episodes should I watch first?", tool: 'search_episodes' },
  { text: 'Summarize S5E27 and give me the links from the show notes.', tool: 'get_episode' },
  { text: 'What did Dan and DaShaun say about Spring AI this year?', tool: 'search_episodes' },
  { text: "When is the next live show, and what's it about?", tool: 'upcoming_shows' },
]

const clients = [
  {
    name: 'Claude Code',
    steps: 'Run this in your terminal.',
    label: 'Terminal',
    code: `claude mcp add --transport http spring-office-hours ${serverUrl}`,
  },
  {
    name: 'Claude',
    steps:
      'In the Claude app or on claude.ai, open Settings, then Connectors. Choose Add custom connector, name it Spring Office Hours and paste the URL.',
    label: 'Connector URL',
    code: serverUrl,
  },
  {
    name: 'Cursor',
    steps: 'Add this to ~/.cursor/mcp.json, or to .cursor/mcp.json in a project.',
    label: 'mcp.json',
    code: JSON.stringify({ mcpServers: { 'spring-office-hours': { url: serverUrl } } }, null, 2),
  },
  {
    name: 'VS Code',
    steps: 'Add this to .vscode/mcp.json in your project. GitHub Copilot picks it up in agent mode.',
    label: '.vscode/mcp.json',
    code: JSON.stringify({ servers: { 'spring-office-hours': { type: 'http', url: serverUrl } } }, null, 2),
  },
  {
    name: 'Any other client',
    steps: 'Add a remote MCP server that uses Streamable HTTP and paste the URL. There is no API key.',
    label: 'Server URL',
    code: serverUrl,
  },
]

const tools = [
  {
    name: 'search_episodes',
    description:
      'Finds episodes by topic, guest or keyword. Title matches come first, then the newest. Leave the query empty for the latest episodes.',
  },
  {
    name: 'get_episode',
    description:
      'Gets one episode by its code, like S5E27. Returns the summary, date, length, audio, YouTube link and every link from the show notes.',
  },
  {
    name: 'upcoming_shows',
    description: 'Lists the live shows on the schedule, soonest first, plus the link to ask the hosts a question.',
  },
]

const copied = ref('')
let resetTimer: ReturnType<typeof setTimeout> | undefined

// Some browsers block the Clipboard API, so fall back to a hidden textarea.
function copyWithTextarea(text: string) {
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  const ok = document.execCommand('copy')
  area.remove()
  return ok
}

async function copy(text: string, key: string) {
  let ok = true
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    ok = copyWithTextarea(text)
  }
  if (!ok) return
  copied.value = key
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => (copied.value = ''), 2000)
}
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-linear-to-br from-spring-700 via-spring-800 to-spring-950 py-16 md:py-24">
      <div class="absolute top-1/2 left-1/2 size-[600px] -translate-1/2 rounded-full bg-spring-400/15 blur-3xl" />

      <div class="container-wide relative">
        <div class="text-center">
          <p class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
            MCP server
          </p>

          <h1 class="mx-auto mt-6 max-w-[24ch] text-4xl font-semibold tracking-tight text-balance text-white md:text-5xl">
            Spring Office Hours in your <span class="text-spring-300">AI assistant</span>
          </h1>

          <p class="mx-auto mt-6 max-w-[48ch] text-lg text-pretty text-spring-100 md:text-xl">
            Ask Claude, Cursor or any MCP client about the show. Search every episode, pull up show notes
            and see what's coming up next. It's free, and there's nothing to sign up for.
          </p>

          <div class="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-xl border border-white/20 bg-white/10 p-2 pl-4">
            <code class="min-w-0 flex-1 truncate text-left text-base text-white sm:text-sm">{{ serverUrl }}</code>
            <button
              type="button"
              class="shrink-0 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-spring-800 hover:bg-spring-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              @click="copy(serverUrl, 'hero')"
            >
              {{ copied === 'hero' ? 'Copied' : 'Copy URL' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="container-wide">
        <h2 class="font-display text-3xl font-semibold tracking-tight text-balance text-gray-900">
          What you can ask
        </h2>
        <p class="mt-3 max-w-[56ch] text-base/7 text-pretty text-gray-600">
          Your assistant picks the right tool and answers with links back to the episodes.
          Here are a few ways people use it.
        </p>

        <ul role="list" class="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          <li v-for="prompt in prompts" :key="prompt.text" class="border-t border-gray-950/10 pt-6">
            <p class="text-lg/8 font-medium text-pretty text-gray-900 sm:text-base/7">“{{ prompt.text }}”</p>
            <p class="mt-2 font-mono text-sm/6 text-spring-700">{{ prompt.tool }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="bg-gray-50 py-16 md:py-24">
      <div class="container-wide">
        <h2 class="font-display text-3xl font-semibold tracking-tight text-balance text-gray-900">
          Install it
        </h2>
        <p class="mt-3 max-w-[56ch] text-base/7 text-pretty text-gray-600">
          It's a remote server, so there's nothing to download or run. Pick your client.
        </p>

        <ul role="list" class="mt-10 divide-y divide-gray-950/10">
          <li
            v-for="client in clients"
            :key="client.name"
            class="grid gap-4 py-8 first:pt-0 last:pb-0 lg:grid-cols-3 lg:gap-12"
          >
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ client.name }}</h3>
              <p class="mt-1 text-base/7 text-pretty text-gray-600 sm:text-sm/6">{{ client.steps }}</p>
            </div>
            <div class="min-w-0 overflow-hidden rounded-xl bg-gray-950 lg:col-span-2">
              <div class="flex items-center justify-between gap-4 border-b border-white/10 py-1.5 pr-1.5 pl-4">
                <p class="font-mono text-sm/6 text-gray-400">{{ client.label }}</p>
                <button
                  type="button"
                  class="rounded-md px-2.5 py-1 text-sm font-medium text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spring-400"
                  @click="copy(client.code, client.name)"
                >
                  {{ copied === client.name ? 'Copied' : 'Copy' }}
                </button>
              </div>
              <pre class="overflow-x-auto p-4 text-sm/6 whitespace-pre-wrap break-words text-gray-100"><code>{{ client.code }}</code></pre>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="container-wide grid gap-12 lg:grid-cols-3">
        <div>
          <h2 class="font-display text-3xl font-semibold tracking-tight text-balance text-gray-900">
            The tools
          </h2>
          <p class="mt-3 max-w-[48ch] text-base/7 text-pretty text-gray-600">
            Three read-only tools. The server stores nothing about you and can't change anything.
          </p>
        </div>

        <dl class="divide-y divide-gray-950/10 lg:col-span-2">
          <div v-for="tool in tools" :key="tool.name" class="py-6 first:pt-0 last:pb-0 sm:grid sm:grid-cols-3 sm:gap-6">
            <dt class="font-mono text-base/7 font-medium text-gray-900 sm:text-sm/6">{{ tool.name }}</dt>
            <dd class="mt-1 text-base/7 text-pretty text-gray-600 sm:col-span-2 sm:mt-0 sm:text-sm/6">
              {{ tool.description }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="border-t border-gray-950/10 py-16 md:py-24">
      <div class="container-wide grid gap-12 lg:grid-cols-3">
        <h2 class="font-display text-3xl font-semibold tracking-tight text-balance text-gray-900">
          Good to know
        </h2>
        <ul role="list" class="flex flex-col gap-4 text-base/7 text-pretty text-gray-600 sm:text-sm/6 lg:col-span-2">
          <li>
            Search looks at episode titles and descriptions. It doesn't search what was said on the show yet.
          </li>
          <li>Episodes update within a few minutes of being published.</li>
          <li>
            Got a question your assistant can't answer?
            <NuxtLink to="/potluck" class="font-medium text-spring-700 hover:text-spring-800">Ask Dan and DaShaun</NuxtLink>
            and it might end up on the show.
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
