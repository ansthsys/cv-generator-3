import { useFieldContext } from '#/hooks/useFormContext'
import { FieldCheckbox } from '#/components/molecules/plain-field/FieldCheckbox'
import type { FieldCheckboxProps } from '#/components/molecules/plain-field/FieldCheckbox'

function FormFieldCheckbox({
  label,
  description,
  disabled,
  options,
  orientation,
  renderOption,
}: {
  label: string
  description?: string | null
  disabled?: boolean
  options?: { value: string; label: string }[]
  orientation?: FieldCheckboxProps['orientation']
  renderOption?: FieldCheckboxProps['renderOption']
}) {
  const field = useFieldContext<boolean | string[]>()

  return (
    <FieldCheckbox
      title={label}
      description={description}
      error={field.state.meta.errors[0]?.message}
      disabled={disabled}
      value={field.state.value}
      onChange={(value) => field.handleChange(value)}
      options={options}
      orientation={orientation}
      renderOption={renderOption}
    />
  )
}

export { FormFieldCheckbox }
