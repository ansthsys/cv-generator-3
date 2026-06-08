import { Link } from '@tanstack/react-router'

import { Button } from '#/components/atoms/ui/button'
import { AuthFormLayout } from '#/components/molecules/auth-form/AuthFormLayout'
import { resetPasswordFormOpts } from '#/lib/form/auth/reset-password'
import { useAppForm } from '#/hooks/useAppForm'
import { useResetPasswordMutation } from '#/hooks/mutation/auth'
import { StatusAlert } from '#/components/molecules/common/StatusAlert'

interface ResetPasswordFormProps {
  token: string
}

function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const resetPasswordMutation = useResetPasswordMutation(token)

  const form = useAppForm({
    ...resetPasswordFormOpts,
    onSubmit: async ({ value }) => {
      await resetPasswordMutation.mutateAsync(value)
    },
  })

  if (resetPasswordMutation.isSuccess) {
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
      {resetPasswordMutation.isError && (
        <StatusAlert variant="error" title="Error">
          {resetPasswordMutation.error.message}
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
