import { prisma } from '#/db'

export async function findCvsByUserId(userId: string) {
  return prisma.cv.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  })
}

export async function findCvById(id: string) {
  return prisma.cv.findUnique({ where: { id } })
}

export async function findCvWithRelations(id: string) {
  return prisma.cv.findUnique({
    where: { id },
    include: {
      personalDetail: true,
      experiences: { orderBy: { sortOrder: 'asc' } },
      educations: { orderBy: { sortOrder: 'asc' } },
      projects: { orderBy: { sortOrder: 'asc' } },
      skills: { orderBy: { sortOrder: 'asc' } },
      certificates: { orderBy: { sortOrder: 'asc' } },
      awards: { orderBy: { sortOrder: 'asc' } },
      organizations: { orderBy: { sortOrder: 'asc' } },
      socialLinks: { orderBy: { sortOrder: 'asc' } },
    },
  })
}

export async function insertCv(data: {
  userId: string
  name: string
  isPublic: boolean
}) {
  return prisma.cv.create({ data })
}

export async function updateCvById(
  id: string,
  data: { name?: string; isPublic?: boolean; config?: unknown },
) {
  return prisma.cv.update({
    where: { id },
    data: data as Parameters<typeof prisma.cv.update>[0]['data'],
  })
}

export async function deleteCvById(id: string) {
  await prisma.cv.delete({ where: { id } })
}

export async function findPersonalDetailByCvId(cvId: string) {
  return prisma.personalDetail.findUnique({ where: { cvId } })
}

export async function upsertPersonalDetail(
  cvId: string,
  data: {
    fullName: string
    phone: string
    email: string
    photoUrl?: string | null
    city?: string | null
    summary?: string | null
  },
) {
  return prisma.personalDetail.upsert({
    where: { cvId },
    create: {
      cvId,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      photoUrl: data.photoUrl ?? null,
      city: data.city ?? null,
      summary: data.summary ?? null,
    },
    update: {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      photoUrl: data.photoUrl ?? null,
      city: data.city ?? null,
      summary: data.summary ?? null,
    },
  })
}
