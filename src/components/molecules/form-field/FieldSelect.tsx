import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/atoms/ui/select'

import { Field } from './Field'

interface FieldSelectProps {
  title: string
  description?: string | null
  error?: string | null
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  options: { value: string; label: string }[]
}

function FieldSelect({
  title,
  description,
  error,
  value,
  onValueChange,
  placeholder,
  options,
}: FieldSelectProps) {
  return (
    <Field title={title} description={description} error={error}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger aria-invalid={!!error}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )
}

export { FieldSelect }
export type { FieldSelectProps }
