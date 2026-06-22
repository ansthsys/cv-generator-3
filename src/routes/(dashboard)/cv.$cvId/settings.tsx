import { createFileRoute } from '@tanstack/react-router'
import { CvSettingsPage } from '#/components/pages/cv/CvSettingsPage'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/settings')({
  component: CvSettings,
})

function CvSettings() {
  const { cvId } = Route.useParams()
  return <CvSettingsPage cvId={cvId} />
}
