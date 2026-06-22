import { createFileRoute } from '@tanstack/react-router'
import { CvOverviewPage } from '#/components/pages/cv/CvOverviewPage'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/')({
  component: CvOverview,
})

function CvOverview() {
  const { cvId } = Route.useParams()
  return <CvOverviewPage cvId={cvId} />
}
