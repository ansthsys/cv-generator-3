import { prisma } from '#/db'

export function findSkillsByCvId(cvId: string) {
  return prisma.skill.findMany({
    where: { cvId },
    orderBy: { sortOrder: 'asc' },
  })
}

export function findSkillById(id: string) {
  return prisma.skill.findUnique({
    where: { id },
    include: { cv: true },
  })
}

export function getMaxSkillSortOrder(cvId: string) {
  return prisma.skill.aggregate({
    where: { cvId },
    _max: { sortOrder: true },
  })
}

export function insertSkill(data: {
  cvId: string
  name: string
  level?: string | null
  sortOrder: number
}) {
  return prisma.skill.create({ data })
}

export function updateSkillById(
  id: string,
  data: { name?: string; level?: string | null | undefined },
) {
  return prisma.skill.update({
    where: { id },
    data,
  })
}

export function deleteSkillById(id: string) {
  return prisma.skill.delete({ where: { id } })
}

export function updateSkillSortOrders(
  items: { id: string; sortOrder: number }[],
) {
  return Promise.all(
    items.map((item) =>
      prisma.skill.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder },
      }),
    ),
  )
}
