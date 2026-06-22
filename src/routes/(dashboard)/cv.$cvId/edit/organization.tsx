import { createFileRoute } from '@tanstack/react-router'
import { OrganizationPage } from '#/components/pages/cv-edit/OrganizationPage'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/edit/organization')(
  {
    component: OrganizationPage,
  },
)
