import { useParams } from '@tanstack/react-router'
import { useCertificatesQuery } from '#/hooks/query/cv'
import { SectionPageTemplate } from '#/components/templates'
import { CertificateForm } from '#/components/organisms/cv/CertificateForm'

function CertificatePage() {
  const { cvId } = useParams({ from: '/(dashboard)/cv/$cvId/edit/certificate' })
  const { data: certificates, isPending } = useCertificatesQuery(cvId)

  return (
    <SectionPageTemplate
      title="Certificate"
      FormComponent={CertificateForm}
      formProps={{ cvId }}
      items={certificates}
      isPending={isPending}
      emptyMessage="No certificates added yet."
      addButtonLabel="Add Certificate"
    />
  )
}

export { CertificatePage }
