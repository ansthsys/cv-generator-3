import { useState } from 'react'
import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from '@tanstack/react-router'
import { z } from 'zod'
import { LoaderCircleIcon, LogOutIcon } from 'lucide-react'

import { AuthLayout } from '#/components/templates/AuthLayout'
import { Button } from '#/components/atoms/ui/button'
import {
  TypographyH3,
  TypographyMuted,
  linkVariants,
} from '#/components/atoms/typography'
import { StatusAlert } from '#/components/molecules/status-alert/StatusAlert'
import { authClient } from '#/lib/better-auth/auth-client'

const verifyEmailSearchSchema = z.object({
  email: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/verify-email')({
  validateSearch: verifyEmailSearchSchema,
  beforeLoad: ({ context }) => {
    if (!context.session?.user) throw redirect({ to: '/login' })
  },
  component: VerifyEmailPage,
})

function VerifyEmailPage() {
  const { email } = Route.useSearch()
  const router = useRouter()
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'sent' | 'no-session'
  >('idle')

  async function handleResend() {
    if (!email) return

    setStatus('sending')

    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: '/verify-email-success',
    })

    if (error) {
      setStatus('no-session')
      return
    }

    setStatus('sent')
  }

  async function handleLogout() {
    await authClient.signOut()
    router.invalidate()
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <TypographyH3>Check your email</TypographyH3>
          <TypographyMuted>
            {email
              ? `If ${email} hasn't been registered yet, a verification link has been sent. The link is valid for 24 hours.`
              : 'If this is a new account, a verification link has been sent. The link is valid for 24 hours.'}
          </TypographyMuted>
        </div>

        {status === 'sent' && (
          <StatusAlert variant="success" title="Verification sent">
            A new verification link has been sent. Please check your inbox.
          </StatusAlert>
        )}

        {status === 'no-session' && (
          <StatusAlert variant="error" title="Session expired">
            Please{' '}
            <Link
              to="/login"
              search={{ email }}
              className={linkVariants({ variant: 'default' })}
            >
              sign in
            </Link>{' '}
            to receive a new verification link.
          </StatusAlert>
        )}

        <div className="w-full">
          <TypographyMuted className="mb-3">
            Didn't receive the email? Check your spam folder or make sure you
            entered the correct email address.
          </TypographyMuted>

          <div>
            <Button
              onClick={handleResend}
              disabled={status === 'sending'}
              className="w-full"
            >
              {status === 'sending' && (
                <LoaderCircleIcon className="size-4 animate-spin" />
              )}
              {status === 'sending'
                ? 'Sending...'
                : 'Resend verification email'}
            </Button>
          </div>
        </div>

        <div>
          <Button variant="outline" onClick={handleLogout} className="w-full">
            <LogOutIcon className="size-4" />
            Log out
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
