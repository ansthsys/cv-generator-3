import * as React from 'react'

import { cn } from '#/utils/cn'

export function TypographyH1({
  className,
  ...props
}: React.ComponentProps<'h1'>) {
  return (
    <h1
      className={cn('scroll-m-20 text-4xl font-bold tracking-tight', className)}
      {...props}
    />
  )
}
