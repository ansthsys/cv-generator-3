import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { MoreVerticalIcon, ImageOffIcon, ChevronRightIcon } from 'lucide-react'
import { Tooltip } from '#/components/molecules/common/Tooltip'
import { TypographyMuted, TypographyP } from '#/components/atoms/typography'
import { Button } from '#/components/atoms/ui/button'
import { Card, CardContent } from '#/components/atoms/ui/card'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '#/components/atoms/ui/dropdown-menu'
import { ConfirmDialog } from '#/components/molecules/common/ConfirmDialog'

interface CvCardProps {
  cv: { id: string; name: string; updatedAt: Date }
  onDelete: (id: string) => void
  isDeleting: boolean
  image?: string | null
}

function CvCard({ cv, onDelete, isDeleting, image }: CvCardProps) {
  const [erroredSrc, setErroredSrc] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <Card variant="primary" size="sm">
      <div className="-mt-(--card-spacing) aspect-3/4 max-h-96 overflow-hidden bg-muted">
        {image && erroredSrc !== image ? (
          <img
            src={image}
            alt={cv.name}
            className="size-full object-cover"
            onError={() => setErroredSrc(image)}
          />
        ) : (
          <button
            type="button"
            onClick={() => setErroredSrc(null)}
            className="flex size-full cursor-pointer items-center justify-center"
          >
            <ImageOffIcon className="size-8 text-muted-foreground/40" />
          </button>
        )}
      </div>

      <CardContent>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Tooltip tip={cv.name}>
              <TypographyP className="truncate">{cv.name}</TypographyP>
            </Tooltip>
            <TypographyMuted className="truncate text-sm">
              Updated {new Date(cv.updatedAt).toLocaleDateString()}
            </TypographyMuted>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Link to="/cv/$cvId/edit" params={{ cvId: cv.id }}>
              <Button variant="outline" size="icon" className="-mt-0.5">
                <ChevronRightIcon className="size-4" />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 -mr-1.5 -mt-0.5"
                >
                  <MoreVerticalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/cv/$cvId/edit" params={{ cvId: cv.id }}>
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  disabled={isDeleting}
                  onClick={() => setDeleteOpen(true)}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete CV"
        description={`Are you sure you want to delete "${cv.name}"? This action cannot be undone.`}
        onConfirm={() => onDelete(cv.id)}
        isLoading={isDeleting}
        isDisabled={isDeleting}
      />
    </Card>
  )
}

export { CvCard }
