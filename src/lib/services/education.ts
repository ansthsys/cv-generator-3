import { parseDate } from './date-utils'
import * as repo from '#/lib/repository/education'

export async function getUserEducations(cvId: string, userId: string) {
  const { findCvById } = await import('#/lib/repository/cv')
  const cv = await findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  const educations = await repo.findEducationsByCvId(cvId)
  return educations.map((edu) => ({
    ...edu,
    gpa: edu.gpa ? Number(edu.gpa) : null,
  }))
}

export async function createUserEducation(
  cvId: string,
  userId: string,
  data: {
    level: string
    institution: string
    fieldOfStudy?: string | null
    gpa?: number | null
    startDate: string | Date
    endDate?: string | Date | null
    isCurrent: boolean
    description?: string | null
  },
) {
  const { findCvById } = await import('#/lib/repository/cv')
  const cv = await findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  const maxSort = await repo.getMaxEducationSortOrder(cvId)
  return repo.insertEducation({
    cvId,
    level: data.level,
    institution: data.institution,
    fieldOfStudy: data.fieldOfStudy ?? null,
    gpa: data.gpa ?? null,
    startDate: parseDate(data.startDate) as Date,
    endDate: parseDate(data.endDate) as Date | null,
    isCurrent: data.isCurrent,
    description: data.description ?? null,
    sortOrder: maxSort + 1,
  })
}

export async function updateUserEducation(
  id: string,
  userId: string,
  data: {
    level?: string
    institution?: string
    fieldOfStudy?: string | null
    gpa?: number | null
    startDate?: string | Date
    endDate?: string | Date | null
    isCurrent?: boolean
    description?: string | null
  },
) {
  const edu = await repo.findEducationById(id)
  if (!edu || edu.cv.userId !== userId) throw new Error('Not found')
  return repo.updateEducationById(id, {
    level: data.level,
    institution: data.institution,
    fieldOfStudy:
      data.fieldOfStudy !== undefined ? (data.fieldOfStudy ?? null) : undefined,
    gpa: data.gpa !== undefined ? (data.gpa ?? null) : undefined,
    startDate: data.startDate ? (parseDate(data.startDate) as Date) : undefined,
    endDate: data.endDate !== undefined ? parseDate(data.endDate) : undefined,
    isCurrent: data.isCurrent,
    description:
      data.description !== undefined ? (data.description ?? null) : undefined,
  })
}

export async function deleteUserEducation(id: string, userId: string) {
  const edu = await repo.findEducationById(id)
  if (!edu || edu.cv.userId !== userId) throw new Error('Not found')
  await repo.deleteEducationById(id)
}

export async function reorderUserEducations(
  items: { id: string; sortOrder: number }[],
  userId: string,
) {
  const firstItem = await repo.findEducationById(items[0]?.id)
  if (!firstItem || firstItem.cv.userId !== userId) throw new Error('Not found')
  await repo.updateEducationSortOrders(items)
}
