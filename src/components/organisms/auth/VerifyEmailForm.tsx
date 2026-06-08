import { Link } from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'

import { LoadingButton } from '#/components/atoms/common/LoadingButton'
import { TypographyMuted, linkVariants } from '#/components/atoms/typography'
import { AuthFormLayout } from '#/components/molecules/auth-form/AuthFormLayout'
import { StatusAlert } from '#/components/molecules/common/StatusAlert'
import {
  useSignOutMutation,
  useSendVerificationMutation,
} from '#/hooks/mutation/auth'

interface VerifyEmailFormProps {
  email?: string
}

function VerifyEmailForm({ email }: VerifyEmailFormProps) {
  const sendVerification = useSendVerificationMutation()
  const signOut = useSignOutMutation()

  function handleResend() {
    if (!email) return
    sendVerification.mutate(email)
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
      {sendVerification.isSuccess && (
        <StatusAlert variant="success" title="Verification sent">
          A new verification link has been sent. Please check your inbox.
        </StatusAlert>
      )}

      {sendVerification.isError && (
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
          <LoadingButton
            onClick={handleResend}
            isLoading={sendVerification.isPending}
            loadingText="Sending..."
            className="w-full"
          >
            Resend verification email
          </LoadingButton>
        </div>
      </div>

      <div>
        <LoadingButton
          variant="outline"
          onClick={() => signOut.mutate()}
          isLoading={signOut.isPending}
          loadingText="Signing out..."
          className="w-full"
        >
          <LogOutIcon className="size-4" />
          Log out
        </LoadingButton>
      </div>
    </AuthFormLayout>
  )
}

export { VerifyEmailForm }
export type { VerifyEmailFormProps }
