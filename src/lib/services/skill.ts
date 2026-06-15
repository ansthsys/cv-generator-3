import { prisma } from '#/db'
import {
  findSkillsByCvId,
  findSkillById,
  getMaxSkillSortOrder,
  insertSkill,
  updateSkillById,
  deleteSkillById,
  updateSkillSortOrders,
} from '#/lib/repository/skill'

export interface SkillInput {
  name: string
  level?: string | null
}

export async function getUserSkills(cvId: string, userId: string) {
  const cv = await prisma.cv.findFirst({
    where: { id: cvId, userId },
  })
  if (!cv) throw new Error('CV not found')
  return findSkillsByCvId(cvId)
}

export async function createUserSkill(
  cvId: string,
  userId: string,
  data: SkillInput,
) {
  const cv = await prisma.cv.findFirst({
    where: { id: cvId, userId },
  })
  if (!cv) throw new Error('CV not found')
  const maxSort = await getMaxSkillSortOrder(cvId)
  return insertSkill({
    cvId,
    name: data.name,
    level: data.level ?? null,
    sortOrder: (maxSort._max.sortOrder ?? 0) + 1,
  })
}

export async function updateUserSkill(
  id: string,
  userId: string,
  data: Partial<SkillInput>,
) {
  const skill = await findSkillById(id)
  if (!skill || skill.cv.userId !== userId) throw new Error('Not found')
  const updateData: { name?: string; level?: string | null | undefined } = {}
  if (data.name !== undefined) updateData.name = data.name
  if (data.level !== undefined) updateData.level = data.level ?? null
  return updateSkillById(id, updateData)
}

export async function deleteUserSkill(id: string, userId: string) {
  const skill = await findSkillById(id)
  if (!skill || skill.cv.userId !== userId) throw new Error('Not found')
  return deleteSkillById(id)
}

export async function reorderUserSkill(
  items: { id: string; sortOrder: number }[],
  userId: string,
) {
  const firstItem = await findSkillById(items[0]?.id)
  if (!firstItem || firstItem.cv.userId !== userId) throw new Error('Not found')
  return updateSkillSortOrders(items)
}
