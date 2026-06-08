import * as React from 'react'

import { cn } from '#/utils'

export function TypographyUl({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
      {...props}
    />
  )
}

export function TypographyOl({
  className,
  ...props
}: React.ComponentProps<'ol'>) {
  return (
    <ol
      className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)}
      {...props}
    />
  )
}

export function TypographyLi({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return <li className={cn('', className)} {...props} />
}
