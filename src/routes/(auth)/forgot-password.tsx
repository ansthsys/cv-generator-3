import { createFileRoute, redirect } from '@tanstack/react-router'

import { ForgotPasswordPage } from '#/components/pages/auth/ForgotPasswordPage'

export const Route = createFileRoute('/(auth)/forgot-password')({
  beforeLoad: ({ context }) => {
    if (context.session?.user) throw redirect({ to: '/' })
  },
  component: ForgotPasswordPage,
})
