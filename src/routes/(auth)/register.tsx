import { createFileRoute, redirect } from '@tanstack/react-router'

import { AuthLayout } from '#/components/templates/AuthLayout'
import { SignUpForm } from '#/components/organisms/auth/SignUpForm'

export const Route = createFileRoute('/(auth)/register')({
  beforeLoad: ({ context }) => {
    if (context.session?.user) throw redirect({ to: '/' })
  },
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  )
}
