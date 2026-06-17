import { formOptions } from '@tanstack/react-form'
import { CertificateInputSchema } from '#/generated/zod/schemas/variants/input/Certificate.input'
import type { CertificateInputType } from '#/generated/zod/schemas/variants/input/Certificate.input'

export const certificateDefaultValues: CertificateInputType = {
  name: '',
  organization: '',
  date: new Date(),
  description: '',
}

export const certificateFormOpts = formOptions({
  defaultValues: certificateDefaultValues,
  validators: { onSubmit: CertificateInputSchema },
})
