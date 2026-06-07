import { createFileRoute, redirect } from '@tanstack/react-router'

import { SignUpPage } from '#/components/pages/auth/SignUpPage'

export const Route = createFileRoute('/(auth)/register')({
  beforeLoad: ({ context }) => {
    if (context.session?.user) throw redirect({ to: '/' })
  },
  component: SignUpPage,
})
