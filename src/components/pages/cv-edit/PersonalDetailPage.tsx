import { useParams } from '@tanstack/react-router'
import { usePersonalDetailQuery } from '#/hooks/query/cv'
import { SectionPageTemplate } from '#/components/templates'
import { PersonalDetailSection } from '#/components/organisms/cv/PersonalDetailSection'
import { SocialLinkSection } from '#/components/organisms/cv/SocialLinkSection'
import { Separator } from '#/components/atoms/ui/separator'

function PersonalDetailPage() {
  const { cvId } = useParams({
    from: '/(dashboard)/cv/$cvId/edit/personal-detail',
  })
  const { isPending } = usePersonalDetailQuery(cvId)

  return (
    <SectionPageTemplate
      title="Personal Detail"
      isPending={isPending}
      itemSkeleton={
        <div className="animate-pulse space-y-3 rounded border p-3">
          <div className="h-4 w-1/3 rounded bg-muted" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="h-10 rounded bg-muted" />
            ))}
          </div>
          <div className="h-24 rounded bg-muted" />
          <div className="h-10 w-20 rounded bg-muted" />
        </div>
      }
    >
      <PersonalDetailSection cvId={cvId} />
      <Separator className="my-6" />
      <SocialLinkSection cvId={cvId} />
    </SectionPageTemplate>
  )
}

export { PersonalDetailPage }
