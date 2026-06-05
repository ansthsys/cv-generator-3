import * as React from 'react'

import { cn } from '#/utils/cn'

export function TypographyP({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return <p className={cn('text-sm leading-7', className)} {...props} />
}
