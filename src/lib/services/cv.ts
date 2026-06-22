import * as repo from '#/lib/repository/cv'

export async function getUserCvs(userId: string) {
  return repo.findCvsByUserId(userId)
}

export async function getUserCv(cvId: string, userId: string) {
  const cv = await repo.findCvWithRelations(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  return cv
}

export async function createUserCv(name: string, userId: string) {
  return repo.insertCv({ userId, name, isPublic: false })
}

export async function updateUserCv(
  cvId: string,
  userId: string,
  data: { name?: string; isPublic?: boolean; config?: unknown },
) {
  const cv = await repo.findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  return repo.updateCvById(cvId, data)
}

export async function deleteUserCv(cvId: string, userId: string) {
  const cv = await repo.findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  await repo.deleteCvById(cvId)
}

export async function getUserPersonalDetail(cvId: string, userId: string) {
  const cv = await repo.findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  return repo.findPersonalDetailByCvId(cvId)
}

export async function upsertUserPersonalDetail(
  cvId: string,
  userId: string,
  data: {
    fullName: string
    phone: string
    email: string
    photoUrl?: string | null
    city?: string | null
    summary?: string | null
  },
) {
  const cv = await repo.findCvById(cvId)
  if (!cv || cv.userId !== userId) throw new Error('CV not found')
  return repo.upsertPersonalDetail(cvId, data)
}
