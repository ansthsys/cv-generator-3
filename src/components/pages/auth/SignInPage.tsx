import { AuthLayout } from '#/components/templates/AuthLayout'
import { SignInForm } from '#/components/organisms/auth/SignInForm'

interface SignInPageProps {
  email?: string
}

function SignInPage({ email }: SignInPageProps) {
  return (
    <AuthLayout>
      <SignInForm initialEmail={email} />
    </AuthLayout>
  )
}

export { SignInPage }
export type { SignInPageProps }
