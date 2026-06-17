import { formOptions } from '@tanstack/react-form'
import { SocialLinkInputSchema } from '#/generated/zod/schemas/variants/input/SocialLink.input'
import type { SocialLinkInputType } from '#/generated/zod/schemas/variants/input/SocialLink.input'

export const socialLinkDefaultValues: SocialLinkInputType = {
  label: '',
  url: '',
}

export const socialLinkFormOpts = formOptions({
  defaultValues: socialLinkDefaultValues,
  validators: { onSubmit: SocialLinkInputSchema },
})
