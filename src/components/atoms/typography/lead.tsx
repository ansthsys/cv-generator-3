import * as React from 'react'

import { cn } from '#/utils/cn'

export function TypographyLead({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-lead text-muted-foreground', className)}
      {...props}
    />
  )
}
