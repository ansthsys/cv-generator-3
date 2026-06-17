import { formOptions } from '@tanstack/react-form'
import { SkillInputSchema } from '#/generated/zod/schemas/variants/input/Skill.input'
import type { SkillInputType } from '#/generated/zod/schemas/variants/input/Skill.input'

export const skillDefaultValues: SkillInputType = {
  name: '',
  level: '',
}

export const skillFormOpts = formOptions({
  defaultValues: skillDefaultValues,
  validators: { onSubmit: SkillInputSchema },
})
