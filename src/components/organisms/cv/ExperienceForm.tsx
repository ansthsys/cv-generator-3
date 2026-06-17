import { useState, useEffect } from 'react'
import {
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} from '#/hooks/mutation/cv'
import { useAppForm } from '#/hooks/useAppForm'
import { experienceFormOpts } from '#/lib/form/cv'
import { Button } from '#/components/atoms/ui/button'
import type { ExperienceResultType } from '#/generated/zod/schemas/variants/result/Experience.result'

type ExperienceItem = Omit<ExperienceResultType, 'cv'>

const TYPE_OPTIONS = [
  { value: 'PENUH_WAKTU', label: 'Full Time' },
  { value: 'PARUH_WAKTU', label: 'Part Time' },
  { value: 'KONTRAK', label: 'Contract' },
  { value: 'PEKERJA_LEPAS', label: 'Freelance' },
  { value: 'MAGANG', label: 'Internship' },
]

interface ExperienceFormProps {
  cvId: string
  item?: ExperienceItem
  onSuccess?: () => void
}

function ExperienceForm({ cvId, item, onSuccess }: ExperienceFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const createMutation = useCreateExperienceMutation(cvId)
  const updateMutation = useUpdateExperienceMutation(cvId)
  const deleteMutation = useDeleteExperienceMutation(cvId)

  const form = useAppForm({
    ...experienceFormOpts,
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
      title: item.title,
      company: item.company,
      type: item.type,
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
          {item.title} — {item.company}
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
            {item ? 'Edit Experience' : 'Add Experience'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <form.AppField name="title">
              {(field: any) => (
                <field.FieldInput label="Title" placeholder="Job title" />
              )}
            </form.AppField>
            <form.AppField name="company">
              {(field: any) => (
                <field.FieldInput label="Company" placeholder="Company name" />
              )}
            </form.AppField>
            <form.AppField name="type">
              {(field: any) => (
                <field.FieldSelect
                  label="Type"
                  placeholder="Select type"
                  options={TYPE_OPTIONS}
                />
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
                <field.FieldCheckbox label="Currently working here" />
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

export { ExperienceForm }
