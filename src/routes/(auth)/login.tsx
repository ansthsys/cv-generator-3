import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

import { SignInPage } from '#/components/pages/auth/SignInPage'

const loginSearchSchema = z.object({
  email: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/login')({
  validateSearch: loginSearchSchema,
  beforeLoad: ({ context }) => {
    if (context.session?.user) throw redirect({ to: '/' })
  },
  component: () => {
    const { email } = Route.useSearch()
    return <SignInPage email={email} />
  },
})
