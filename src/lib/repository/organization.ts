import { prisma } from '#/db'

export async function findOrganizationsByCvId(cvId: string) {
  return prisma.organization.findMany({
    where: { cvId },
    orderBy: { sortOrder: 'asc' },
  })
}

export async function findOrganizationById(id: string) {
  return prisma.organization.findUnique({
    where: { id },
    include: { cv: true },
  })
}

export async function getMaxOrganizationSortOrder(cvId: string) {
  const result = await prisma.organization.aggregate({
    where: { cvId },
    _max: { sortOrder: true },
  })
  return result._max.sortOrder ?? 0
}

export async function insertOrganization(data: {
  cvId: string
  name: string
  role: string
  startDate: Date
  endDate: Date | null
  isCurrent: boolean
  description: string | null
  sortOrder: number
}) {
  return prisma.organization.create({ data })
}

export async function updateOrganizationById(
  id: string,
  data: {
    name?: string
    role?: string
    startDate?: Date
    endDate?: Date | null
    isCurrent?: boolean
    description?: string | null
  },
) {
  return prisma.organization.update({ where: { id }, data })
}

export async function deleteOrganizationById(id: string) {
  await prisma.organization.delete({ where: { id } })
}

export async function updateOrganizationSortOrders(
  items: { id: string; sortOrder: number }[],
) {
  await Promise.all(
    items.map((item) =>
      prisma.organization.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder },
      }),
    ),
  )
}
