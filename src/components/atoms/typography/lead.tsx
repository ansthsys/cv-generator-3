import * as React from 'react'

import { cn } from '#/utils'

export function TypographyLead({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-base text-muted-foreground', className)}
      {...props}
    />
  )
}
