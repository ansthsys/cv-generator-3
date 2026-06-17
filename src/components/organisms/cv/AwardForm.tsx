import { useState, useEffect } from 'react'
import {
  useCreateAwardMutation,
  useUpdateAwardMutation,
  useDeleteAwardMutation,
} from '#/hooks/mutation/cv'
import { useAppForm } from '#/hooks/useAppForm'
import { awardFormOpts } from '#/lib/form/cv'
import { Button } from '#/components/atoms/ui/button'
import type { AwardResultType } from '#/generated/zod/schemas/variants/result/Award.result'

type AwardItem = Omit<AwardResultType, 'cv'>

interface AwardFormProps {
  cvId: string
  item?: AwardItem
  onSuccess?: () => void
}

function AwardForm({ cvId, item, onSuccess }: AwardFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const createMutation = useCreateAwardMutation(cvId)
  const updateMutation = useUpdateAwardMutation(cvId)
  const deleteMutation = useDeleteAwardMutation(cvId)

  const form = useAppForm({
    ...awardFormOpts,
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
      organization: item.organization,
      date: item.date,
      description: item.description ?? '',
    })
  }, [isEditing])

  if (item && !isEditing) {
    return (
      <div className="flex items-center justify-between rounded border p-3 text-sm">
        <span>
          {item.title} — {item.organization}
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
            {item ? 'Edit Award' : 'Add Award'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <form.AppField name="title">
              {(field: any) => (
                <field.FieldInput label="Title" placeholder="Award title" />
              )}
            </form.AppField>
            <form.AppField name="organization">
              {(field: any) => (
                <field.FieldInput
                  label="Organization"
                  placeholder="Issuing organization"
                />
              )}
            </form.AppField>
            <form.AppField name="date">
              {(field: any) => <field.FieldDate label="Date" />}
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

export { AwardForm }
