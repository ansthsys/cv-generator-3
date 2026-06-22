import { useNavigate } from '@tanstack/react-router'
import {
  EyeIcon,
  PencilIcon,
  Share2Icon,
  SettingsIcon,
  GlobeIcon,
  LockIcon,
  CalendarIcon,
  BarChart3Icon,
  DownloadIcon,
  CheckIcon,
  LoaderCircleIcon,
} from 'lucide-react'

import { useCvQuery } from '#/hooks/query/cv'
import { useUpdateCvMutation } from '#/hooks/mutation/cv'
import { TypographyH2, TypographyMuted } from '#/components/atoms/typography'
import { Button } from '#/components/atoms/ui/button'
import { Card, CardContent } from '#/components/atoms/ui/card'
import { Badge } from '#/components/atoms/ui/badge'
import { Separator } from '#/components/atoms/ui/separator'
import { cn } from '#/utils'

const SECTIONS = [
  'Personal Detail',
  'Experience',
  'Education',
  'Skill',
  'Project',
  'Certificate',
  'Award',
  'Organization',
] as const

interface QuickActionCardProps {
  icon: React.ReactNode
  label: string
  description: string
  onClick?: () => void
  disabled?: boolean
}

function QuickActionCard({
  icon,
  label,
  description,
  onClick,
  disabled,
}: QuickActionCardProps) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={cn(disabled && 'pointer-events-none opacity-50')}
    >
      <Card className="cursor-pointer transition-colors hover:bg-muted/50">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>
          <div>
            <p className="font-medium text-sm">{label}</p>
            <TypographyMuted className="text-xs">{description}</TypographyMuted>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <TypographyMuted className="text-xs">{label}</TypographyMuted>
        </div>
      </CardContent>
    </Card>
  )
}

interface CvOverviewPageProps {
  cvId: string
}

function CvOverviewPage({ cvId }: CvOverviewPageProps) {
  const navigate = useNavigate()
  const { data: cv, isPending } = useCvQuery(cvId)
  const updateCvMutation = useUpdateCvMutation(cvId)

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoaderCircleIcon className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!cv) {
    return (
      <div className="py-20 text-center">
        <TypographyMuted>CV not found</TypographyMuted>
      </div>
    )
  }

  const sectionCount = [
    cv.personalDetail,
    cv.experiences,
    cv.educations,
    cv.skills,
    cv.projects,
    cv.certificates,
    cv.awards,
    cv.organizations,
  ].filter(Boolean).length

  async function handleTogglePublic() {
    if (!cv) return
    await updateCvMutation.mutateAsync({ isPublic: !cv.isPublic })
  }

  async function handleShare() {
    await navigator.clipboard.writeText(window.location.origin + '/cv/' + cvId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <TypographyH2>{cv.name}</TypographyH2>
          <div className="flex items-center gap-2">
            <Badge
              variant={cv.isPublic ? 'default' : 'secondary'}
              className="gap-1"
            >
              {cv.isPublic ? (
                <GlobeIcon className="size-3" />
              ) : (
                <LockIcon className="size-3" />
              )}
              {cv.isPublic ? 'Public' : 'Private'}
            </Badge>
            <TypographyMuted className="text-xs">
              Updated {new Date(cv.updatedAt).toLocaleDateString()}
            </TypographyMuted>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleTogglePublic}
          disabled={updateCvMutation.isPending}
        >
          {updateCvMutation.isPending ? (
            <LoaderCircleIcon className="size-4 animate-spin" />
          ) : cv.isPublic ? (
            <LockIcon className="size-4" />
          ) : (
            <GlobeIcon className="size-4" />
          )}
          Make {cv.isPublic ? 'Private' : 'Public'}
        </Button>
      </div>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<BarChart3Icon className="size-5 text-muted-foreground" />}
          label="Views"
          value={0}
        />
        <StatCard
          icon={<DownloadIcon className="size-5 text-muted-foreground" />}
          label="Downloads"
          value={0}
        />
        <StatCard
          icon={<CalendarIcon className="size-5 text-muted-foreground" />}
          label="Last updated"
          value={new Date(cv.updatedAt).toLocaleDateString()}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <QuickActionCard
          icon={<PencilIcon className="size-5 text-muted-foreground" />}
          label="Edit CV"
          description="Fill in your CV sections"
          onClick={() => navigate({ to: '/cv/$cvId/edit', params: { cvId } })}
        />
        <QuickActionCard
          icon={<SettingsIcon className="size-5 text-muted-foreground" />}
          label="Layout Settings"
          description="Customize PDF layout, font, margins"
          onClick={() =>
            navigate({ to: '/cv/$cvId/settings', params: { cvId } })
          }
        />
        <QuickActionCard
          icon={<EyeIcon className="size-5 text-muted-foreground" />}
          label="View Public"
          description="See your CV as others see it"
          disabled
        />
        <QuickActionCard
          icon={<Share2Icon className="size-5 text-muted-foreground" />}
          label="Share"
          description="Copy link to your CV"
          onClick={handleShare}
        />
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-medium text-sm">Section Progress</span>
            <TypographyMuted className="text-xs">
              {sectionCount}/{SECTIONS.length} completed
            </TypographyMuted>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {SECTIONS.map((section, index) => {
              const completed = sectionCount > index
              return (
                <div key={section} className="flex items-center gap-2 text-sm">
                  <div
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center rounded-full',
                      completed
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {completed ? (
                      <CheckIcon className="size-3" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  {section}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { CvOverviewPage }
