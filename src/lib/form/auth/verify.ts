import { formOptions } from '@tanstack/react-form'

import { verifyResendSchema } from '#/lib/schema/auth/verify'

export const verifyResendFormOpts = formOptions({
  defaultValues: {
    password: '',
  },
  validators: {
    onChange: verifyResendSchema,
  },
})
