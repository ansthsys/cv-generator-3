import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/edit/')({
  loader: ({ params }) => {
    throw redirect({
      to: '/cv/$cvId/edit/personal-detail',
      params: { cvId: params.cvId },
    })
  },
})
