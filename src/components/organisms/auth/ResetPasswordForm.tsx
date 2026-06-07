import { useState } from 'react'
import { Link } from '@tanstack/react-router'

import { Button } from '#/components/atoms/ui/button'
import { AuthFormLayout } from '#/components/molecules/auth-form/AuthFormLayout'
import { authClient } from '#/lib/better-auth/auth-client'
import { resetPasswordFormOpts } from '#/lib/form/auth/reset-password'
import { useAppForm } from '#/hooks/useAppForm'
import { StatusAlert } from '#/components/molecules/status-alert/StatusAlert'

interface ResetPasswordFormProps {
  token: string
}

function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useAppForm({
    ...resetPasswordFormOpts,
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      const { error } = await authClient.resetPassword({
        newPassword: value.password,
        token,
      })
      if (error) {
        setSubmitError(error.message ?? 'An unexpected error occurred')
        return
      }
      setIsSuccess(true)
    },
  })

  if (isSuccess) {
    return (
      <AuthFormLayout
        title="Password reset"
        description="Your password has been reset successfully."
      >
        <StatusAlert variant="success" title="Success">
          You can now sign in with your new password.
        </StatusAlert>

        <div className="flex justify-center">
          <Link to="/login">
            <Button>Sign in</Button>
          </Link>
        </div>
      </AuthFormLayout>
    )
  }

  return (
    <AuthFormLayout
      title="Reset password"
      description="Enter your new password below"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      {submitError && (
        <StatusAlert variant="error" title="Error">
          {submitError}
        </StatusAlert>
      )}

      <form.AppField
        name="password"
        children={(field) => (
          <field.FieldInput
            label="New Password"
            type="password"
            placeholder="At least 8 characters"
          />
        )}
      />

      <form.AppField
        name="confirmPassword"
        children={(field) => (
          <field.FieldInput
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter your new password"
          />
        )}
      />

      <form.AppForm>
        <div className="w-full">
          <form.SubscribeButton label="Reset password" className="w-full" />
        </div>
      </form.AppForm>
    </AuthFormLayout>
  )
}

export { ResetPasswordForm }
export type { ResetPasswordFormProps }
