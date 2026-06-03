import { useFieldContext } from '#/hooks/useFormContext'
import { FieldInput } from '#/components/molecules/plain-field/FieldInput'

function FormFieldInput({
  label,
  placeholder,
  type,
  description,
}: {
  label: string
  placeholder?: string
  type?: string
  description?: string | null
}) {
  const field = useFieldContext<string>()

  return (
    <FieldInput
      title={label}
      placeholder={placeholder}
      type={type}
      description={description}
      value={field.state.value}
      error={field.state.meta.errors[0]?.message}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={() => field.handleBlur()}
    />
  )
}

export { FormFieldInput }
