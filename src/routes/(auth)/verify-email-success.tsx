import { createFileRoute, Link, redirect } from '@tanstack/react-router'

import { AuthLayout } from '#/components/templates/AuthLayout'
import { Button } from '#/components/atoms/ui/button'
import { TypographyH3, TypographyMuted } from '#/components/atoms/typography'
import { StatusAlert } from '#/components/molecules/status-alert/StatusAlert'

export const Route = createFileRoute('/(auth)/verify-email-success')({
  beforeLoad: ({ context }) => {
    if (!context.session?.user) throw redirect({ to: '/login' })
  },
  component: VerifyEmailSuccessPage,
})

function VerifyEmailSuccessPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <TypographyH3>Email verified</TypographyH3>
          <TypographyMuted>
            Your email has been verified successfully. You can now access all
            features of your account.
          </TypographyMuted>
        </div>

        <StatusAlert variant="success" title="Verification successful">
          Thank you for verifying your email address.
        </StatusAlert>

        <div>
          <Link to="/">
            <Button>Go to home</Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
