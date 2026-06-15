import { createServerFn } from '@tanstack/react-start'
import { ensureSession } from '#/lib/better-auth/auth.function'
import {
  getUserProjects,
  createUserProject,
  updateUserProject,
  deleteUserProject,
  reorderUserProject,
} from '#/lib/services/project'
import type { ProjectInput } from '#/lib/services/project'

export const listProjects = createServerFn({ method: 'GET' })
  .inputValidator((cvId: string) => cvId)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return getUserProjects(data, session.user.id)
  })

export const createProject = createServerFn({ method: 'POST' })
  .inputValidator((input: { cvId: string } & ProjectInput) => input)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return createUserProject(data.cvId, session.user.id, data)
  })

export const updateProject = createServerFn({ method: 'POST' })
  .inputValidator((input: { id: string } & Partial<ProjectInput>) => input)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return updateUserProject(data.id, session.user.id, data)
  })

export const deleteProject = createServerFn({ method: 'POST' })
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return deleteUserProject(data, session.user.id)
  })

export const reorderProjects = createServerFn({ method: 'POST' })
  .inputValidator(
    (input: { items: { id: string; sortOrder: number }[] }) => input,
  )
  .handler(async ({ data }) => {
    const session = await ensureSession()
    return reorderUserProject(data.items, session.user.id)
  })
