import { useFieldContext } from '#/hooks/useFormContext'
import { FieldTextarea } from '#/components/molecules/plain-field/FieldTextarea'

function FormFieldTextarea({
  label,
  placeholder,
  description,
  disabled,
  rows,
}: {
  label: string
  placeholder?: string
  description?: string | null
  disabled?: boolean
  rows?: number
}) {
  const field = useFieldContext<string>()

  return (
    <FieldTextarea
      title={label}
      placeholder={placeholder}
      description={description}
      rows={rows}
      value={field.state.value}
      error={field.state.meta.errors[0]?.message}
      disabled={disabled}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={() => field.handleBlur()}
    />
  )
}

export { FormFieldTextarea }
