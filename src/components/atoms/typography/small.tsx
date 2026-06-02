import * as React from 'react'

import { cn } from '#/utils/cn'

export function TypographySmall({
  className,
  ...props
}: React.ComponentProps<'small'>) {
  return (
    <small
      className={cn('text-sm font-medium leading-none', className)}
      {...props}
    />
  )
}
