import * as React from 'react'

import { cn } from '#/utils/cn'

export function TypographyLarge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn('text-lg font-semibold', className)} {...props} />
}
