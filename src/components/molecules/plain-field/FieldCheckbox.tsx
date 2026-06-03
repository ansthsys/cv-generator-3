import * as React from 'react'

import { Checkbox } from '#/components/atoms/ui/checkbox'
import { FieldLabel } from '#/components/atoms/ui/field'

import { Field } from './Field'

interface FieldCheckboxProps {
  title: string
  description?: string | null
  error?: string | null
  checkedValues: string[]
  onCheckedChange: (value: string, checked: boolean) => void
  options: { value: string; label: string }[]
  orientation?: 'vertical' | 'horizontal'
  renderOption?: (props: {
    option: { value: string; label: string }
    checked: boolean
    id: string
    onChange: (checked: boolean) => void
  }) => React.ReactNode
}

function FieldCheckbox({
  title,
  description,
  error,
  checkedValues,
  onCheckedChange,
  options,
  orientation = 'vertical',
  renderOption,
}: FieldCheckboxProps) {
  const id = React.useId()

  return (
    <Field title={title} description={description} error={error}>
      <div
        className={
          orientation === 'horizontal'
            ? 'flex flex-row flex-wrap gap-x-6 gap-y-3'
            : 'flex flex-col gap-3'
        }
      >
        {options.map((opt, index) => {
          const checked = checkedValues.includes(opt.value)
          const optionId = `${id}-${index}`
          const onChange = (val: boolean) => {
            onCheckedChange(opt.value, val)
          }

          if (renderOption) {
            return renderOption({
              option: opt,
              checked,
              id: optionId,
              onChange,
            })
          }

          return (
            <div key={opt.value} className="flex items-center gap-2">
              <Checkbox
                id={optionId}
                checked={checked}
                onCheckedChange={(val) => {
                  if (typeof val === 'boolean') onChange(val)
                }}
                aria-invalid={!!error}
              />
              <FieldLabel htmlFor={optionId} className="font-normal">
                {opt.label}
              </FieldLabel>
            </div>
          )
        })}
      </div>
    </Field>
  )
}

export { FieldCheckbox }
export type { FieldCheckboxProps }
