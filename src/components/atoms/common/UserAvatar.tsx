import type { UsersType } from '#/generated/zod/schemas/models/Users.schema'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '#/components/atoms/ui/avatar'
import { cn } from '#/utils'

interface UserAvatarProps {
  user?: UsersType | null
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
          alt={user.name}
          className="rounded-none"
        />
      ) : (
        <AvatarFallback className="rounded-none">{user.name[0]}</AvatarFallback>
      )}
    </Avatar>
  )

  if (!details) return avatar

  return (
    <>
      {avatar}
      <div className="flex flex-col">
        <span className="font-medium capitalize tracking-wider text-sm">
          {user.name}
        </span>
        <span className="text-xs text-muted-foreground font-normal normal-case">
          {user.email}
        </span>
      </div>
    </>
  )
}

export { UserAvatar }
