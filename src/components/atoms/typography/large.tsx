import * as React from 'react'

import { cn } from '#/utils'

export function TypographyLarge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <p
      className={cn('text-lg font-semibold font-heading', className)}
      {...props}
    />
  )
}
