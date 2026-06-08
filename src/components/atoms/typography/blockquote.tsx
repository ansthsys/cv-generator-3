import * as React from 'react'

import { cn } from '#/utils'

export function TypographyBlockquote({
  className,
  ...props
}: React.ComponentProps<'blockquote'>) {
  return (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic text-sm', className)}
      {...props}
    />
  )
}
