import { useState, useEffect } from 'react'
import {
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from '#/hooks/mutation/cv'
import { useAppForm } from '#/hooks/useAppForm'
import { skillFormOpts } from '#/lib/form/cv'
import { Button } from '#/components/atoms/ui/button'
import type { SkillResultType } from '#/generated/zod/schemas/variants/result/Skill.result'

type SkillItem = Omit<SkillResultType, 'cv'>

interface SkillFormProps {
  cvId: string
  item?: SkillItem
  onSuccess?: () => void
}

function SkillForm({ cvId, item, onSuccess }: SkillFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const createMutation = useCreateSkillMutation(cvId)
  const updateMutation = useUpdateSkillMutation(cvId)
  const deleteMutation = useDeleteSkillMutation(cvId)

  const form = useAppForm({
    ...skillFormOpts,
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
      level: item.level ?? '',
    })
  }, [isEditing])

  if (item && !isEditing) {
    return (
      <div className="flex items-center justify-between rounded border p-3 text-sm">
        <span>
          {item.name}
          {item.level ? ` (${item.level})` : ''}
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
            {item ? 'Edit Skill' : 'Add Skill'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <form.AppField name="name">
              {(field: any) => (
                <field.FieldInput label="Name" placeholder="Skill name" />
              )}
            </form.AppField>
            <form.AppField name="level">
              {(field: any) => (
                <field.FieldInput
                  label="Level"
                  placeholder="e.g. Beginner, Advanced"
                />
              )}
            </form.AppField>
          </div>
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

export { SkillForm }
