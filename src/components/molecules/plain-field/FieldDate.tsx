import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { inputClasses } from '#/components/atoms/ui/input'
import { Calendar } from '#/components/atoms/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/atoms/ui/popover'
import { cn } from '#/utils'

import { Field } from './Field'

interface FieldDateProps {
  title: string
  description?: string | null
  error?: string | null
  value: Date | null
  onChange: (date: Date | null) => void
  onBlur?: React.FocusEventHandler<HTMLButtonElement>
  disabled?: boolean
}

function FieldDate({
  title,
  description,
  error,
  value,
  onChange,
  onBlur,
  disabled,
}: FieldDateProps) {
  return (
    <Field title={title} description={description} error={error}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              inputClasses,
              'flex items-center text-left',
              !value && 'text-muted-foreground',
            )}
            onBlur={onBlur}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            {value ? format(value, 'PPP') : <span>Pick a date</span>}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={value ?? undefined}
            onSelect={(date) => onChange(date ?? null)}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

export { FieldDate }
export type { FieldDateProps }
