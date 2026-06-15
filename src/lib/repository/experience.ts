import { prisma } from '#/db'

export async function findExperiencesByCvId(cvId: string) {
  return prisma.experience.findMany({
    where: { cvId },
    orderBy: { sortOrder: 'asc' },
  })
}

export async function findExperienceById(id: string) {
  return prisma.experience.findUnique({
    where: { id },
    include: { cv: true },
  })
}

export async function getMaxExperienceSortOrder(cvId: string) {
  const result = await prisma.experience.aggregate({
    where: { cvId },
    _max: { sortOrder: true },
  })
  return result._max.sortOrder ?? 0
}

export async function insertExperience(data: {
  cvId: string
  title: string
  company: string
  type: string
  startDate: Date
  endDate: Date | null
  isCurrent: boolean
  description: string | null
  sortOrder: number
}) {
  return prisma.experience.create({
    data: { ...data, type: data.type as never },
  })
}

export async function updateExperienceById(
  id: string,
  data: {
    title?: string
    company?: string
    type?: string
    startDate?: Date
    endDate?: Date | null
    isCurrent?: boolean
    description?: string | null
  },
) {
  return prisma.experience.update({
    where: { id },
    data: { ...data, type: data.type as never },
  })
}

export async function deleteExperienceById(id: string) {
  await prisma.experience.delete({ where: { id } })
}

export async function updateExperienceSortOrders(
  items: { id: string; sortOrder: number }[],
) {
  await Promise.all(
    items.map((item) =>
      prisma.experience.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder },
      }),
    ),
  )
}
