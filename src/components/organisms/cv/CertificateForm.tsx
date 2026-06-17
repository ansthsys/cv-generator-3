import { useState, useEffect } from 'react'
import {
  useCreateCertificateMutation,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
} from '#/hooks/mutation/cv'
import { useAppForm } from '#/hooks/useAppForm'
import { certificateFormOpts } from '#/lib/form/cv'
import { Button } from '#/components/atoms/ui/button'
import type { CertificateResultType } from '#/generated/zod/schemas/variants/result/Certificate.result'

type CertificateItem = Omit<CertificateResultType, 'cv'>

interface CertificateFormProps {
  cvId: string
  item?: CertificateItem
  onSuccess?: () => void
}

function CertificateForm({ cvId, item, onSuccess }: CertificateFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const createMutation = useCreateCertificateMutation(cvId)
  const updateMutation = useUpdateCertificateMutation(cvId)
  const deleteMutation = useDeleteCertificateMutation(cvId)

  const form = useAppForm({
    ...certificateFormOpts,
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
      organization: item.organization,
      date: item.date,
      description: item.description ?? '',
    })
  }, [isEditing])

  if (item && !isEditing) {
    return (
      <div className="flex items-center justify-between rounded border p-3 text-sm">
        <span>
          {item.name} — {item.organization}
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
            {item ? 'Edit Certificate' : 'Add Certificate'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <form.AppField name="name">
              {(field: any) => (
                <field.FieldInput label="Name" placeholder="Certificate name" />
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

export { CertificateForm }
