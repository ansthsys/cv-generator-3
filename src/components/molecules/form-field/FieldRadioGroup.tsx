import * as React from 'react'

import { FieldLabel } from '#/components/atoms/ui/field'
import { RadioGroup, RadioGroupItem } from '#/components/atoms/ui/radio-group'

import { Field } from './Field'

interface FieldRadioGroupProps {
  title: string
  description?: string | null
  error?: string | null
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
}

function FieldRadioGroup({
  title,
  description,
  error,
  value,
  onValueChange,
  options,
}: FieldRadioGroupProps) {
  const id = React.useId()

  return (
    <Field title={title} description={description} error={error}>
      <RadioGroup value={value} onValueChange={onValueChange}>
        {options.map((opt, index) => (
          <div key={opt.value} className="flex items-center gap-2">
            <RadioGroupItem
              value={opt.value}
              id={`${id}-${index}`}
              aria-invalid={!!error}
            />
            <FieldLabel htmlFor={`${id}-${index}`} className="font-normal">
              {opt.label}
            </FieldLabel>
          </div>
        ))}
      </RadioGroup>
    </Field>
  )
}

export { FieldRadioGroup }
export type { FieldRadioGroupProps }
