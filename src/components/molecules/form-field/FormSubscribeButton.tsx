import type { ComponentProps } from 'react'
import { LoaderCircleIcon } from 'lucide-react'

import { useFormContext } from '#/hooks/useFormContext'
import { Button } from '#/components/atoms/ui/button'

function FormSubscribeButton({
  label,
  variant,
  size,
  className,
  disabled,
  ...props
}: {
  label?: string
  variant?: ComponentProps<typeof Button>['variant']
  size?: ComponentProps<typeof Button>['size']
} & Omit<ComponentProps<typeof Button>, 'variant' | 'size'>) {
  const form = useFormContext()

  return (
    <form.Subscribe
      selector={(s) => ({
        isSubmitting: s.isSubmitting,
        canSubmit: s.canSubmit,
      })}
    >
      {({ canSubmit, isSubmitting }) => (
        <Button
          type="submit"
          variant={variant}
          size={size}
          className={className}
          disabled={disabled || !canSubmit || isSubmitting}
          {...props}
        >
          {isSubmitting && <LoaderCircleIcon className="animate-spin" />}
          {isSubmitting ? 'Loading' : (label ?? 'Submit')}
        </Button>
      )}
    </form.Subscribe>
  )
}

export { FormSubscribeButton }
