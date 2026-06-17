import { useState, useEffect } from 'react'
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from '#/hooks/mutation/cv'
import { useAppForm } from '#/hooks/useAppForm'
import { projectFormOpts } from '#/lib/form/cv'
import { Button } from '#/components/atoms/ui/button'
import type { ProjectResultType } from '#/generated/zod/schemas/variants/result/Project.result'

type ProjectItem = Omit<ProjectResultType, 'cv'>

interface ProjectFormProps {
  cvId: string
  item?: ProjectItem
  onSuccess?: () => void
}

function ProjectForm({ cvId, item, onSuccess }: ProjectFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const createMutation = useCreateProjectMutation(cvId)
  const updateMutation = useUpdateProjectMutation(cvId)
  const deleteMutation = useDeleteProjectMutation(cvId)

  const form = useAppForm({
    ...projectFormOpts,
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
      name: item.name,
      url: item.url ?? '',
      startDate: item.startDate,
      endDate: item.endDate,
      isCurrent: item.isCurrent,
      description: item.description ?? '',
    })
  }, [isEditing])

  if (item && !isEditing) {
    return (
      <div className="flex items-center justify-between rounded border p-3 text-sm">
        <span>{item.name}</span>
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
            {item ? 'Edit Project' : 'Add Project'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <form.AppField name="name">
              {(field: any) => (
                <field.FieldInput label="Name" placeholder="Project name" />
              )}
            </form.AppField>
            <form.AppField name="url">
              {(field: any) => (
                <field.FieldInput label="URL" placeholder="https://..." />
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
                <field.FieldCheckbox label="Currently working on this" />
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

export { ProjectForm }
