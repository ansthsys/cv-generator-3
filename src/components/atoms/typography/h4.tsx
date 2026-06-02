import * as React from 'react'

import { cn } from '#/utils/cn'

export function TypographyH4({
  className,
  ...props
}: React.ComponentProps<'h4'>) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  )
}
