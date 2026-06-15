import { createServerFn } from '@tanstack/react-start'
import { ensureSession } from '#/lib/better-auth/auth.function'
import * as svc from '#/lib/services/experience'

export const listExperiences = createServerFn({ method: 'GET' })
  .inputValidator((cvId: string) => cvId)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return svc.getUserExperiences(data, session.user.id)
  })

export const createExperience = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: {
      cvId: string
      title: string
      company: string
      type: string
      startDate: string | Date
      endDate?: string | Date | null
      isCurrent: boolean
      description?: string | null
    }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return svc.createUserExperience(data.cvId, session.user.id, data)
  })

export const updateExperience = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: {
      id: string
      title?: string
      company?: string
      type?: string
      startDate?: string | Date
      endDate?: string | Date | null
      isCurrent?: boolean
      description?: string | null
    }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return svc.updateUserExperience(data.id, session.user.id, data)
  })

export const deleteExperience = createServerFn({ method: 'POST' })
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    await svc.deleteUserExperience(data, session.user.id)
  })

export const reorderExperiences = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: { items: { id: string; sortOrder: number }[] }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    await svc.reorderUserExperiences(data.items, session.user.id)
  })
