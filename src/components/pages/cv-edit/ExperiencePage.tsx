import { useParams } from '@tanstack/react-router'
import { useExperiencesQuery } from '#/hooks/query/cv'
import { SectionPageTemplate } from '#/components/templates'
import { ExperienceForm } from '#/components/organisms/cv/ExperienceForm'

function ExperiencePage() {
  const { cvId } = useParams({ from: '/(dashboard)/cv/$cvId/edit/experience' })
  const { data: experiences, isPending } = useExperiencesQuery(cvId)

  return (
    <SectionPageTemplate
      title="Experience"
      FormComponent={ExperienceForm}
      formProps={{ cvId }}
      items={experiences}
      isPending={isPending}
      emptyMessage="No experiences added yet."
      addButtonLabel="Add Experience"
    />
  )
}

export { ExperiencePage }
