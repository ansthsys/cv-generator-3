import { prisma } from '#/db'
import {
  findProjectsByCvId,
  findProjectById,
  getMaxProjectSortOrder,
  insertProject,
  updateProjectById,
  deleteProjectById,
  updateProjectSortOrders,
} from '#/lib/repository/project'
import { parseDate } from './date-utils'

export interface ProjectInput {
  name: string
  url?: string | null
  startDate: string | Date
  endDate?: string | Date | null
  isCurrent: boolean
  description?: string | null
}

export async function getUserProjects(cvId: string, userId: string) {
  const cv = await prisma.cv.findFirst({
    where: { id: cvId, userId },
  })
  if (!cv) throw new Error('CV not found')
  return findProjectsByCvId(cvId)
}

export async function createUserProject(
  cvId: string,
  userId: string,
  data: ProjectInput,
) {
  const cv = await prisma.cv.findFirst({
    where: { id: cvId, userId },
  })
  if (!cv) throw new Error('CV not found')
  const maxSort = await getMaxProjectSortOrder(cvId)
  return insertProject({
    cvId,
    name: data.name,
    url: data.url ?? null,
    startDate: parseDate(data.startDate) as Date,
    endDate: parseDate(data.endDate),
    isCurrent: data.isCurrent,
    description: data.description ?? null,
    sortOrder: (maxSort._max.sortOrder ?? 0) + 1,
  })
}

export async function updateUserProject(
  id: string,
  userId: string,
  data: Partial<ProjectInput>,
) {
  const project = await findProjectById(id)
  if (!project || project.cv.userId !== userId) throw new Error('Not found')
  const updateData: {
    name?: string
    url?: string | null | undefined
    startDate?: Date | undefined
    endDate?: Date | null | undefined
    isCurrent?: boolean
    description?: string | null | undefined
  } = {}
  if (data.name !== undefined) updateData.name = data.name
  if (data.url !== undefined) updateData.url = data.url ?? null
  if (data.startDate !== undefined)
    updateData.startDate = parseDate(data.startDate) as Date | undefined
  if (data.endDate !== undefined) updateData.endDate = parseDate(data.endDate)
  if (data.isCurrent !== undefined) updateData.isCurrent = data.isCurrent
  if (data.description !== undefined)
    updateData.description = data.description ?? null
  return updateProjectById(id, updateData)
}

export async function deleteUserProject(id: string, userId: string) {
  const project = await findProjectById(id)
  if (!project || project.cv.userId !== userId) throw new Error('Not found')
  return deleteProjectById(id)
}

export async function reorderUserProject(
  items: { id: string; sortOrder: number }[],
  userId: string,
) {
  const firstItem = await findProjectById(items[0]?.id)
  if (!firstItem || firstItem.cv.userId !== userId) throw new Error('Not found')
  return updateProjectSortOrders(items)
}
