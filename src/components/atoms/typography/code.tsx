import * as React from 'react'

import { cn } from '#/utils'

export function TypographyCode({
  className,
  ...props
}: React.ComponentProps<'code'>) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs',
        className,
      )}
      {...props}
    />
  )
}
