import { useFieldContext } from '#/hooks/useFormContext'
import { FieldSelect } from '#/components/molecules/plain-field/FieldSelect'

function FormFieldSelect({
  label,
  placeholder,
  description,
  disabled,
  options,
}: {
  label: string
  placeholder?: string
  description?: string | null
  disabled?: boolean
  options: { value: string; label: string }[]
}) {
  const field = useFieldContext<string>()

  return (
    <FieldSelect
      title={label}
      placeholder={placeholder}
      description={description}
      options={options}
      value={field.state.value}
      error={field.state.meta.errors[0]?.message}
      disabled={disabled}
      onValueChange={(v) => field.handleChange(v)}
    />
  )
}

export { FormFieldSelect }
