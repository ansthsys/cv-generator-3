import { useState } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { cn } from '#/utils'
import {
  ChevronDownIcon,
  EyeIcon,
  PencilIcon,
  SettingsIcon,
  PanelLeftCloseIcon,
  PanelLeftIcon,
} from 'lucide-react'

import { Button } from '#/components/atoms/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/atoms/ui/dropdown-menu'
import { CvSidebarItem } from '#/components/atoms/layout/CvSidebarItem'

const SIDEBAR_ITEMS = [
  {
    icon: <EyeIcon className="size-4" />,
    label: 'Overview',
    to: '/cv/$cvId',
    matchExact: true,
  },
  {
    icon: <PencilIcon className="size-4" />,
    label: 'Edit',
    to: '/cv/$cvId/edit',
    matchExact: false,
  },
  {
    icon: <SettingsIcon className="size-4" />,
    label: 'Settings',
    to: '/cv/$cvId/settings',
    matchExact: true,
  },
] as const

function CvSidebar({ cvId }: { cvId: string }) {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname
  const [collapsed, setCollapsed] = useState(false)

  function isActive(item: (typeof SIDEBAR_ITEMS)[number]): boolean {
    const targetPath = item.to.replace('$cvId', cvId)
    if (item.matchExact) return currentPath === targetPath
    return currentPath.startsWith(targetPath)
  }

  const activeItem = SIDEBAR_ITEMS.find(isActive) ?? SIDEBAR_ITEMS[0]

  return (
    <>
      <nav
        className={`hidden h-full overflow-hidden border-r border-primary transition-all duration-200 md:flex md:flex-col ${
          collapsed ? 'w-14' : 'w-56'
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`flex h-10 items-center border-b border-primary transition-all duration-200 ${collapsed ? 'justify-center' : 'justify-end px-2'}`}
          >
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-none"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <PanelLeftIcon className="size-4" />
              ) : (
                <PanelLeftCloseIcon className="size-4" />
              )}
            </Button>
          </div>

          <div className="flex flex-col gap-px py-2">
            {SIDEBAR_ITEMS.map((item) => (
              <CvSidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                to={item.to}
                params={{ cvId }}
                active={isActive(item)}
                collapsed={collapsed}
              />
            ))}
          </div>
        </div>
      </nav>

      <div className="sticky top-16 z-10 bg-background md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between rounded-none border-b border-primary"
            >
              <span className="flex items-center gap-2">
                {activeItem.icon}
                {activeItem.label}
              </span>
              <ChevronDownIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-none"
          >
            {SIDEBAR_ITEMS.map((item) => {
              const active = isActive(item)
              return (
                <DropdownMenuItem
                  key={item.label}
                  className={cn(
                    'rounded-none',
                    active && 'bg-muted/80 font-medium',
                  )}
                  onClick={() => navigate({ to: item.to, params: { cvId } })}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

export { CvSidebar }
