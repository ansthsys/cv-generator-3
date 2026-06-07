import { AuthLayout } from '#/components/templates/AuthLayout'
import { ResetPasswordForm } from '#/components/organisms/auth/ResetPasswordForm'

interface ResetPasswordPageProps {
  token: string
}

function ResetPasswordPage({ token }: ResetPasswordPageProps) {
  return (
    <AuthLayout>
      <ResetPasswordForm token={token} />
    </AuthLayout>
  )
}

export { ResetPasswordPage }
export type { ResetPasswordPageProps }
