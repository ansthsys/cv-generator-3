import { useNavigate } from '@tanstack/react-router'

import { AuthFormLayout } from '#/components/molecules/auth-form/AuthFormLayout'
import { SignInFooter } from '#/components/molecules/auth-form/SignInFooter'
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
      footer={<SignInFooter />}
    >
      <div className="grid gap-4">
        {signInMutation.isError && (
          <StatusAlert variant="error" title="Error">
            {signInMutation.error.message}
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
          <div className="w-full">
            <form.SubscribeButton label="Sign in" className="w-full" />
          </div>
        </form.AppForm>
      </div>
    </AuthFormLayout>
  )
}

export { SignInForm }
export type { SignInFormProps }
