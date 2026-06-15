import { prisma } from '#/db'

export async function findSocialLinksByCvId(cvId: string) {
  return prisma.socialLink.findMany({
    where: { cvId },
    orderBy: { sortOrder: 'asc' },
  })
}

export async function findSocialLinkById(id: string) {
  return prisma.socialLink.findUnique({
    where: { id },
    include: { cv: true },
  })
}

export async function getMaxSocialLinkSortOrder(cvId: string) {
  const result = await prisma.socialLink.aggregate({
    where: { cvId },
    _max: { sortOrder: true },
  })
  return result._max.sortOrder ?? 0
}

export async function insertSocialLink(data: {
  cvId: string
  label: string
  url: string
  sortOrder: number
}) {
  return prisma.socialLink.create({ data })
}

export async function updateSocialLinkById(
  id: string,
  data: {
    label?: string
    url?: string
  },
) {
  return prisma.socialLink.update({ where: { id }, data })
}

export async function deleteSocialLinkById(id: string) {
  await prisma.socialLink.delete({ where: { id } })
}

export async function updateSocialLinkSortOrders(
  items: { id: string; sortOrder: number }[],
) {
  await Promise.all(
    items.map((item) =>
      prisma.socialLink.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder },
      }),
    ),
  )
}
