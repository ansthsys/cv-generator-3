import type { ComponentProps } from 'react'

import { useFormContext } from '#/hooks/useFormContext'
import { LoadingButton } from '#/components/atoms/common/LoadingButton'

function FormSubscribeButton({
  label,
  ...props
}: {
  label?: string
} & Omit<ComponentProps<typeof LoadingButton>, 'isLoading' | 'loadingText'>) {
  const form = useFormContext()

  return (
    <form.Subscribe
      selector={(s) => ({
        isSubmitting: s.isSubmitting,
        canSubmit: s.canSubmit,
      })}
    >
      {({ canSubmit, isSubmitting }) => (
        <LoadingButton
          type="submit"
          isLoading={isSubmitting}
          disabled={props.disabled || !canSubmit}
          {...props}
        >
          {label ?? 'Submit'}
        </LoadingButton>
      )}
    </form.Subscribe>
  )
}

export { FormSubscribeButton }
