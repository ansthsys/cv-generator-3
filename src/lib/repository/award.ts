import { prisma } from '#/db'

export async function findAwardsByCvId(cvId: string) {
  return prisma.award.findMany({
    where: { cvId },
    orderBy: { sortOrder: 'asc' },
  })
}

export async function findAwardById(id: string) {
  return prisma.award.findUnique({
    where: { id },
    include: { cv: true },
  })
}

export async function getMaxAwardSortOrder(cvId: string) {
  const result = await prisma.award.aggregate({
    where: { cvId },
    _max: { sortOrder: true },
  })
  return result._max.sortOrder ?? 0
}

export async function insertAward(data: {
  cvId: string
  title: string
  organization: string
  date: Date
  description: string | null
  sortOrder: number
}) {
  return prisma.award.create({ data })
}

export async function updateAwardById(
  id: string,
  data: {
    title?: string
    organization?: string
    date?: Date
    description?: string | null
  },
) {
  return prisma.award.update({ where: { id }, data })
}

export async function deleteAwardById(id: string) {
  await prisma.award.delete({ where: { id } })
}

export async function updateAwardSortOrders(
  items: { id: string; sortOrder: number }[],
) {
  await Promise.all(
    items.map((item) =>
      prisma.award.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder },
      }),
    ),
  )
}
