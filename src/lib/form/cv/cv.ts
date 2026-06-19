import { formOptions } from '@tanstack/react-form'
import { CvInputSchema } from '#/generated/zod/schemas/variants/input/Cv.input'
import type { CvInputType } from '#/generated/zod/schemas/variants/input/Cv.input'

export const cvDefaultValues: Pick<CvInputType, 'name'> = {
  name: '',
}

export const cvFormOpts = formOptions({
  defaultValues: cvDefaultValues,
  validators: { onSubmit: CvInputSchema.pick({ name: true }) },
})
