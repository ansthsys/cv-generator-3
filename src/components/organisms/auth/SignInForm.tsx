import { useState } from 'react'
import { Link, useNavigate, useRouter } from '@tanstack/react-router'
import { FaGithub } from 'react-icons/fa'

import { Button } from '#/components/atoms/ui/button'
import {
  TypographyH3,
  TypographyMuted,
  linkVariants,
} from '#/components/atoms/typography'
import { authClient } from '#/lib/better-auth/auth-client'
import { loginFormOpts } from '#/lib/form/auth/login'
import { useAppForm } from '#/hooks/useAppForm'
import { FieldGroup, FieldSeparator } from '#/components/atoms/ui/field'
import { StatusAlert } from '#/components/molecules/status-alert/StatusAlert'

interface SignInFormProps {
  initialEmail?: string
}

function SignInForm({ initialEmail }: SignInFormProps) {
  const navigate = useNavigate()
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useAppForm({
    ...loginFormOpts,
    defaultValues: {
      email: initialEmail ?? '',
      password: '',
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      const { data, error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
        rememberMe: value.rememberMe,
      })
      if (error) {
        setSubmitError(error.message ?? 'An unexpected error occurred')
        return
      }
      router.invalidate()
      if (!data.user.emailVerified) {
        navigate({ to: '/verify-email', search: { email: value.email } })
        return
      }
      navigate({ to: '/' })
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
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <TypographyH3>Sign in</TypographyH3>
          <TypographyMuted className="text-balance">
            Enter your email below to sign in to your account
          </TypographyMuted>
        </div>

        <div className="grid gap-4">
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

          <form.AppField
            name="password"
            children={(field) => (
              <field.FieldInput
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
            )}
          />

          <form.AppField
            name="rememberMe"
            children={(field) => <field.FieldCheckbox label="Remember me" />}
          />

          <form.AppForm>
            <div>
              <form.SubscribeButton label="Sign in" />
            </div>
          </form.AppForm>
        </div>

        <FieldSeparator>Or continue with</FieldSeparator>

        <div>
          <Button variant="outline" className="w-full" type="button">
            <FaGithub />
            Sign in with GitHub
          </Button>
        </div>

        <div>
          <TypographyMuted className="text-center">
            Don&apos;t have an account?{' '}
            <Link to="/register" className={linkVariants({ variant: 'muted' })}>
              Sign up
            </Link>
          </TypographyMuted>
          <TypographyMuted className="text-center">
            Forgot your password?{' '}
            <Link
              to="/forgot-password"
              className={linkVariants({ variant: 'muted' })}
            >
              Reset here
            </Link>
          </TypographyMuted>
        </div>
      </FieldGroup>
    </form>
  )
}

export { SignInForm }
export type { SignInFormProps }
