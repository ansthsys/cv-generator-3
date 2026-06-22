import { Link } from '@tanstack/react-router'
import { cn } from '#/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#/components/atoms/ui/tooltip'

interface CvSidebarItemProps {
  icon: React.ReactNode
  label: string
  to: string
  params: Record<string, string>
  active: boolean
  collapsed: boolean
}

function CvSidebarItem({
  icon,
  label,
  to,
  params,
  active,
  collapsed,
}: CvSidebarItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={to}
            params={params}
            className={cn(
              'flex items-center py-2 text-sm overflow-hidden transition-all duration-200',
              'hover:bg-muted/50',
              collapsed ? 'justify-center gap-0 px-0' : 'gap-3 px-3 border-l-2',
              collapsed && active && 'bg-muted/80 font-medium text-foreground',
              !collapsed &&
                active &&
                'border-primary bg-muted/80 font-medium text-foreground',
              !collapsed &&
                !active &&
                'border-transparent text-muted-foreground',
            )}
          >
            <span className="shrink-0">{icon}</span>
            <span
              className={cn(
                'overflow-hidden whitespace-nowrap transition-all duration-200',
                collapsed
                  ? 'max-w-0 translate-x-2 opacity-0'
                  : 'max-w-32 translate-x-0 opacity-100',
              )}
            >
              {label}
            </span>
          </Link>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent side="right" className="rounded-none">
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export { CvSidebarItem }
