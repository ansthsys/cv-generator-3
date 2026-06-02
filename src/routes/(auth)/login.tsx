import { createFileRoute } from '@tanstack/react-router'

import { AuthLayout } from '#/components/templates/AuthLayout'
import { SignInForm } from '#/components/organisms/auth/SignInForm'

export const Route = createFileRoute('/(auth)/login')({
  component: SignInPage,
})

function SignInPage() {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  )
}
