import * as React from 'react'

import { Input } from '#/components/atoms/ui/input'

import { Field } from './Field'

interface FieldInputProps {
  title: string
  description?: string | null
  error?: string | null
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  disabled?: boolean
  placeholder?: string
  type?: string
}

function FieldInput({
  title,
  description,
  error,
  ...inputProps
}: FieldInputProps) {
  return (
    <Field title={title} description={description} error={error}>
      <Input {...inputProps} />
    </Field>
  )
}

export { FieldInput }
export type { FieldInputProps }
