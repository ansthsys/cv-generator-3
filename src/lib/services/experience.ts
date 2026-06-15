import { parseDate } from './date-utils'
import * as repo from '#/lib/repository/experience'

export async function getUserExperiences(cvId: string, userId: string) {
  const { findCvById } = await import('#/lib/repository/cv')
  const cv = await findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  return repo.findExperiencesByCvId(cvId)
}

export async function createUserExperience(
  cvId: string,
  userId: string,
  data: {
    title: string
    company: string
    type: string
    startDate: string | Date
    endDate?: string | Date | null
    isCurrent: boolean
    description?: string | null
  },
) {
  const { findCvById } = await import('#/lib/repository/cv')
  const cv = await findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  const maxSort = await repo.getMaxExperienceSortOrder(cvId)
  return repo.insertExperience({
    cvId,
    title: data.title,
    company: data.company,
    type: data.type,
    startDate: parseDate(data.startDate) as Date,
    endDate: parseDate(data.endDate) as Date | null,
    isCurrent: data.isCurrent,
    description: data.description ?? null,
    sortOrder: maxSort + 1,
  })
}

export async function updateUserExperience(
  id: string,
  userId: string,
  data: {
    title?: string
    company?: string
    type?: string
    startDate?: string | Date
    endDate?: string | Date | null
    isCurrent?: boolean
    description?: string | null
  },
) {
  const exp = await repo.findExperienceById(id)
  if (!exp || exp.cv.userId !== userId) throw new Error('Not found')
  return repo.updateExperienceById(id, {
    title: data.title,
    company: data.company,
    type: data.type,
    startDate: data.startDate ? (parseDate(data.startDate) as Date) : undefined,
    endDate: data.endDate !== undefined ? parseDate(data.endDate) : undefined,
    isCurrent: data.isCurrent,
    description:
      data.description !== undefined ? (data.description ?? null) : undefined,
  })
}

export async function deleteUserExperience(id: string, userId: string) {
  const exp = await repo.findExperienceById(id)
  if (!exp || exp.cv.userId !== userId) throw new Error('Not found')
  await repo.deleteExperienceById(id)
}

export async function reorderUserExperiences(
  items: { id: string; sortOrder: number }[],
  userId: string,
) {
  const firstItem = await repo.findExperienceById(items[0]?.id)
  if (!firstItem || firstItem.cv.userId !== userId) throw new Error('Not found')
  await repo.updateExperienceSortOrders(items)
}
