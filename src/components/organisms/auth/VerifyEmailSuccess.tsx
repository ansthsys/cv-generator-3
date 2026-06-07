import { Link } from '@tanstack/react-router'

import { Button } from '#/components/atoms/ui/button'
import { StatusAlert } from '#/components/molecules/status-alert/StatusAlert'
import { AuthFormLayout } from '#/components/molecules/auth-form/AuthFormLayout'

function VerifyEmailSuccess() {
  return (
    <AuthFormLayout
      title="Email verified"
      description="Your email has been verified successfully. You can now access all features of your account."
    >
      <StatusAlert variant="success" title="Verification successful">
        Thank you for verifying your email address.
      </StatusAlert>

      <div>
        <Link to="/">
          <Button>Go to home</Button>
        </Link>
      </div>
    </AuthFormLayout>
  )
}

export { VerifyEmailSuccess }
