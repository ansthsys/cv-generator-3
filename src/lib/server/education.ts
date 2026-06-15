import { createServerFn } from '@tanstack/react-start'
import { ensureSession } from '#/lib/better-auth/auth.function'
import * as svc from '#/lib/services/education'

export const listEducations = createServerFn({ method: 'GET', strict: false })
  .inputValidator((cvId: string) => cvId)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return svc.getUserEducations(data, session.user.id)
  })

export const createEducation = createServerFn({ method: 'POST', strict: false })
  .inputValidator(
    (input: {
      cvId: string
      level: string
      institution: string
      fieldOfStudy?: string | null
      gpa?: number | null
      startDate: string | Date
      endDate?: string | Date | null
      isCurrent: boolean
      description?: string | null
    }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return svc.createUserEducation(data.cvId, session.user.id, data)
  })

export const updateEducation = createServerFn({ method: 'POST', strict: false })
  .inputValidator(
    (input: {
      id: string
      level?: string
      institution?: string
      fieldOfStudy?: string | null
      gpa?: number | null
      startDate?: string | Date
      endDate?: string | Date | null
      isCurrent?: boolean
      description?: string | null
    }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return svc.updateUserEducation(data.id, session.user.id, data)
  })

export const deleteEducation = createServerFn({ method: 'POST' })
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    await svc.deleteUserEducation(data, session.user.id)
  })

export const reorderEducations = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: { items: { id: string; sortOrder: number }[] }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    await svc.reorderUserEducations(data.items, session.user.id)
  })
