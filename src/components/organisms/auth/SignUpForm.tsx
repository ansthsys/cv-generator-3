import { useState } from 'react'
import { Link, useNavigate, useRouter } from '@tanstack/react-router'

import { linkVariants } from '#/components/atoms/typography'
import { AuthFormLayout } from '#/components/molecules/auth-form/AuthFormLayout'
import { SignUpFooter } from '#/components/molecules/auth-form/SignUpFooter'
import { StatusAlert } from '#/components/molecules/status-alert/StatusAlert'
import { authClient } from '#/lib/better-auth/auth-client'
import { registerFormOpts } from '#/lib/form/auth/register'
import { useAppForm } from '#/hooks/useAppForm'

function SignUpForm() {
  const navigate = useNavigate()
  const router = useRouter()
  const [existingEmail, setExistingEmail] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useAppForm({
    ...registerFormOpts,
    onSubmit: async ({ value }) => {
      setExistingEmail(null)
      setSubmitError(null)
      const { error } = await authClient.signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      })
      if (error) {
        if (error.message?.toLowerCase().includes('user already exists')) {
          setExistingEmail(value.email)
          return
        }
        setSubmitError(error.message ?? 'An unexpected error occurred')
        return
      }
      router.invalidate()
      navigate({ to: '/verify-email', search: { email: value.email } })
    },
  })

  return (
    <AuthFormLayout
      title="Create an account"
      description="Fill in the form below to create your account"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      footer={<SignUpFooter />}
    >
      {existingEmail && (
        <StatusAlert variant="error" title="Email already registered">
          An account with this email already exists.{' '}
          <Link
            to="/login"
            search={{ email: existingEmail }}
            className={linkVariants({ variant: 'default' })}
          >
            Sign in instead
          </Link>
        </StatusAlert>
      )}
      {submitError && (
        <StatusAlert variant="error" title="Error">
          {submitError}
        </StatusAlert>
      )}

      <form.AppField name="name">
        {(field) => (
          <field.FieldInput label="Full Name" placeholder="John Doe" />
        )}
      </form.AppField>

      <form.AppField name="email">
        {(field) => (
          <field.FieldInput label="Email" placeholder="you@example.com" />
        )}
      </form.AppField>

      <form.AppField name="password">
        {(field) => (
          <field.FieldInput
            label="Password"
            type="password"
            placeholder="At least 8 characters"
          />
        )}
      </form.AppField>

      <form.AppField name="confirmPassword">
        {(field) => (
          <field.FieldInput
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
          />
        )}
      </form.AppField>

      <form.AppForm>
        <div className="w-full">
          <form.SubscribeButton label="Create account" className="w-full" />
        </div>
      </form.AppForm>
    </AuthFormLayout>
  )
}

export { SignUpForm }
