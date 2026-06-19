import { Link } from '@tanstack/react-router'

import { Button } from '#/components/atoms/ui/button'
import { UserAvatar } from '#/components/atoms/common/UserAvatar'
import type { UsersType } from '#/generated/zod/schemas/models/Users.schema'

interface DesktopUserBarProps {
  activeSubmenu: string | null
  user?: UsersType | null
  handleLogout: () => void
}

function DesktopUserBar({
  activeSubmenu,
  user,
  handleLogout,
}: DesktopUserBarProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between py-3 ${activeSubmenu === 'user' && user ? '' : 'hidden'}`}
    >
      <div className="flex items-center gap-1">
        <Button variant="ghost" className="rounded-none" asChild>
          <Link to="/" activeProps={{ className: 'bg-muted/80' }}>
            Profile
          </Link>
        </Button>
        <Button variant="ghost" className="rounded-none" asChild>
          <Link to="/" activeProps={{ className: 'bg-muted/80' }}>
            Settings
          </Link>
        </Button>
        <Button variant="ghost" className="rounded-none" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <UserAvatar user={user} />
      </div>
    </div>
  )
}

export { DesktopUserBar }
