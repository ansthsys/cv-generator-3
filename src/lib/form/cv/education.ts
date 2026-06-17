import { formOptions } from '@tanstack/react-form'
import { EducationInputSchema } from '#/generated/zod/schemas/variants/input/Education.input'
import type { EducationInputType } from '#/generated/zod/schemas/variants/input/Education.input'

export const educationDefaultValues: EducationInputType = {
  level: 'S1',
  institution: '',
  fieldOfStudy: '',
  gpa: null,
  startDate: new Date(),
  endDate: null as Date | null,
  isCurrent: false,
  description: '',
}

export const educationFormOpts = formOptions({
  defaultValues: educationDefaultValues,
  validators: { onSubmit: EducationInputSchema },
})
