import { parseDate } from './date-utils'
import * as repo from '#/lib/repository/organization'

export async function getUserOrganizations(cvId: string, userId: string) {
  const { findCvById } = await import('#/lib/repository/cv')
  const cv = await findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  return repo.findOrganizationsByCvId(cvId)
}

export async function createUserOrganization(
  cvId: string,
  userId: string,
  data: {
    name: string
    role: string
    startDate: string | Date
    endDate?: string | Date | null
    isCurrent: boolean
    description?: string | null
  },
) {
  const { findCvById } = await import('#/lib/repository/cv')
  const cv = await findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  const maxSort = await repo.getMaxOrganizationSortOrder(cvId)
  return repo.insertOrganization({
    cvId,
    name: data.name,
    role: data.role,
    startDate: parseDate(data.startDate) as Date,
    endDate: parseDate(data.endDate) as Date | null,
    isCurrent: data.isCurrent,
    description: data.description ?? null,
    sortOrder: maxSort + 1,
  })
}

export async function updateUserOrganization(
  id: string,
  userId: string,
  data: {
    name?: string
    role?: string
    startDate?: string | Date
    endDate?: string | Date | null
    isCurrent?: boolean
    description?: string | null
  },
) {
  const org = await repo.findOrganizationById(id)
  if (!org || org.cv.userId !== userId) throw new Error('Not found')
  return repo.updateOrganizationById(id, {
    name: data.name,
    role: data.role,
    startDate: data.startDate ? (parseDate(data.startDate) as Date) : undefined,
    endDate: data.endDate !== undefined ? parseDate(data.endDate) : undefined,
    isCurrent: data.isCurrent,
    description:
      data.description !== undefined ? (data.description ?? null) : undefined,
  })
}

export async function deleteUserOrganization(id: string, userId: string) {
  const org = await repo.findOrganizationById(id)
  if (!org || org.cv.userId !== userId) throw new Error('Not found')
  await repo.deleteOrganizationById(id)
}

export async function reorderUserOrganizations(
  items: { id: string; sortOrder: number }[],
  userId: string,
) {
  const firstItem = await repo.findOrganizationById(items[0]?.id)
  if (!firstItem || firstItem.cv.userId !== userId) throw new Error('Not found')
  await repo.updateOrganizationSortOrders(items)
}
