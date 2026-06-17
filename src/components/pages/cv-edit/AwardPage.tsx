import { useParams } from '@tanstack/react-router'
import { useAwardsQuery } from '#/hooks/query/cv'
import { SectionPageTemplate } from '#/components/templates'
import { AwardForm } from '#/components/organisms/cv/AwardForm'

function AwardPage() {
  const { cvId } = useParams({ from: '/(dashboard)/cv/$cvId/edit/award' })
  const { data: awards, isPending } = useAwardsQuery(cvId)

  return (
    <SectionPageTemplate
      title="Award"
      FormComponent={AwardForm}
      formProps={{ cvId }}
      items={awards}
      isPending={isPending}
      emptyMessage="No awards added yet."
      addButtonLabel="Add Award"
    />
  )
}

export { AwardPage }
