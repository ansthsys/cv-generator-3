import { createFileRoute, Link } from '@tanstack/react-router'

import { AuthLayout } from '#/components/templates/AuthLayout'
import { Button } from '#/components/atoms/ui/button'
import {
  TypographyH3,
  TypographyMuted,
  linkVariants,
} from '#/components/atoms/typography'

export const Route = createFileRoute('/(auth)/forgot-password')({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <TypographyH3>Forgot password</TypographyH3>
          <TypographyMuted>
            Password reset is not yet implemented.
          </TypographyMuted>
        </div>

        <Link to="/login" className={linkVariants({ variant: 'muted' })}>
          <Button variant="outline">Back to sign in</Button>
        </Link>
      </div>
    </AuthLayout>
  )
}
