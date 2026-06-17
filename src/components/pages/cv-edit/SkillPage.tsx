import { useParams } from '@tanstack/react-router'
import { useSkillsQuery } from '#/hooks/query/cv'
import { SectionPageTemplate } from '#/components/templates'
import { SkillForm } from '#/components/organisms/cv/SkillForm'

function SkillPage() {
  const { cvId } = useParams({ from: '/(dashboard)/cv/$cvId/edit/skill' })
  const { data: skills, isPending } = useSkillsQuery(cvId)

  return (
    <SectionPageTemplate
      title="Skill"
      FormComponent={SkillForm}
      formProps={{ cvId }}
      items={skills}
      isPending={isPending}
      emptyMessage="No skills added yet."
      addButtonLabel="Add Skill"
    />
  )
}

export { SkillPage }
