import { formOptions } from '@tanstack/react-form'
import { loginSchema } from '#/lib/schema/auth/login'

export const loginFormOpts = formOptions({
  defaultValues: {
    email: '',
    password: '',
    rememberMe: false,
  },
  validators: {
    onChange: loginSchema,
  },
})
