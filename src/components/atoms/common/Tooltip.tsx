import type { ReactNode } from 'react'
import {
  TooltipProvider,
  Tooltip as TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '#/components/atoms/ui/tooltip'

interface TooltipProps {
  tip: string
  children: ReactNode
}

function Tooltip({ tip, children }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tip}</p>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}

export { Tooltip }
