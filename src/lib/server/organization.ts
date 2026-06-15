import { createServerFn } from '@tanstack/react-start'
import { ensureSession } from '#/lib/better-auth/auth.function'
import { prisma } from '#/db'

function parseDate(
  value: string | Date | null | undefined,
): Date | null | undefined {
  if (value == null) return value
  if (value instanceof Date) return value
  const parsed = new Date(value)
  return isNaN(parsed.getTime()) ? undefined : parsed
}

export const listOrganizations = createServerFn({ method: 'GET' })
  .inputValidator((cvId: string) => cvId)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const cv = await prisma.cv.findFirst({
      where: { id: data, userId: session.user.id },
    })
    if (!cv) throw new Error('CV not found')
    return prisma.organization.findMany({
      where: { cvId: data },
      orderBy: { sortOrder: 'asc' },
    })
  })

export const createOrganization = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: {
      cvId: string
      name: string
      role: string
      startDate: string | Date
      endDate?: string | Date | null
      isCurrent: boolean
      description?: string | null
    }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const cv = await prisma.cv.findFirst({
      where: { id: data.cvId, userId: session.user.id },
    })
    if (!cv) throw new Error('CV not found')
    const maxSort = await prisma.organization.aggregate({
      where: { cvId: data.cvId },
      _max: { sortOrder: true },
    })
    return prisma.organization.create({
      data: {
        cvId: data.cvId,
        name: data.name,
        role: data.role,
        startDate: parseDate(data.startDate) as Date,
        endDate: parseDate(data.endDate) as Date | null,
        isCurrent: data.isCurrent,
        description: data.description ?? null,
        sortOrder: (maxSort._max.sortOrder ?? 0) + 1,
      },
    })
  })

export const updateOrganization = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: {
      id: string
      name?: string
      role?: string
      startDate?: string | Date
      endDate?: string | Date | null
      isCurrent?: boolean
      description?: string | null
    }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const org = await prisma.organization.findUnique({
      where: { id: data.id },
      include: { cv: true },
    })
    if (!org || org.cv.userId !== session.user.id) throw new Error('Not found')
    return prisma.organization.update({
      where: { id: data.id },
      data: {
        name: data.name,
        role: data.role,
        startDate: data.startDate
          ? (parseDate(data.startDate) as Date)
          : undefined,
        endDate:
          data.endDate !== undefined
            ? (parseDate(data.endDate) as Date | null)
            : undefined,
        isCurrent: data.isCurrent,
        description:
          data.description !== undefined
            ? (data.description ?? null)
            : undefined,
      },
    })
  })

export const deleteOrganization = createServerFn({ method: 'POST' })
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const org = await prisma.organization.findUnique({
      where: { id: data },
      include: { cv: true },
    })
    if (!org || org.cv.userId !== session.user.id) throw new Error('Not found')
    await prisma.organization.delete({ where: { id: data } })
  })

export const reorderOrganizations = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: { items: { id: string; sortOrder: number }[] }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const firstItem = await prisma.organization.findUnique({
      where: { id: data.items[0]?.id },
      include: { cv: true },
    })
    if (!firstItem || firstItem.cv.userId !== session.user.id)
      throw new Error('Not found')
    await Promise.all(
      data.items.map((item) =>
        prisma.organization.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    )
  })
