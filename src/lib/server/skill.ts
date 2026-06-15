import { createServerFn } from '@tanstack/react-start'
import { ensureSession } from '#/lib/better-auth/auth.function'
import {
  getUserSkills,
  createUserSkill,
  updateUserSkill,
  deleteUserSkill,
  reorderUserSkill,
} from '#/lib/services/skill'
import type { SkillInput } from '#/lib/services/skill'

export const listSkills = createServerFn({ method: 'GET' })
  .inputValidator((cvId: string) => cvId)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return getUserSkills(data, session.user.id)
  })

export const createSkill = createServerFn({ method: 'POST' })
  .inputValidator((input: { cvId: string } & SkillInput) => input)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return createUserSkill(data.cvId, session.user.id, data)
  })

export const updateSkill = createServerFn({ method: 'POST' })
  .inputValidator((input: { id: string } & Partial<SkillInput>) => input)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return updateUserSkill(data.id, session.user.id, data)
  })

export const deleteSkill = createServerFn({ method: 'POST' })
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return deleteUserSkill(data, session.user.id)
  })

export const reorderSkills = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: { items: { id: string; sortOrder: number }[] }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return reorderUserSkill(data.items, session.user.id)
  })
