import { AuthFormLayout } from '#/components/molecules/auth-form/AuthFormLayout'
import { forgotPasswordFormOpts } from '#/lib/form/auth/forgot-password'
import { useAppForm } from '#/hooks/useAppForm'
import { useForgotPasswordMutation } from '#/hooks/mutation/auth'
import { StatusAlert } from '#/components/molecules/common/StatusAlert'

function ForgotPasswordForm() {
  const forgotPasswordMutation = useForgotPasswordMutation()

  const form = useAppForm({
    ...forgotPasswordFormOpts,
    onSubmit: async ({ value }) => {
      await forgotPasswordMutation.mutateAsync(value)
    },
  })

  if (forgotPasswordMutation.isSuccess) {
    return (
      <AuthFormLayout
        title="Check your email"
        description="If an account with that email exists, we have sent a password reset link."
      >
        <div className="flex justify-center">
          <StatusAlert variant="success" title="Email sent">
            Please check your inbox and follow the instructions to reset your
            password.
          </StatusAlert>
        </div>
      </AuthFormLayout>
    )
  }

  return (
    <AuthFormLayout
      title="Forgot password"
      description="Enter your email below to receive a password reset link"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      {forgotPasswordMutation.isError && (
        <StatusAlert variant="error" title="Error">
          {forgotPasswordMutation.error.message}
        </StatusAlert>
      )}

      <form.AppField
        name="email"
        children={(field) => (
          <field.FieldInput label="Email" placeholder="you@example.com" />
        )}
      />

      <form.AppForm>
        <div className="w-full">
          <form.SubscribeButton label="Send reset link" className="w-full" />
        </div>
      </form.AppForm>
    </AuthFormLayout>
  )
}

export { ForgotPasswordForm }
