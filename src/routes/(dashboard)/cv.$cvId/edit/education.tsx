import { createFileRoute } from '@tanstack/react-router'
import { EducationPage } from '#/components/pages/cv-edit/EducationPage'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/edit/education')({
  component: EducationPage,
})
