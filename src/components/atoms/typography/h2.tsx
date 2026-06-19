import * as React from 'react'

import { cn } from '#/utils'

export function TypographyH2({
  className,
  ...props
}: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-4xl font-semibold font-heading tracking-tight',
        className,
      )}
      {...props}
    />
  )
}
