import { createFileRoute } from '@tanstack/react-router'

import { AuthLayout } from '#/components/templates/AuthLayout'
import { SignUpForm } from '#/components/organisms/auth/SignUpForm'

export const Route = createFileRoute('/(auth)/register')({
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  )
}
