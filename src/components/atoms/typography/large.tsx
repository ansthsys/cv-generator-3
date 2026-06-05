import * as React from 'react'

import { cn } from '#/utils/cn'

export function TypographyLarge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn('text-lead font-semibold', className)} {...props} />
}
