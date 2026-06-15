import { prisma } from '#/db'

export async function findEducationsByCvId(cvId: string) {
  return prisma.education.findMany({
    where: { cvId },
    orderBy: { sortOrder: 'asc' },
  })
}

export async function findEducationById(id: string) {
  return prisma.education.findUnique({
    where: { id },
    include: { cv: true },
  })
}

export async function getMaxEducationSortOrder(cvId: string) {
  const result = await prisma.education.aggregate({
    where: { cvId },
    _max: { sortOrder: true },
  })
  return result._max.sortOrder ?? 0
}

export async function insertEducation(data: {
  cvId: string
  level: string
  institution: string
  fieldOfStudy: string | null
  gpa: number | null
  startDate: Date
  endDate: Date | null
  isCurrent: boolean
  description: string | null
  sortOrder: number
}) {
  return prisma.education.create({
    data: { ...data, level: data.level as never },
  })
}

export async function updateEducationById(
  id: string,
  data: {
    level?: string
    institution?: string
    fieldOfStudy?: string | null
    gpa?: number | null
    startDate?: Date
    endDate?: Date | null
    isCurrent?: boolean
    description?: string | null
  },
) {
  return prisma.education.update({
    where: { id },
    data: { ...data, level: data.level as never },
  })
}

export async function deleteEducationById(id: string) {
  await prisma.education.delete({ where: { id } })
}

export async function updateEducationSortOrders(
  items: { id: string; sortOrder: number }[],
) {
  await Promise.all(
    items.map((item) =>
      prisma.education.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder },
      }),
    ),
  )
}
