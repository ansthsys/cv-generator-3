import { formOptions } from '@tanstack/react-form'
import { PersonalDetailInputSchema } from '#/generated/zod/schemas/variants/input/PersonalDetail.input'
import type { PersonalDetailInputType } from '#/generated/zod/schemas/variants/input/PersonalDetail.input'

export const personalDetailDefaultValues: PersonalDetailInputType = {
  fullName: '',
  phone: '',
  email: '',
  photoUrl: '',
  city: '',
  summary: '',
}

export const personalDetailFormOpts = formOptions({
  defaultValues: personalDetailDefaultValues,
  validators: { onSubmit: PersonalDetailInputSchema },
})
