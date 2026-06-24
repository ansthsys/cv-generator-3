import { Skeleton } from '#/components/atoms/ui/skeleton'
import { Card, CardContent } from '#/components/atoms/ui/card'

function CvCardSkeleton() {
  return (
    <Card variant="primary" size="sm">
      <Skeleton className="-mt-(--card-spacing) aspect-3/4 max-h-96 overflow-hidden" />
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </CardContent>
    </Card>
  )
}

export { CvCardSkeleton }
