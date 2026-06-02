import * as React from 'react'

import { Checkbox } from '#/components/atoms/ui/checkbox'
import { FieldLabel } from '#/components/atoms/ui/field'

import { Field } from './Field'

interface FieldCheckboxProps {
  title: string
  description?: string | null
  error?: string | null
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  options: { value: string; label: string }[]
}

function FieldCheckbox({
  title,
  description,
  error,
  checked,
  onCheckedChange,
  options,
}: FieldCheckboxProps) {
  const id = React.useId()

  return (
    <Field title={title} description={description} error={error}>
      <div className="flex flex-col gap-3">
        {options.map((opt, index) => (
          <div key={opt.value} className="flex items-center gap-2">
            <Checkbox
              id={`${id}-${index}`}
              checked={checked}
              onCheckedChange={(val) => {
                if (typeof val === 'boolean') onCheckedChange(val)
              }}
              aria-invalid={!!error}
            />
            <FieldLabel htmlFor={`${id}-${index}`} className="font-normal">
              {opt.label}
            </FieldLabel>
          </div>
        ))}
      </div>
    </Field>
  )
}

export { FieldCheckbox }
export type { FieldCheckboxProps }
