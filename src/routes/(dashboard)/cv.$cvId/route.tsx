import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CvSidebar } from '#/components/molecules/layout/CvSidebar'

export const Route = createFileRoute('/(dashboard)/cv/$cvId')({
  component: CvDetailLayout,
})

function CvDetailLayout() {
  const { cvId } = Route.useParams()

  return (
    <div className="-mx-4 -my-6 flex flex-1">
      <div className="flex-1 flex flex-col md:flex-row">
        <CvSidebar cvId={cvId} />

        <div className="flex flex-1 flex-col p-4 py-6 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
