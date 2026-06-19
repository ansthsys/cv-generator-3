import { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react'
import { cn } from '#/utils'

import { useSessionQuery } from '#/hooks/query/auth'
import { useSignOutMutation } from '#/hooks/mutation/auth'
import { Button } from '#/components/atoms/ui/button'
import { navigationMenuTriggerStyle } from '#/components/atoms/ui/navigation-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '#/components/atoms/ui/sheet'
import { Container } from '#/components/atoms/common/Container'
import { UserAvatar } from '#/components/atoms/common/UserAvatar'
import type { UsersType } from '#/generated/zod/schemas/models/Users.schema'
import { MobileSheetMenu } from '#/components/molecules/layout/MobileSheetMenu'
import { DesktopSubNavbar } from '#/components/molecules/layout/DesktopSubNavbar'

export interface NavGuardContext {
  user: UsersType | null
}

export type NavGuardItem = boolean | ((ctx: NavGuardContext) => boolean)
export type NavGuard = NavGuardItem | NavGuardItem[]

export function evaluateGuard(
  guard: NavGuard | undefined,
  ctx: NavGuardContext,
): boolean {
  if (guard === undefined || guard === true) return true
  if (guard === false) return false
  if (Array.isArray(guard)) return guard.every((g) => evaluateGuard(g, ctx))
  if (typeof guard === 'function') return guard(ctx)
  return true
}

export type NavLinkItem = {
  type: 'link'
  label: string
  to: string
  guard?: NavGuard
}

export type NavSubItem = {
  label: string
  description: string
  to: string
  guard?: NavGuard
}

export type NavSubmenuItem = {
  type: 'submenu'
  label: string
  guard?: NavGuard
  items: readonly NavSubItem[]
}

const headerItems: readonly (NavLinkItem | NavSubmenuItem)[] = [
  {
    type: 'link',
    label: 'Dashboard',
    to: '/dashboard',
  },
  {
    type: 'submenu',
    label: 'Admin',
    items: [
      { label: 'Users', description: 'Manage users', to: '/' },
      { label: 'Settings', description: 'App settings', to: '/' },
      { label: 'Analytics', description: 'Dashboard data', to: '/' },
      { label: 'Logs', description: 'Activity logs', to: '/' },
    ],
  },
  {
    type: 'submenu',
    label: 'Menu 2',
    items: [
      { label: 'Item A', description: 'Dummy A', to: '/' },
      { label: 'Item B', description: 'Dummy B', to: '/' },
      { label: 'Item C', description: 'Dummy C', to: '/' },
    ],
  },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const { data: session } = useSessionQuery()
  const signOutMutation = useSignOutMutation()
  const user = session?.user ?? null
  const [open, setOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [clickedSubmenu, setClickedSubmenu] = useState<string | null>(null)
  const submenuTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )

  function handleSubmenuEnter(key: string) {
    clearTimeout(submenuTimer.current)
    setActiveSubmenu(key)
    setClickedSubmenu((prev) => (prev !== null ? key : null))
  }

  function handleSubmenuLeave() {
    clearTimeout(submenuTimer.current)
    submenuTimer.current = setTimeout(
      () => setActiveSubmenu(clickedSubmenu),
      300,
    )
  }

  function handleSubmenuClick(key: string) {
    setClickedSubmenu((prev) => {
      if (prev === key) {
        setActiveSubmenu(null)
        return null
      }
      setActiveSubmenu(key)
      return key
    })
  }

  function hasActiveChild(
    items: ReadonlyArray<{ readonly to: string }>,
    path: string,
  ): boolean {
    return items.some((item) => {
      if (item.to === '/') return path === '/'
      return path === item.to || path.startsWith(item.to + '/')
    })
  }

  async function handleLogout() {
    await signOutMutation.mutateAsync()
    navigate({ to: '/login' })
  }

  const visibleItems = headerItems.filter((item) => {
    if (item.type === 'link') return evaluateGuard(item.guard, { user })
    return item.items.some((child) => evaluateGuard(child.guard, { user }))
  })

  const filteredSubmenuItems = visibleItems
    .filter((i): i is NavSubmenuItem => i.type === 'submenu')
    .map((submenu) => ({
      ...submenu,
      items: submenu.items.filter((item) =>
        evaluateGuard(item.guard, { user }),
      ),
    }))

  return (
    <div className="sticky top-0 z-40">
      <header className="border-b border-primary bg-background">
        <Container className="flex h-16 items-center justify-between py-0">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-sm font-semibold uppercase tracking-wider no-underline"
            >
              CV Generator
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex md:items-center md:gap-2">
              {visibleItems.map((item) => {
                if (item.type === 'link') {
                  return (
                    <Button
                      key={item.label}
                      variant="ghost"
                      className="rounded-none"
                      asChild
                    >
                      <Link
                        to={item.to}
                        activeProps={{ className: 'bg-muted/80' }}
                      >
                        {item.label}
                      </Link>
                    </Button>
                  )
                }
                const isTriggerActive =
                  activeSubmenu === item.label ||
                  hasActiveChild(item.items, currentPath)
                return (
                  <button
                    key={item.label}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'h-10',
                      isTriggerActive && 'data-open:bg-muted/80',
                    )}
                    data-open={isTriggerActive ? true : undefined}
                    onClick={() => handleSubmenuClick(item.label)}
                    onMouseEnter={() => handleSubmenuEnter(item.label)}
                    onMouseLeave={handleSubmenuLeave}
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`relative top-px ml-1 size-3 transition-transform duration-300 ${activeSubmenu === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                )
              })}
              {user ? (
                <button
                  className={cn(
                    'flex items-center justify-center rounded-none hover:bg-muted',
                    activeSubmenu === 'user' && 'bg-muted/80',
                  )}
                  onClick={() => handleSubmenuClick('user')}
                  onMouseEnter={() => handleSubmenuEnter('user')}
                  onMouseLeave={handleSubmenuLeave}
                >
                  <UserAvatar user={user} size="sm" details={false} />
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="rounded-none">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="rounded-none">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-none"
                  >
                    {open ? (
                      <XIcon className="size-5" />
                    ) : (
                      <MenuIcon className="size-5" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  showCloseButton={false}
                  aria-describedby={undefined}
                  className="border-l-0 flex flex-col p-0"
                >
                  <SheetHeader className="flex h-16 shrink-0 flex-row items-center justify-between border-b border-primary px-4 py-0">
                    <SheetTitle>CV Generator</SheetTitle>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="rounded-none"
                      >
                        <XIcon className="size-5" />
                      </Button>
                    </SheetClose>
                  </SheetHeader>
                  <MobileSheetMenu
                    items={visibleItems}
                    user={user}
                    handleLogout={handleLogout}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </Container>
      </header>
      <DesktopSubNavbar
        activeSubmenu={activeSubmenu}
        submenuItems={filteredSubmenuItems}
        user={user}
        handleSubmenuEnter={handleSubmenuEnter}
        handleSubmenuLeave={handleSubmenuLeave}
        handleLogout={handleLogout}
      />
    </div>
  )
}

export { Navbar }
