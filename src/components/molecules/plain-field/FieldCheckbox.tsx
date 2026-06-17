import * as React from 'react'

import { Checkbox } from '#/components/atoms/ui/checkbox'
import { FieldLabel } from '#/components/atoms/ui/field'

import { Field } from './Field'

interface FieldCheckboxProps {
  title: string
  description?: string | null
  error?: string | null
  value: boolean | string[]
  onChange: (value: boolean | string[]) => void
  disabled?: boolean
  options?: { value: string; label: string }[]
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
  value,
  onChange,
  disabled,
  options = [],
  orientation = 'vertical',
  renderOption,
}: FieldCheckboxProps) {
  const id = React.useId()

  if (typeof value === 'boolean') {
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          id={id}
          checked={value}
          disabled={disabled}
          onCheckedChange={(val) => {
            if (typeof val === 'boolean') onChange(val)
          }}
          aria-invalid={!!error}
        />
        <FieldLabel htmlFor={id} className="font-normal">
          {title}
        </FieldLabel>
      </div>
    )
  }

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
          const checked = value.includes(opt.value)
          const optionId = `${id}-${index}`
          const handleChange = (val: boolean) => {
            const next = val
              ? [...value, opt.value]
              : value.filter((v) => v !== opt.value)
            onChange(next)
          }

          if (renderOption) {
            return renderOption({
              option: opt,
              checked,
              id: optionId,
              onChange: handleChange,
            })
          }

          return (
            <div key={opt.value} className="flex items-center gap-2">
              <Checkbox
                id={optionId}
                checked={checked}
                onCheckedChange={(val) => {
                  if (typeof val === 'boolean') handleChange(val)
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
