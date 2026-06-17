import { createFileRoute } from '@tanstack/react-router'
import { AwardPage } from '#/components/pages/cv-edit/AwardPage'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/edit/award')({
  component: AwardPage,
})
