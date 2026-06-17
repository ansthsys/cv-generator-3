import { createFileRoute } from '@tanstack/react-router'
import { ProjectPage } from '#/components/pages/cv-edit/ProjectPage'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/edit/project')({
  component: ProjectPage,
})
