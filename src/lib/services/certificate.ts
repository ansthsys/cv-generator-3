import { prisma } from '#/db'
import {
  findCertificatesByCvId,
  findCertificateById,
  getMaxCertificateSortOrder,
  insertCertificate,
  updateCertificateById,
  deleteCertificateById,
  updateCertificateSortOrders,
} from '#/lib/repository/certificate'
import { parseDate } from './date-utils'

export interface CertificateInput {
  name: string
  organization: string
  date: string | Date
  description?: string | null
}

export async function getUserCertificates(cvId: string, userId: string) {
  const cv = await prisma.cv.findFirst({
    where: { id: cvId, userId },
  })
  if (!cv) throw new Error('CV not found')
  return findCertificatesByCvId(cvId)
}

export async function createUserCertificate(
  cvId: string,
  userId: string,
  data: CertificateInput,
) {
  const cv = await prisma.cv.findFirst({
    where: { id: cvId, userId },
  })
  if (!cv) throw new Error('CV not found')
  const maxSort = await getMaxCertificateSortOrder(cvId)
  return insertCertificate({
    cvId,
    name: data.name,
    organization: data.organization,
    date: parseDate(data.date) as Date,
    description: data.description ?? null,
    sortOrder: (maxSort._max.sortOrder ?? 0) + 1,
  })
}

export async function updateUserCertificate(
  id: string,
  userId: string,
  data: Partial<CertificateInput>,
) {
  const certificate = await findCertificateById(id)
  if (!certificate || certificate.cv.userId !== userId)
    throw new Error('Not found')
  const updateData: {
    name?: string
    organization?: string
    date?: Date | undefined
    description?: string | null | undefined
  } = {}
  if (data.name !== undefined) updateData.name = data.name
  if (data.organization !== undefined)
    updateData.organization = data.organization
  if (data.date !== undefined)
    updateData.date = parseDate(data.date) as Date | undefined
  if (data.description !== undefined)
    updateData.description = data.description ?? null
  return updateCertificateById(id, updateData)
}

export async function deleteUserCertificate(id: string, userId: string) {
  const certificate = await findCertificateById(id)
  if (!certificate || certificate.cv.userId !== userId)
    throw new Error('Not found')
  return deleteCertificateById(id)
}

export async function reorderUserCertificate(
  items: { id: string; sortOrder: number }[],
  userId: string,
) {
  const firstItem = await findCertificateById(items[0]?.id)
  if (!firstItem || firstItem.cv.userId !== userId) throw new Error('Not found')
  return updateCertificateSortOrders(items)
}
