import { useParams } from '@tanstack/react-router'
import { useOrganizationsQuery } from '#/hooks/query/cv'
import { SectionPageTemplate } from '#/components/templates'
import { OrganizationForm } from '#/components/organisms/cv/OrganizationForm'

function OrganizationPage() {
  const { cvId } = useParams({
    from: '/(dashboard)/cv/$cvId/edit/organization',
  })
  const { data: organizations, isPending } = useOrganizationsQuery(cvId)

  return (
    <SectionPageTemplate
      title="Organization"
      FormComponent={OrganizationForm}
      formProps={{ cvId }}
      items={organizations}
      isPending={isPending}
      emptyMessage="No organizations added yet."
      addButtonLabel="Add Organization"
    />
  )
}

export { OrganizationPage }
