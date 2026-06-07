import { AuthLayout } from '#/components/templates/AuthLayout'
import { ForgotPasswordForm } from '#/components/organisms/auth/ForgotPasswordForm'

function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  )
}

export { ForgotPasswordPage }
