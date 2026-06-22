import { createFileRoute } from '@tanstack/react-router'
import { PersonalDetailPage } from '#/components/pages/cv-edit/PersonalDetailPage'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/edit/')({
  component: EditIndex,
})

function EditIndex() {
  return <PersonalDetailPage />
}
