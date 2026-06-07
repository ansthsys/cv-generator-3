import { useState } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { LoaderCircleIcon, LogOutIcon } from 'lucide-react'

import { Button } from '#/components/atoms/ui/button'
import { TypographyMuted, linkVariants } from '#/components/atoms/typography'
import { AuthFormLayout } from '#/components/molecules/auth-form/AuthFormLayout'
import { StatusAlert } from '#/components/molecules/status-alert/StatusAlert'
import { authClient } from '#/lib/better-auth/auth-client'

interface VerifyEmailFormProps {
  email?: string
}

function VerifyEmailForm({ email }: VerifyEmailFormProps) {
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
    <AuthFormLayout
      title="Check your email"
      description={
        email
          ? `If ${email} hasn't been registered yet, a verification link has been sent. The link is valid for 24 hours.`
          : 'If this is a new account, a verification link has been sent. The link is valid for 24 hours.'
      }
    >
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
            {status === 'sending' ? 'Sending...' : 'Resend verification email'}
          </Button>
        </div>
      </div>

      <div>
        <Button variant="outline" onClick={handleLogout} className="w-full">
          <LogOutIcon className="size-4" />
          Log out
        </Button>
      </div>
    </AuthFormLayout>
  )
}

export { VerifyEmailForm }
export type { VerifyEmailFormProps }
