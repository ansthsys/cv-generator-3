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

export const listAwards = createServerFn({ method: 'GET' })
  .inputValidator((cvId: string) => cvId)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const cv = await prisma.cv.findFirst({
      where: { id: data, userId: session.user.id },
    })
    if (!cv) throw new Error('CV not found')
    return prisma.award.findMany({
      where: { cvId: data },
      orderBy: { sortOrder: 'asc' },
    })
  })

export const createAward = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: {
      cvId: string
      title: string
      organization: string
      date: string | Date
      description?: string | null
    }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const cv = await prisma.cv.findFirst({
      where: { id: data.cvId, userId: session.user.id },
    })
    if (!cv) throw new Error('CV not found')
    const maxSort = await prisma.award.aggregate({
      where: { cvId: data.cvId },
      _max: { sortOrder: true },
    })
    return prisma.award.create({
      data: {
        cvId: data.cvId,
        title: data.title,
        organization: data.organization,
        date: parseDate(data.date) as Date,
        description: data.description ?? null,
        sortOrder: (maxSort._max.sortOrder ?? 0) + 1,
      },
    })
  })

export const updateAward = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: {
      id: string
      title?: string
      organization?: string
      date?: string | Date
      description?: string | null
    }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const award = await prisma.award.findUnique({
      where: { id: data.id },
      include: { cv: true },
    })
    if (!award || award.cv.userId !== session.user.id)
      throw new Error('Not found')
    return prisma.award.update({
      where: { id: data.id },
      data: {
        title: data.title,
        organization: data.organization,
        date: data.date ? (parseDate(data.date) as Date) : undefined,
        description:
          data.description !== undefined
            ? (data.description ?? null)
            : undefined,
      },
    })
  })

export const deleteAward = createServerFn({ method: 'POST' })
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const award = await prisma.award.findUnique({
      where: { id: data },
      include: { cv: true },
    })
    if (!award || award.cv.userId !== session.user.id)
      throw new Error('Not found')
    await prisma.award.delete({ where: { id: data } })
  })

export const reorderAwards = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: { items: { id: string; sortOrder: number }[] }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const firstItem = await prisma.award.findUnique({
      where: { id: data.items[0]?.id },
      include: { cv: true },
    })
    if (!firstItem || firstItem.cv.userId !== session.user.id)
      throw new Error('Not found')
    await Promise.all(
      data.items.map((item) =>
        prisma.award.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    )
  })
