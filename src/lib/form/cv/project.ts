import { formOptions } from '@tanstack/react-form'
import { ProjectInputSchema } from '#/generated/zod/schemas/variants/input/Project.input'
import type { ProjectInputType } from '#/generated/zod/schemas/variants/input/Project.input'

export const projectDefaultValues: ProjectInputType = {
  name: '',
  url: '',
  startDate: new Date(),
  endDate: null,
  isCurrent: false,
  description: '',
}

export const projectFormOpts = formOptions({
  defaultValues: projectDefaultValues,
  validators: { onSubmit: ProjectInputSchema },
})
