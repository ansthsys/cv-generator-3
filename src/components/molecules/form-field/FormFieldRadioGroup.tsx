import { useFieldContext } from '#/hooks/useFormContext'
import { FieldRadioGroup } from '#/components/molecules/plain-field/FieldRadioGroup'

function FormFieldRadioGroup({
  label,
  description,
  options,
}: {
  label: string
  description?: string | null
  options: { value: string; label: string }[]
}) {
  const field = useFieldContext<string>()

  return (
    <FieldRadioGroup
      title={label}
      description={description}
      options={options}
      value={field.state.value}
      error={field.state.meta.errors[0]?.message}
      onValueChange={(v) => field.handleChange(v)}
    />
  )
}

export { FormFieldRadioGroup }
