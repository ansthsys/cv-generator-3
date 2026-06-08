import { useQuery } from '@tanstack/react-query'
import { authClient } from '#/lib/better-auth/auth-client'
import { queryKeys } from '#/lib/tanstack-query/keys'

export function useSessionQuery() {
  return useQuery({
    queryKey: queryKeys.session,
    queryFn: async () => {
      const { data, error } = await authClient.getSession()
      if (error) throw error
      return data
    },
  })
}
