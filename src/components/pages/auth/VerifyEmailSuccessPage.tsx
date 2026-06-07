import { AuthLayout } from '#/components/templates/AuthLayout'
import { VerifyEmailSuccess } from '#/components/organisms/auth/VerifyEmailSuccess'

function VerifyEmailSuccessPage() {
  return (
    <AuthLayout>
      <VerifyEmailSuccess />
    </AuthLayout>
  )
}

export { VerifyEmailSuccessPage }
