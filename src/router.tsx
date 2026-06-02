import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { getQueryContext } from './lib/tanstack-query/query-provider'
import { getSession } from './lib/better-auth/auth.function'

export async function getRouter() {
  const queryContext = getQueryContext()
  const session = await getSession()

  const router = createTanStackRouter({
    routeTree,
    context: { queryClient: queryContext.queryClient, session },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient: queryContext.queryClient,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
