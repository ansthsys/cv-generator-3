import * as React from 'react'

import { cn } from '#/utils'

export function TypographyH1({
  className,
  ...props
}: React.ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-8xl font-bold font-heading tracking-tight',
        className,
      )}
      {...props}
    />
  )
}
