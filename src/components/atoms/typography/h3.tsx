import * as React from 'react'

import { cn } from '#/utils'

export function TypographyH3({
  className,
  ...props
}: React.ComponentProps<'h3'>) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold font-heading tracking-tight',
        className,
      )}
      {...props}
    />
  )
}
