import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

import { AuthLayout } from '#/components/templates/AuthLayout'
import { SignInForm } from '#/components/organisms/auth/SignInForm'

const loginSearchSchema = z.object({
  email: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/login')({
  validateSearch: loginSearchSchema,
  beforeLoad: ({ context }) => {
    if (context.session?.user) throw redirect({ to: '/' })
  },
  component: SignInPage,
})

function SignInPage() {
  const { email } = Route.useSearch()

  return (
    <AuthLayout>
      <SignInForm initialEmail={email} />
    </AuthLayout>
  )
}
