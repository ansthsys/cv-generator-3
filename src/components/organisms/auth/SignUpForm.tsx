import { useState } from 'react'
import { Link, useNavigate, useRouter } from '@tanstack/react-router'
import { FaGithub } from 'react-icons/fa'

import { FieldGroup, FieldSeparator } from '#/components/atoms/ui/field'
import { Button } from '#/components/atoms/ui/button'
import {
  TypographyH3,
  TypographyMuted,
  linkVariants,
} from '#/components/atoms/typography'
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
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <TypographyH3>Create an account</TypographyH3>
        <TypographyMuted className="text-balance">
          Fill in the form below to create your account
        </TypographyMuted>
      </div>

      <FieldGroup>
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
          <div>
            <form.SubscribeButton label="Create account" />
          </div>
        </form.AppForm>

        <FieldSeparator>Or continue with</FieldSeparator>

        <div>
          <Button variant="outline" className="w-full" type="button">
            <FaGithub />
            Sign up with GitHub
          </Button>
        </div>

        <TypographyMuted className="text-center">
          Already have an account?{' '}
          <Link to="/login" className={linkVariants({ variant: 'muted' })}>
            Sign in
          </Link>
        </TypographyMuted>
      </FieldGroup>
    </form>
  )
}

export { SignUpForm }
