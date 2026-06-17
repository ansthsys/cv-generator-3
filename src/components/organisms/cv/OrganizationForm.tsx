import { useState, useEffect } from 'react'
import {
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} from '#/hooks/mutation/cv'
import { useAppForm } from '#/hooks/useAppForm'
import { organizationFormOpts } from '#/lib/form/cv'
import { Button } from '#/components/atoms/ui/button'
import type { OrganizationResultType } from '#/generated/zod/schemas/variants/result/Organization.result'

type OrganizationItem = Omit<OrganizationResultType, 'cv'>

interface OrganizationFormProps {
  cvId: string
  item?: OrganizationItem
  onSuccess?: () => void
}

function OrganizationForm({ cvId, item, onSuccess }: OrganizationFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const createMutation = useCreateOrganizationMutation(cvId)
  const updateMutation = useUpdateOrganizationMutation(cvId)
  const deleteMutation = useDeleteOrganizationMutation(cvId)

  const form = useAppForm({
    ...organizationFormOpts,
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
      role: item.role,
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
          {item.name} — {item.role}
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
            {item ? 'Edit Organization' : 'Add Organization'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <form.AppField name="name">
              {(field: any) => (
                <field.FieldInput
                  label="Name"
                  placeholder="Organization name"
                />
              )}
            </form.AppField>
            <form.AppField name="role">
              {(field: any) => (
                <field.FieldInput label="Role" placeholder="Your role" />
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
                <field.FieldCheckbox label="Currently involved" />
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

export { OrganizationForm }
