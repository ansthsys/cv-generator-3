import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '#/components/atoms/ui/avatar'
import { cn } from '#/utils'

interface UserAvatarProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  } | null
  size?: 'sm' | 'default'
  details?: boolean
  className?: string
}

function UserAvatar({
  user,
  size = 'default',
  details = true,
  className,
}: UserAvatarProps) {
  if (!user) return null

  const avatar = (
    <Avatar
      size={size}
      className={cn('rounded-none after:rounded-none', className)}
    >
      {user.image ? (
        <AvatarImage
          src={user.image}
          alt={user.name ?? ''}
          className="rounded-none"
        />
      ) : (
        <AvatarFallback className="rounded-none">
          {(user.name ?? user.email ?? '?')[0]}
        </AvatarFallback>
      )}
    </Avatar>
  )

  if (!details) return avatar

  return (
    <>
      {avatar}
      <div className="flex flex-col">
        <span className="font-medium capitalize tracking-wider text-sm">
          {user.name ?? 'User'}
        </span>
        <span className="text-xs text-muted-foreground font-normal normal-case">
          {user.email}
        </span>
      </div>
    </>
  )
}

export { UserAvatar }
