import { AuthLayout } from '#/components/templates/AuthLayout'
import { VerifyEmailForm } from '#/components/organisms/auth/VerifyEmailForm'

interface VerifyEmailPageProps {
  email?: string
}

function VerifyEmailPage({ email }: VerifyEmailPageProps) {
  return (
    <AuthLayout>
      <VerifyEmailForm email={email} />
    </AuthLayout>
  )
}

export { VerifyEmailPage }
export type { VerifyEmailPageProps }
