import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

import { Button } from '#/components/atoms/ui/button'
import { FieldInput } from '#/components/molecules/form-field'
import { Link } from '@tanstack/react-router'
import { FaGithub } from 'react-icons/fa'

const signInSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Minimal 8 karakter'),
})

function SignInForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: ({ value }) => {
      console.log('sign in', value)
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
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to sign in to your account
        </p>
      </div>

      <div className="grid gap-4">
        <form.Field
          name="email"
          validators={{ onChange: z.string().email('Email tidak valid') }}
        >
          {(field) => (
            <FieldInput
              title="Email"
              placeholder="you@example.com"
              error={field.state.meta.errors[0]?.message}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{ onChange: z.string().min(8, 'Minimal 8 karakter') }}
        >
          {(field) => (
            <FieldInput
              title="Password"
              type="password"
              placeholder="Enter your password"
              error={field.state.meta.errors[0]?.message}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          )}
        </form.Field>

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </div>

      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>

      <Button variant="outline" className="w-full" type="button">
        <FaGithub />
        Sign in with GitHub
      </Button>

      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  )
}

export { SignInForm }
