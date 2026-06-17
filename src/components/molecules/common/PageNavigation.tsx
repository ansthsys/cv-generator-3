import { useLocation, useNavigate } from '@tanstack/react-router'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '#/components/atoms/ui/button'

const PAGES = [
  { id: 'personal-detail', label: 'Personal Detail' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skill', label: 'Skill' },
  { id: 'project', label: 'Project' },
  { id: 'certificate', label: 'Certificate' },
  { id: 'award', label: 'Award' },
  { id: 'organization', label: 'Organization' },
] as const

function PageNavigation({ cvId }: { cvId: string }) {
  const location = useLocation()
  const navigate = useNavigate()
  const currentId = location.pathname.split('/').pop() || ''
  const current = PAGES.find((p) => p.id === currentId)
  const currentIndex = current ? PAGES.indexOf(current) : -1
  const prev = currentIndex > 0 ? PAGES[currentIndex - 1] : null
  const next = currentIndex < PAGES.length - 1 ? PAGES[currentIndex + 1] : null

  if (!current) return null

  return (
    <div className="flex items-center justify-between border-b pb-3">
      <div className="text-sm text-muted-foreground">
        Step {currentIndex + 1}/{PAGES.length} &mdash; {current.label}
      </div>
      <div className="flex gap-2">
        {prev && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate({ to: `/cv/${cvId}/edit/${prev.id}` })}
          >
            <ChevronLeftIcon className="size-4" />
            {prev.label}
          </Button>
        )}
        {next && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate({ to: `/cv/${cvId}/edit/${next.id}` })}
          >
            {next.label}
            <ChevronRightIcon className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

export { PageNavigation }
