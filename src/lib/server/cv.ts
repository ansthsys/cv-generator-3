import { createServerFn } from '@tanstack/react-start'
import { ensureSession } from '#/lib/better-auth/auth.function'
import * as svc from '#/lib/services/cv'

export const listCvs = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await ensureSession()
  return svc.getUserCvs(session.user.id)
})

export const getCv = createServerFn({ method: 'GET', strict: false })
  .inputValidator((cvId: string) => cvId)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return svc.getUserCv(data, session.user.id)
  })

export const createCv = createServerFn({ method: 'POST' })
  .inputValidator((input: { name: string }) => input)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return svc.createUserCv(data.name, session.user.id)
  })

export const updateCv = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: {
      id: string
      name?: string
      isPublic?: boolean
      config?: unknown
    }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return svc.updateUserCv(data.id, session.user.id, {
      name: data.name,
      isPublic: data.isPublic,
      config: data.config,
    })
  })

export const deleteCv = createServerFn({ method: 'POST' })
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    await svc.deleteUserCv(data, session.user.id)
  })

export const getPersonalDetail = createServerFn({ method: 'GET' })
  .inputValidator((cvId: string) => cvId)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return svc.getUserPersonalDetail(data, session.user.id)
  })

export const upsertPersonalDetail = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: {
      cvId: string
      fullName: string
      phone: string
      email: string
      photoUrl?: string | null
      city?: string | null
      summary?: string | null
    }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return svc.upsertUserPersonalDetail(data.cvId, session.user.id, data)
  })
