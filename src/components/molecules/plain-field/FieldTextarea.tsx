import * as React from 'react'

import { Textarea } from '#/components/atoms/ui/textarea'

import { Field } from './Field'

interface FieldTextareaProps {
  title: string
  description?: string | null
  error?: string | null
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>
  placeholder?: string
  rows?: number
}

function FieldTextarea({
  title,
  description,
  error,
  ...textareaProps
}: FieldTextareaProps) {
  return (
    <Field title={title} description={description} error={error}>
      <Textarea {...textareaProps} />
    </Field>
  )
}

export { FieldTextarea }
export type { FieldTextareaProps }
