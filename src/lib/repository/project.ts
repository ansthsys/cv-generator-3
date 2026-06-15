import { prisma } from '#/db'

export function findProjectsByCvId(cvId: string) {
  return prisma.project.findMany({
    where: { cvId },
    orderBy: { sortOrder: 'asc' },
  })
}

export function findProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: { cv: true },
  })
}

export function getMaxProjectSortOrder(cvId: string) {
  return prisma.project.aggregate({
    where: { cvId },
    _max: { sortOrder: true },
  })
}

export function insertProject(data: {
  cvId: string
  name: string
  url?: string | null
  startDate: Date
  endDate?: Date | null
  isCurrent: boolean
  description?: string | null
  sortOrder: number
}) {
  return prisma.project.create({ data })
}

export function updateProjectById(
  id: string,
  data: {
    name?: string
    url?: string | null | undefined
    startDate?: Date | undefined
    endDate?: Date | null | undefined
    isCurrent?: boolean
    description?: string | null | undefined
  },
) {
  return prisma.project.update({
    where: { id },
    data,
  })
}

export function deleteProjectById(id: string) {
  return prisma.project.delete({ where: { id } })
}

export function updateProjectSortOrders(
  items: { id: string; sortOrder: number }[],
) {
  return Promise.all(
    items.map((item) =>
      prisma.project.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder },
      }),
    ),
  )
}
