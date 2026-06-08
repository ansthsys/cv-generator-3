import * as React from 'react'

import { cn } from '#/utils'

export function TypographyLarge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('text-lead font-semibold font-heading', className)}
      {...props}
    />
  )
}
