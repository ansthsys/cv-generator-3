import { formOptions } from '@tanstack/react-form'

import { resetPasswordSchema } from '#/lib/schema/auth/reset-password'

export const resetPasswordFormOpts = formOptions({
  defaultValues: {
    password: '',
    confirmPassword: '',
  },
  validators: {
    onChange: resetPasswordSchema,
  },
})
