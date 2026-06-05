import { formOptions } from '@tanstack/react-form'
import { registerSchema } from '#/lib/schema/auth/register'

export const registerFormOpts = formOptions({
  defaultValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  validators: {
    onChange: registerSchema,
  },
})
