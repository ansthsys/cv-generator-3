import { prisma } from '#/db'

export function findCertificatesByCvId(cvId: string) {
  return prisma.certificate.findMany({
    where: { cvId },
    orderBy: { sortOrder: 'asc' },
  })
}

export function findCertificateById(id: string) {
  return prisma.certificate.findUnique({
    where: { id },
    include: { cv: true },
  })
}

export function getMaxCertificateSortOrder(cvId: string) {
  return prisma.certificate.aggregate({
    where: { cvId },
    _max: { sortOrder: true },
  })
}

export function insertCertificate(data: {
  cvId: string
  name: string
  organization: string
  date: Date
  description?: string | null
  sortOrder: number
}) {
  return prisma.certificate.create({ data })
}

export function updateCertificateById(
  id: string,
  data: {
    name?: string
    organization?: string
    date?: Date | undefined
    description?: string | null | undefined
  },
) {
  return prisma.certificate.update({
    where: { id },
    data,
  })
}

export function deleteCertificateById(id: string) {
  return prisma.certificate.delete({ where: { id } })
}

export function updateCertificateSortOrders(
  items: { id: string; sortOrder: number }[],
) {
  return Promise.all(
    items.map((item) =>
      prisma.certificate.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder },
      }),
    ),
  )
}
