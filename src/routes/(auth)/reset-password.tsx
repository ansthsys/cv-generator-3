import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

import { ResetPasswordPage } from '#/components/pages/auth/ResetPasswordPage'

const resetPasswordSearchSchema = z.object({
  token: z.string(),
})

export const Route = createFileRoute('/(auth)/reset-password')({
  validateSearch: resetPasswordSearchSchema,
  beforeLoad: ({ search }) => {
    if (!search.token) throw redirect({ to: '/login' })
  },
  component: () => {
    const { token } = Route.useSearch()
    return <ResetPasswordPage token={token} />
  },
})
