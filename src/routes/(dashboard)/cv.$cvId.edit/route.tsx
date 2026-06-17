import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { PageNavigation } from '#/components/molecules/common/PageNavigation'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/edit')({
  component: CvEditorLayout,
  beforeLoad: async ({ context }) => {
    const session = context.session
    if (!session) throw redirect({ to: '/login' })
  },
})

function CvEditorLayout() {
  const { cvId } = Route.useParams()

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <PageNavigation cvId={cvId} />
      <Outlet />
    </div>
  )
}
