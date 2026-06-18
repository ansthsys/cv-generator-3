import type { ReactNode } from 'react'
import { cn } from '#/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
}

function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-5xl xl:max-w-7xl px-4 border-x border-primary',
        className,
      )}
    >
      {children}
    </div>
  )
}

export { Container }
