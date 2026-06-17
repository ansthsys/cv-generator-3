import { useState, useEffect } from 'react'
import {
  useCreateSocialLinkMutation,
  useUpdateSocialLinkMutation,
  useDeleteSocialLinkMutation,
} from '#/hooks/mutation/cv'
import { useAppForm } from '#/hooks/useAppForm'
import { socialLinkFormOpts } from '#/lib/form/cv'
import { Button } from '#/components/atoms/ui/button'
import type { SocialLinkResultType } from '#/generated/zod/schemas/variants/result/SocialLink.result'

type SocialLinkItem = Omit<SocialLinkResultType, 'cv'>

interface SocialLinkFormProps {
  cvId: string
  item?: SocialLinkItem
  onSuccess?: () => void
}

function SocialLinkForm({ cvId, item, onSuccess }: SocialLinkFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const createMutation = useCreateSocialLinkMutation(cvId)
  const updateMutation = useUpdateSocialLinkMutation(cvId)
  const deleteMutation = useDeleteSocialLinkMutation(cvId)

  const form = useAppForm({
    ...socialLinkFormOpts,
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
      label: item.label,
      url: item.url,
    })
  }, [isEditing])

  if (item && !isEditing) {
    return (
      <div className="flex items-center justify-between rounded border p-3 text-sm">
        <span>{item.label}</span>
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
            {item ? 'Edit Social Link' : 'Add Social Link'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <form.AppField name="label">
              {(field: any) => (
                <field.FieldInput
                  label="Label"
                  placeholder="e.g. LinkedIn, GitHub"
                />
              )}
            </form.AppField>
            <form.AppField name="url">
              {(field: any) => (
                <field.FieldInput label="URL" placeholder="https://..." />
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

export { SocialLinkForm }
