import type { ComponentProps, ReactNode } from 'react'
import { LoaderCircleIcon } from 'lucide-react'

import { Button } from '#/components/atoms/ui/button'

interface LoadingButtonProps extends ComponentProps<typeof Button> {
  isLoading: boolean
  loadingText?: string
  children?: ReactNode
}

function LoadingButton({
  isLoading,
  loadingText = 'Loading',
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={disabled || isLoading} {...props}>
      {isLoading && <LoaderCircleIcon className="size-4 animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  )
}

export { LoadingButton }
export type { LoadingButtonProps }
