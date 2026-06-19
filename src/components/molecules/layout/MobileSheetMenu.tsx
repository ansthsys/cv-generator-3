import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'

import { Button } from '#/components/atoms/ui/button'
import { MobileUserSection } from '#/components/molecules/layout/MobileUserSection'
import type { UsersType } from '#/generated/zod/schemas/models/Users.schema'
import type {
  NavLinkItem,
  NavSubmenuItem,
} from '#/components/organisms/layout/Navbar'

interface MobileSheetMenuProps {
  items: readonly (NavLinkItem | NavSubmenuItem)[]
  user?: UsersType | null
  handleLogout: () => void
}

function MobileSheetMenu({ items, user, handleLogout }: MobileSheetMenuProps) {
  return (
    <>
      <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pt-4">
        {items.map((item) => {
          if (item.type === 'link') {
            return (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start rounded-none"
                asChild
              >
                <Link to={item.to} activeProps={{ className: 'bg-muted/80' }}>
                  {item.label}
                </Link>
              </Button>
            )
          }

          return (
            <Fragment key={item.label}>
              <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase pt-2 pb-0.5 pl-6">
                {item.label}
              </span>
              {item.items.map((sub) => (
                <Button
                  key={sub.label}
                  variant="ghost"
                  className="w-auto justify-start rounded-none ml-6"
                  asChild
                >
                  <Link to={sub.to} activeProps={{ className: 'bg-muted/80' }}>
                    {sub.label}
                  </Link>
                </Button>
              ))}
            </Fragment>
          )
        })}
      </div>

      <MobileUserSection user={user} handleLogout={handleLogout} />
    </>
  )
}

export { MobileSheetMenu }
