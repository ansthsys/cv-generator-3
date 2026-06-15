import { formOptions } from '@tanstack/react-form'
import { createCvSchema } from '#/lib/schema/cv'

export const createCvFormOpts = formOptions({
  defaultValues: {
    name: '',
  },
  validators: {
    onChange: createCvSchema,
  },
})
