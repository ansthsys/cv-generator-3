import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { AppLayout } from '#/components/templates/AppLayout'

export const Route = createFileRoute('/(dashboard)')({
  component: DashboardLayout,
  beforeLoad: async ({ context }) => {
    const session = context.session
    if (!session) throw redirect({ to: '/login' })
  },
})

function DashboardLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
