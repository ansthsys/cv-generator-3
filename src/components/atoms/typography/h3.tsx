import * as React from 'react'

import { cn } from '#/utils/cn'

export function TypographyH3({
  className,
  ...props
}: React.ComponentProps<'h3'>) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-4xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  )
}
