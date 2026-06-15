import { createServerFn } from '@tanstack/react-start'
import { ensureSession } from '#/lib/better-auth/auth.function'
import {
  getUserCertificates,
  createUserCertificate,
  updateUserCertificate,
  deleteUserCertificate,
  reorderUserCertificate,
} from '#/lib/services/certificate'
import type { CertificateInput } from '#/lib/services/certificate'

export const listCertificates = createServerFn({ method: 'GET' })
  .inputValidator((cvId: string) => cvId)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return getUserCertificates(data, session.user.id)
  })

export const createCertificate = createServerFn({ method: 'POST' })
  .inputValidator((input: { cvId: string } & CertificateInput) => input)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return createUserCertificate(data.cvId, session.user.id, data)
  })

export const updateCertificate = createServerFn({ method: 'POST' })
  .inputValidator((input: { id: string } & Partial<CertificateInput>) => input)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return updateUserCertificate(data.id, session.user.id, data)
  })

export const deleteCertificate = createServerFn({ method: 'POST' })
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return deleteUserCertificate(data, session.user.id)
  })

export const reorderCertificates = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: { items: { id: string; sortOrder: number }[] }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return reorderUserCertificate(data.items, session.user.id)
  })
