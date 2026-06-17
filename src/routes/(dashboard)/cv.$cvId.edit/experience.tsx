import { createFileRoute } from '@tanstack/react-router'
import { ExperiencePage } from '#/components/pages/cv-edit/ExperiencePage'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/edit/experience')({
  component: ExperiencePage,
})
