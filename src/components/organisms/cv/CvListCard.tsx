import { useCvListQuery } from '#/hooks/query/cv'
import { useDeleteCvMutation } from '#/hooks/mutation/cv'
import { Card, CardHeader, CardContent } from '#/components/atoms/ui/card'
import { TypographyH4 } from '#/components/atoms/typography'
import { FilePlusIcon } from 'lucide-react'
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from '#/components/atoms/ui/empty'
import { CvCard } from '#/components/molecules/cv/CvCard'
import { CvCardSkeleton } from '#/components/molecules/skeleton/CvCardSkeleton'
import { CreateCvDialog } from '#/components/organisms/cv/CreateCvDialog'

function CvListCard() {
  const { data: cvs, isPending } = useCvListQuery()
  const deleteCvMutation = useDeleteCvMutation()

  return (
    <Card variant="primary">
      {cvs && cvs.length > 0 && (
        <CardHeader className="flex flex-row items-center justify-between">
          <TypographyH4 className="uppercase tracking-wider">
            My CV
          </TypographyH4>
          <CreateCvDialog />
        </CardHeader>
      )}

      <CardContent
        className={
          cvs && cvs.length > 0 ? 'max-h-125 overflow-y-auto pt-0' : ''
        }
      >
        {isPending ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <CvCardSkeleton key={i} />
            ))}
          </div>
        ) : cvs && cvs.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cvs.map((cv) => (
              <CvCard
                key={cv.id}
                cv={cv}
                onDelete={(id) => deleteCvMutation.mutate(id)}
                isDeleting={deleteCvMutation.isPending}
              />
            ))}
          </div>
        ) : (
          <Empty>
            <EmptyMedia variant="icon">
              <FilePlusIcon />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>No CVs Yet</EmptyTitle>
              <EmptyDescription>
                Start building your professional CV.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <CreateCvDialog />
            </EmptyContent>
          </Empty>
        )}
      </CardContent>
    </Card>
  )
}

export { CvListCard }
