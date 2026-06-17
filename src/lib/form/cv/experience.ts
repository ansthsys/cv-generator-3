import { formOptions } from '@tanstack/react-form'
import { ExperienceInputSchema } from '#/generated/zod/schemas/variants/input/Experience.input'
import type { ExperienceInputType } from '#/generated/zod/schemas/variants/input/Experience.input'

export const experienceDefaultValues: ExperienceInputType = {
  title: '',
  company: '',
  type: 'PENUH_WAKTU' as const,
  startDate: new Date(),
  endDate: null,
  isCurrent: false,
  description: '',
}

export const experienceFormOpts = formOptions({
  defaultValues: experienceDefaultValues,
  validators: { onSubmit: ExperienceInputSchema },
})
