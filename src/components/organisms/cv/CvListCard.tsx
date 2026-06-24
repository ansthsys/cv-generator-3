import { useCvListQuery } from '#/hooks/query/cv'
import { useDeleteCvMutation } from '#/hooks/mutation/cv'
import { Card, CardHeader, CardContent } from '#/components/atoms/ui/card'
import { TypographyH4 } from '#/components/atoms/typography'
import { Skeleton } from '#/components/atoms/ui/skeleton'
import { AlertCircleIcon, FilePlusIcon, RefreshCwIcon } from 'lucide-react'
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from '#/components/atoms/ui/empty'
import { Button } from '#/components/atoms/ui/button'
import { CvCard } from '#/components/molecules/cv/CvCard'
import { CvCardSkeleton } from '#/components/molecules/skeleton/CvCardSkeleton'
import { CreateCvDialog } from '#/components/organisms/cv/CreateCvDialog'

function CvListCard() {
  const { data: cvs, isPending, isError, error, refetch } = useCvListQuery()
  const deleteCvMutation = useDeleteCvMutation()

  return (
    <Card variant="primary">
      <CardHeader className="flex flex-row items-center justify-between">
        {isPending ? (
          <>
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-9 w-28" />
          </>
        ) : (
          <>
            <TypographyH4 className="uppercase tracking-wider">
              My CV
            </TypographyH4>
            <CreateCvDialog />
          </>
        )}
      </CardHeader>

      <CardContent className="max-h-125 overflow-y-auto pt-0">
        {isPending ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <CvCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <Empty>
            <EmptyMedia variant="icon">
              <AlertCircleIcon />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>Failed to Load CVs</EmptyTitle>
              <EmptyDescription>{error.message}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={() => refetch()}>
                <RefreshCwIcon className="size-4" />
                Try Again
              </Button>
            </EmptyContent>
          </Empty>
        ) : cvs.length > 0 ? (
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
