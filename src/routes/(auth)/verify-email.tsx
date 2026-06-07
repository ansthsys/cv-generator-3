import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

import { VerifyEmailPage } from '#/components/pages/auth/VerifyEmailPage'

const verifyEmailSearchSchema = z.object({
  email: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/verify-email')({
  validateSearch: verifyEmailSearchSchema,
  beforeLoad: ({ context }) => {
    if (!context.session?.user) throw redirect({ to: '/login' })
  },
  component: () => {
    const { email } = Route.useSearch()
    return <VerifyEmailPage email={email} />
  },
})
