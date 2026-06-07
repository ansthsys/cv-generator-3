import { formOptions } from '@tanstack/react-form'

import { forgotPasswordSchema } from '#/lib/schema/auth/forgot-password'

export const forgotPasswordFormOpts = formOptions({
  defaultValues: {
    email: '',
  },
  validators: {
    onChange: forgotPasswordSchema,
  },
})
