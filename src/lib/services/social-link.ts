import * as repo from '#/lib/repository/social-link'

export async function getUserSocialLinks(cvId: string, userId: string) {
  const { findCvById } = await import('#/lib/repository/cv')
  const cv = await findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  return repo.findSocialLinksByCvId(cvId)
}

export async function createUserSocialLink(
  cvId: string,
  userId: string,
  data: {
    label: string
    url: string
  },
) {
  const { findCvById } = await import('#/lib/repository/cv')
  const cv = await findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  const maxSort = await repo.getMaxSocialLinkSortOrder(cvId)
  return repo.insertSocialLink({
    cvId,
    label: data.label,
    url: data.url,
    sortOrder: maxSort + 1,
  })
}

export async function updateUserSocialLink(
  id: string,
  userId: string,
  data: {
    label?: string
    url?: string
  },
) {
  const link = await repo.findSocialLinkById(id)
  if (!link || link.cv.userId !== userId) throw new Error('Not found')
  return repo.updateSocialLinkById(id, {
    label: data.label,
    url: data.url,
  })
}

export async function deleteUserSocialLink(id: string, userId: string) {
  const link = await repo.findSocialLinkById(id)
  if (!link || link.cv.userId !== userId) throw new Error('Not found')
  await repo.deleteSocialLinkById(id)
}

export async function reorderUserSocialLinks(
  items: { id: string; sortOrder: number }[],
  userId: string,
) {
  const firstItem = await repo.findSocialLinkById(items[0]?.id)
  if (!firstItem || firstItem.cv.userId !== userId) throw new Error('Not found')
  await repo.updateSocialLinkSortOrders(items)
}
