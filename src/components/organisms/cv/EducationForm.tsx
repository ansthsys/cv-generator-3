import { useState, useEffect } from 'react'
import {
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} from '#/hooks/mutation/cv'
import { useAppForm } from '#/hooks/useAppForm'
import { educationFormOpts } from '#/lib/form/cv'
import { Button } from '#/components/atoms/ui/button'
import { Input } from '#/components/atoms/ui/input'
import { Field } from '#/components/molecules/plain-field/Field'
import type { EducationResultType } from '#/generated/zod/schemas/variants/result/Education.result'

type EducationItem = Omit<EducationResultType, 'cv'>

const LEVEL_OPTIONS = [
  { value: 'SD', label: 'SD' },
  { value: 'SMP', label: 'SMP' },
  { value: 'SMA', label: 'SMA' },
  { value: 'SMK', label: 'SMK' },
  { value: 'D3', label: 'D3' },
  { value: 'S1', label: 'S1' },
  { value: 'S2', label: 'S2' },
  { value: 'S3', label: 'S3' },
]

interface EducationFormProps {
  cvId: string
  item?: EducationItem
  onSuccess?: () => void
}

function EducationForm({ cvId, item, onSuccess }: EducationFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const createMutation = useCreateEducationMutation(cvId)
  const updateMutation = useUpdateEducationMutation(cvId)
  const deleteMutation = useDeleteEducationMutation(cvId)

  const form = useAppForm({
    ...educationFormOpts,
    onSubmit: ({ value }) => {
      if (item) {
        updateMutation.mutate(
          { id: item.id, ...value },
          {
            onSuccess: () => setIsEditing(false),
          },
        )
      } else {
        createMutation.mutate(value, {
          onSuccess: () => onSuccess?.(),
        })
      }
    },
  })

  useEffect(() => {
    if (!isEditing || !item) return
    form.reset({
      level: item.level,
      institution: item.institution,
      fieldOfStudy: item.fieldOfStudy ?? '',
      gpa: item.gpa ?? null,
      startDate: item.startDate,
      endDate: item.endDate,
      isCurrent: item.isCurrent,
      description: item.description ?? '',
    })
  }, [isEditing])

  if (item && !isEditing) {
    return (
      <div className="flex items-center justify-between rounded border p-3 text-sm">
        <span>
          {item.level} — {item.institution}
        </span>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => deleteMutation.mutate(item.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="space-y-3 rounded border p-3">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            {item ? 'Edit Education' : 'Add Education'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <form.AppField name="level">
              {(field: any) => (
                <field.FieldSelect
                  label="Level"
                  placeholder="Select level"
                  options={LEVEL_OPTIONS}
                />
              )}
            </form.AppField>
            <form.AppField name="institution">
              {(field: any) => (
                <field.FieldInput
                  label="Institution"
                  placeholder="Institution name"
                />
              )}
            </form.AppField>
            <form.AppField name="fieldOfStudy">
              {(field: any) => (
                <field.FieldInput
                  label="Field of Study"
                  placeholder="Field of study"
                />
              )}
            </form.AppField>
            <form.AppField name="gpa">
              {(field: any) => (
                <Field title="GPA" error={field.state.meta.errors[0]?.message}>
                  <Input
                    type="number"
                    min={0}
                    max={4}
                    step={0.1}
                    placeholder="0.0 - 4.0"
                    value={field.state.value ?? ''}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                    onBlur={() => field.handleBlur()}
                  />
                </Field>
              )}
            </form.AppField>
            <form.AppField name="startDate">
              {(field: any) => <field.FieldDate label="Start Date" />}
            </form.AppField>
            <form.AppField name="endDate">
              {(field: any) => <field.FieldDate label="End Date" />}
            </form.AppField>
            <form.AppField name="isCurrent">
              {(field: any) => (
                <field.FieldCheckbox label="Currently studying here" />
              )}
            </form.AppField>
          </div>
          <form.AppField name="description">
            {(field: any) => (
              <field.FieldTextarea label="Description" rows={3} />
            )}
          </form.AppField>
          <div className="flex gap-2">
            <form.SubscribeButton label={item ? 'Save' : 'Add'} />
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (item) setIsEditing(false)
                else onSuccess?.()
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </form.AppForm>
  )
}

export { EducationForm }
