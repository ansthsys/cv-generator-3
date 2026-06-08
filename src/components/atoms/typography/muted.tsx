import * as React from 'react'

import { cn } from '#/utils'

export function TypographyMuted({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
}
