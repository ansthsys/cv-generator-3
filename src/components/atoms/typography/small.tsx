import * as React from 'react'

import { cn } from '#/utils'

export function TypographySmall({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('text-xs font-medium leading-none', className)}
      {...props}
    />
  )
}
