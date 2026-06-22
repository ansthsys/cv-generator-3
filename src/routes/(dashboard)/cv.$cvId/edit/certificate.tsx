import { createFileRoute } from '@tanstack/react-router'
import { CertificatePage } from '#/components/pages/cv-edit/CertificatePage'

export const Route = createFileRoute('/(dashboard)/cv/$cvId/edit/certificate')({
  component: CertificatePage,
})
