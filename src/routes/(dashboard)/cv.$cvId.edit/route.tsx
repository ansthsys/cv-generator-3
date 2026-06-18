import { createFileRoute, Outlet } from '@tanstack/react-router'
import { PageNavigation } from '#/components/molecules/common/PageNavigation'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/edit')({
  component: CvEditorLayout,
})

function CvEditorLayout() {
  const { cvId } = Route.useParams()

  return (
    <div className="space-y-6">
      <PageNavigation cvId={cvId} />
      <Outlet />
    </div>
  )
}
