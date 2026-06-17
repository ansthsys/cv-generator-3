import { formOptions } from '@tanstack/react-form'
import { OrganizationInputSchema } from '#/generated/zod/schemas/variants/input/Organization.input'
import type { OrganizationInputType } from '#/generated/zod/schemas/variants/input/Organization.input'

export const organizationDefaultValues: OrganizationInputType = {
  name: '',
  role: '',
  startDate: new Date(),
  endDate: null,
  isCurrent: false,
  description: '',
}

export const organizationFormOpts = formOptions({
  defaultValues: organizationDefaultValues,
  validators: { onSubmit: OrganizationInputSchema },
})
