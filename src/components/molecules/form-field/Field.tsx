import * as React from 'react'

import {
  FieldLabel,
  FieldDescription,
  FieldError,
} from '#/components/atoms/ui/field'

interface FieldProps {
  title: string
  description?: string | null
  error?: string | null
  children: React.ReactElement
}

function Field({ title, description, error, children }: FieldProps) {
  const id = React.useId()

  const child = React.cloneElement(children, {
    id,
    'aria-invalid': !!error || undefined,
    'aria-describedby': error
      ? `${id}-error`
      : description
        ? `${id}-desc`
        : undefined,
  } as Record<string, unknown>)

  return (
    <div
      data-slot="field"
      data-invalid={!!error}
      role="group"
      className="flex flex-col gap-2"
    >
      <FieldLabel htmlFor={id}>{title}</FieldLabel>
      {description && (
        <FieldDescription id={`${id}-desc`}>{description}</FieldDescription>
      )}
      {child}
      {error && <FieldError id={`${id}-error`} errors={[{ message: error }]} />}
    </div>
  )
}

export { Field }
export type { FieldProps }
