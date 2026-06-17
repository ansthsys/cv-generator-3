import { useFieldContext } from '#/hooks/useFormContext'
import { FieldDate } from '#/components/molecules/plain-field/FieldDate'

function FormFieldDate({
  label,
  description,
  disabled,
}: {
  label: string
  description?: string | null
  disabled?: boolean
}) {
  const field = useFieldContext<Date | null>()

  return (
    <FieldDate
      title={label}
      description={description}
      error={field.state.meta.errors[0]?.message}
      disabled={disabled}
      value={field.state.value}
      onChange={(v) => field.handleChange(v)}
      onBlur={() => field.handleBlur()}
    />
  )
}

export { FormFieldDate }
