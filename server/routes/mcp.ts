import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { createShowServer } from '~/server/utils/mcp'

// Stateless, so each request gets its own server. That suits Netlify functions.
export default defineEventHandler(async (event) => {
  if (event.method === 'GET' && !getHeader(event, 'accept')?.includes('text/event-stream')) {
    setHeader(event, 'content-type', 'text/plain; charset=utf-8')
    return 'This is the Spring Office Hours MCP server. Add https://springofficehours.io/mcp to your MCP client as a Streamable HTTP server.\n'
  }

  const server = createShowServer(event)
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  })
  await server.connect(transport)
  return transport.handleRequest(toWebRequest(event))
})
