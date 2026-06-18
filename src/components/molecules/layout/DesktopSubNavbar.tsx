import { Link } from '@tanstack/react-router'

import { Button } from '#/components/atoms/ui/button'
import { Container } from '#/components/atoms/common/Container'
import { DesktopUserBar } from '#/components/molecules/layout/DesktopUserBar'

interface DesktopSubNavbarProps {
  activeSubmenu: string | null
  submenuItems: ReadonlyArray<{
    readonly label: string
    readonly items: ReadonlyArray<{
      readonly label: string
      readonly description: string
      readonly to: string
    }>
  }>
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  } | null
  handleSubmenuEnter: (key: string) => void
  handleSubmenuLeave: () => void
  handleLogout: () => void
}

function DesktopSubNavbar({
  activeSubmenu,
  submenuItems,
  user,
  handleSubmenuEnter,
  handleSubmenuLeave,
  handleLogout,
}: DesktopSubNavbarProps) {
  return (
    <div
      className={`hidden ${activeSubmenu ? 'md:block border-b border-primary' : ''} absolute top-full left-0 right-0 z-50 bg-background`}
      onMouseEnter={() => activeSubmenu && handleSubmenuEnter(activeSubmenu)}
      onMouseLeave={handleSubmenuLeave}
    >
      <Container className="py-0">
        {submenuItems.map(({ label, items }) => (
          <div
            key={label}
            className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 py-3 items-start ${activeSubmenu === label ? '' : 'hidden'}`}
          >
            {items.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="rounded-none justify-start text-left"
                asChild
              >
                <Link to={item.to} activeProps={{ className: 'bg-muted/80' }}>
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        ))}
        <DesktopUserBar
          activeSubmenu={activeSubmenu}
          user={user}
          handleLogout={handleLogout}
        />
      </Container>
    </div>
  )
}

export { DesktopSubNavbar }
