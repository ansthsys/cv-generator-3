import { useParams } from '@tanstack/react-router'
import { useEducationsQuery } from '#/hooks/query/cv'
import { SectionPageTemplate } from '#/components/templates'
import { EducationForm } from '#/components/organisms/cv/EducationForm'

function EducationPage() {
  const { cvId } = useParams({ from: '/(dashboard)/cv/$cvId/edit/education' })
  const { data: educations, isPending } = useEducationsQuery(cvId)

  return (
    <SectionPageTemplate
      title="Education"
      FormComponent={EducationForm}
      formProps={{ cvId }}
      items={educations}
      isPending={isPending}
      emptyMessage="No education entries added yet."
      addButtonLabel="Add Education"
    />
  )
}

export { EducationPage }
