import { useFieldContext } from '#/hooks/useFormContext'
import { FieldCheckbox } from '#/components/molecules/plain-field/FieldCheckbox'
import type { FieldCheckboxProps } from '#/components/molecules/plain-field/FieldCheckbox'

function FormFieldCheckbox({
  label,
  description,
  options,
  orientation,
  renderOption,
}: {
  label: string
  description?: string | null
  options: { value: string; label: string }[]
  orientation?: FieldCheckboxProps['orientation']
  renderOption?: FieldCheckboxProps['renderOption']
}) {
  const field = useFieldContext<string[]>()

  return (
    <FieldCheckbox
      title={label}
      description={description}
      error={field.state.meta.errors[0]?.message}
      options={options}
      checkedValues={field.state.value}
      onCheckedChange={(value, checked) => {
        if (checked) {
          field.pushValue(value)
        } else {
          const idx = field.state.value.indexOf(value)
          if (idx !== -1) field.removeValue(idx)
        }
      }}
      orientation={orientation}
      renderOption={renderOption}
    />
  )
}

export { FormFieldCheckbox }
