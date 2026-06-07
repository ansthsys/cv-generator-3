import { useState } from 'react'

import { AuthFormLayout } from '#/components/molecules/auth-form/AuthFormLayout'
import { authClient } from '#/lib/better-auth/auth-client'
import { forgotPasswordFormOpts } from '#/lib/form/auth/forgot-password'
import { useAppForm } from '#/hooks/useAppForm'
import { StatusAlert } from '#/components/molecules/status-alert/StatusAlert'

function ForgotPasswordForm() {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useAppForm({
    ...forgotPasswordFormOpts,
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      const { error } = await authClient.requestPasswordReset({
        email: value.email,
        redirectTo: '/reset-password',
      })
      if (error) {
        setSubmitError(error.message ?? 'An unexpected error occurred')
        return
      }
      setIsSubmitted(true)
    },
  })

  if (isSubmitted) {
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
      {submitError && (
        <StatusAlert variant="error" title="Error">
          {submitError}
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
