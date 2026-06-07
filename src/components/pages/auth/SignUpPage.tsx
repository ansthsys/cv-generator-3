import { AuthLayout } from '#/components/templates/AuthLayout'
import { SignUpForm } from '#/components/organisms/auth/SignUpForm'

function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  )
}

export { SignUpPage }
