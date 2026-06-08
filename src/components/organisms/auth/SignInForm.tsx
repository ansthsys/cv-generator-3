import { Link, useNavigate } from '@tanstack/react-router'
import { FaGithub } from 'react-icons/fa'

import { Button } from '#/components/atoms/ui/button'
import { FieldSeparator } from '#/components/atoms/ui/field'
import { linkVariants, TypographyMuted } from '#/components/atoms/typography'
import { AuthFormLayout } from '#/components/molecules/auth-form/AuthFormLayout'
import { loginFormOpts } from '#/lib/form/auth/login'
import { useAppForm } from '#/hooks/useAppForm'
import { useSignInMutation } from '#/hooks/mutation/auth'
import { StatusAlert } from '#/components/molecules/common/StatusAlert'

interface SignInFormProps {
  initialEmail?: string
}

function SignInForm({ initialEmail }: SignInFormProps) {
  const navigate = useNavigate()
  const signInMutation = useSignInMutation()

  const form = useAppForm({
    ...loginFormOpts,
    defaultValues: {
      email: initialEmail ?? '',
      password: '',
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      const session = await signInMutation.mutateAsync(value)
      if (!session.user.emailVerified) {
        navigate({ to: '/verify-email', search: { email: value.email } })
        return
      }
      navigate({ to: '/' })
    },
  })

  return (
    <AuthFormLayout
      title="Sign in"
      description="Enter your email below to sign in to your account"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      {signInMutation.isError && (
        <StatusAlert variant="error" title="Error">
          {signInMutation.error.message}
        </StatusAlert>
      )}

      <div className="space-y-4">
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
      </div>

      <form.AppForm>
        <div className="w-full">
          <form.SubscribeButton label="Sign in" className="w-full" />
        </div>
      </form.AppForm>

      <FieldSeparator>Or continue with</FieldSeparator>

      <div className="w-full">
        <Button variant="outline" className="w-full" type="button">
          <FaGithub />
          Sign in with GitHub
        </Button>
      </div>

      <div className="w-full">
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
    </AuthFormLayout>
  )
}

export { SignInForm }
export type { SignInFormProps }
