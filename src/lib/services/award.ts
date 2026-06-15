import { parseDate } from './date-utils'
import * as repo from '#/lib/repository/award'

export async function getUserAwards(cvId: string, userId: string) {
  const { findCvById } = await import('#/lib/repository/cv')
  const cv = await findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  return repo.findAwardsByCvId(cvId)
}

export async function createUserAward(
  cvId: string,
  userId: string,
  data: {
    title: string
    organization: string
    date: string | Date
    description?: string | null
  },
) {
  const { findCvById } = await import('#/lib/repository/cv')
  const cv = await findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  const maxSort = await repo.getMaxAwardSortOrder(cvId)
  return repo.insertAward({
    cvId,
    title: data.title,
    organization: data.organization,
    date: parseDate(data.date) as Date,
    description: data.description ?? null,
    sortOrder: maxSort + 1,
  })
}

export async function updateUserAward(
  id: string,
  userId: string,
  data: {
    title?: string
    organization?: string
    date?: string | Date
    description?: string | null
  },
) {
  const award = await repo.findAwardById(id)
  if (!award || award.cv.userId !== userId) throw new Error('Not found')
  return repo.updateAwardById(id, {
    title: data.title,
    organization: data.organization,
    date: data.date ? (parseDate(data.date) as Date) : undefined,
    description:
      data.description !== undefined ? (data.description ?? null) : undefined,
  })
}

export async function deleteUserAward(id: string, userId: string) {
  const award = await repo.findAwardById(id)
  if (!award || award.cv.userId !== userId) throw new Error('Not found')
  await repo.deleteAwardById(id)
}

export async function reorderUserAwards(
  items: { id: string; sortOrder: number }[],
  userId: string,
) {
  const firstItem = await repo.findAwardById(items[0]?.id)
  if (!firstItem || firstItem.cv.userId !== userId) throw new Error('Not found')
  await repo.updateAwardSortOrders(items)
}
