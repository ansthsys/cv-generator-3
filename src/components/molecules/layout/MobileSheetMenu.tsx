import { Link } from '@tanstack/react-router'

import { Button } from '#/components/atoms/ui/button'
import { ScrollArea } from '#/components/atoms/ui/scroll-area'
import { MobileUserSection } from '#/components/molecules/layout/MobileUserSection'

interface MobileSheetMenuProps {
  adminItems: ReadonlyArray<{
    readonly label: string
    readonly description: string
    readonly to: string
  }>
  menu2Items: ReadonlyArray<{
    readonly label: string
    readonly description: string
    readonly to: string
  }>
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  } | null
  handleLogout: () => void
}

function MobileSheetMenu({
  adminItems,
  menu2Items,
  user,
  handleLogout,
}: MobileSheetMenuProps) {
  return (
    <>
      <ScrollArea className="flex-1 px-3 pt-4">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            className="w-full justify-start rounded-none"
            asChild
          >
            <Link to="/dashboard" activeProps={{ className: 'bg-muted/80' }}>
              Dashboard
            </Link>
          </Button>
          <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase pt-2 pb-0.5 pl-6">
            Admin
          </span>
          {adminItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-auto justify-start rounded-none ml-6"
              asChild
            >
              <Link to={item.to} activeProps={{ className: 'bg-muted/80' }}>
                {item.label}
              </Link>
            </Button>
          ))}
          <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase pt-2 pb-0.5 pl-6">
            Menu 2
          </span>
          {menu2Items.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-auto justify-start rounded-none ml-6"
              asChild
            >
              <Link to={item.to} activeProps={{ className: 'bg-muted/80' }}>
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <MobileUserSection user={user} handleLogout={handleLogout} />
    </>
  )
}

export { MobileSheetMenu }
