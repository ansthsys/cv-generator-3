import { createServerFn } from '@tanstack/react-start'
import { ensureSession } from '#/lib/better-auth/auth.function'
import { prisma } from '#/db'

export const listSocialLinks = createServerFn({ method: 'GET' })
  .inputValidator((cvId: string) => cvId)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const cv = await prisma.cv.findFirst({
      where: { id: data, userId: session.user.id },
    })
    if (!cv) throw new Error('CV not found')
    return prisma.socialLink.findMany({
      where: { cvId: data },
      orderBy: { sortOrder: 'asc' },
    })
  })

export const createSocialLink = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: { cvId: string; label: string; url: string }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const cv = await prisma.cv.findFirst({
      where: { id: data.cvId, userId: session.user.id },
    })
    if (!cv) throw new Error('CV not found')
    const maxSort = await prisma.socialLink.aggregate({
      where: { cvId: data.cvId },
      _max: { sortOrder: true },
    })
    return prisma.socialLink.create({
      data: {
        cvId: data.cvId,
        label: data.label,
        url: data.url,
        sortOrder: (maxSort._max.sortOrder ?? 0) + 1,
      },
    })
  })

export const updateSocialLink = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: { id: string; label?: string; url?: string }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const link = await prisma.socialLink.findUnique({
      where: { id: data.id },
      include: { cv: true },
    })
    if (!link || link.cv.userId !== session.user.id)
      throw new Error('Not found')
    return prisma.socialLink.update({
      where: { id: data.id },
      data: {
        label: data.label,
        url: data.url,
      },
    })
  })

export const deleteSocialLink = createServerFn({ method: 'POST' })
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const link = await prisma.socialLink.findUnique({
      where: { id: data },
      include: { cv: true },
    })
    if (!link || link.cv.userId !== session.user.id)
      throw new Error('Not found')
    await prisma.socialLink.delete({ where: { id: data } })
  })

export const reorderSocialLinks = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: { items: { id: string; sortOrder: number }[] }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const firstItem = await prisma.socialLink.findUnique({
      where: { id: data.items[0]?.id },
      include: { cv: true },
    })
    if (!firstItem || firstItem.cv.userId !== session.user.id)
      throw new Error('Not found')
    await Promise.all(
      data.items.map((item) =>
        prisma.socialLink.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        }),
      ),
    )
  })
