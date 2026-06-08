import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { FaGithub } from 'react-icons/fa'

import { Button } from '#/components/atoms/ui/button'
import { FieldSeparator } from '#/components/atoms/ui/field'
import { linkVariants, TypographyMuted } from '#/components/atoms/typography'
import { AuthFormLayout } from '#/components/molecules/auth-form/AuthFormLayout'
import { StatusAlert } from '#/components/molecules/common/StatusAlert'
import { registerFormOpts } from '#/lib/form/auth/register'
import { useAppForm } from '#/hooks/useAppForm'
import { useSignUpMutation } from '#/hooks/mutation/auth'

function SignUpForm() {
  const navigate = useNavigate()
  const signUpMutation = useSignUpMutation()
  const [existingEmail, setExistingEmail] = useState<string | null>(null)

  const form = useAppForm({
    ...registerFormOpts,
    onSubmit: async ({ value }) => {
      setExistingEmail(null)
      try {
        await signUpMutation.mutateAsync(value)
        navigate({ to: '/verify-email', search: { email: value.email } })
      } catch (error) {
        const err = error as { message?: string }
        if (err.message?.toLowerCase().includes('user already exists')) {
          setExistingEmail(value.email)
        }
      }
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

      {signUpMutation.isError && !existingEmail && (
        <StatusAlert variant="error" title="Error">
          {signUpMutation.error.message}
        </StatusAlert>
      )}

      <div className="space-y-4">
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
      </div>

      <form.AppForm>
        <div className="w-full">
          <form.SubscribeButton label="Create account" className="w-full" />
        </div>
      </form.AppForm>

      <FieldSeparator>Or continue with</FieldSeparator>

      <div className="w-full">
        <Button variant="outline" className="w-full" type="button">
          <FaGithub />
          Sign up with GitHub
        </Button>
      </div>

      <div className="w-full">
        <TypographyMuted className="text-center">
          Already have an account?{' '}
          <Link to="/login" className={linkVariants({ variant: 'muted' })}>
            Sign in
          </Link>
        </TypographyMuted>
      </div>
    </AuthFormLayout>
  )
}

export { SignUpForm }
