import * as React from 'react'

import { cn } from '#/utils/cn'

export function TypographyH2({
  className,
  ...props
}: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-6xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  )
}
