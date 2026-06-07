import { createFileRoute, redirect } from '@tanstack/react-router'

import { VerifyEmailSuccessPage } from '#/components/pages/auth/VerifyEmailSuccessPage'

export const Route = createFileRoute('/(auth)/verify-email-success')({
  beforeLoad: ({ context }) => {
    if (!context.session?.user) throw redirect({ to: '/login' })
  },
  component: VerifyEmailSuccessPage,
})
