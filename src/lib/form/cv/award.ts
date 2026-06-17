import { formOptions } from '@tanstack/react-form'
import { AwardInputSchema } from '#/generated/zod/schemas/variants/input/Award.input'
import type { AwardInputType } from '#/generated/zod/schemas/variants/input/Award.input'

export const awardDefaultValues: AwardInputType = {
  title: '',
  organization: '',
  date: new Date(),
  description: '',
}

export const awardFormOpts = formOptions({
  defaultValues: awardDefaultValues,
  validators: { onSubmit: AwardInputSchema },
})
