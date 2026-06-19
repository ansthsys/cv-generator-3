import { Link } from '@tanstack/react-router'

import { Button } from '#/components/atoms/ui/button'
import { UserAvatar } from '#/components/atoms/common/UserAvatar'
import { cn } from '#/utils/index.ts'
import type { UsersType } from '#/generated/zod/schemas/models/Users.schema'

interface MobileUserSectionProps {
  user?: UsersType | null
  handleLogout: () => void
  className?: string
}

function MobileUserSection({
  user,
  handleLogout,
  className,
}: MobileUserSectionProps) {
  return (
    <div
      className={cn(
        'shrink-0 border-t border-primary px-3 pt-4 pb-6',
        className,
      )}
    >
      {user ? (
        <>
          <div className="flex items-center gap-2 mb-4 ml-6">
            <UserAvatar user={user} size="sm" />
          </div>
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              asChild
            >
              <Link to="/" activeProps={{ className: 'bg-muted/80' }}>
                Profile
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
              asChild
            >
              <Link to="/" activeProps={{ className: 'bg-muted/80' }}>
                Settings
              </Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start rounded-none mt-2"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <Link to="/login">
            <Button
              variant="ghost"
              className="w-full justify-start rounded-none"
            >
              Sign in
            </Button>
          </Link>
          <Link to="/register">
            <Button className="w-full justify-start rounded-none">
              Sign up
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export { MobileUserSection }
