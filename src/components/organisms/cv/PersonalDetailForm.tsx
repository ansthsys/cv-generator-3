import { useEffect } from 'react'
import { usePersonalDetailQuery } from '#/hooks/query/cv'
import { useUpsertPersonalDetailMutation } from '#/hooks/mutation/cv'
import { useAppForm } from '#/hooks/useAppForm'
import { personalDetailFormOpts } from '#/lib/form/cv'

interface PersonalDetailFormProps {
  cvId: string
}

function PersonalDetailForm({ cvId }: PersonalDetailFormProps) {
  const { data: personalDetail } = usePersonalDetailQuery(cvId)
  const upsertMutation = useUpsertPersonalDetailMutation(cvId)

  const form = useAppForm({
    ...personalDetailFormOpts,
    onSubmit: ({ value }) => {
      upsertMutation.mutate(value)
    },
  })

  useEffect(() => {
    if (!personalDetail) return
    form.reset({
      fullName: personalDetail.fullName,
      email: personalDetail.email,
      phone: personalDetail.phone,
      photoUrl: personalDetail.photoUrl ?? '',
      city: personalDetail.city ?? '',
      summary: personalDetail.summary ?? '',
    })
  }, [personalDetail])

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
            Personal Detail
          </p>
          <div className="grid grid-cols-2 gap-3">
            <form.AppField name="fullName">
              {(field: any) => (
                <field.FieldInput
                  label="Full Name"
                  placeholder="Your full name"
                />
              )}
            </form.AppField>
            <form.AppField name="email">
              {(field: any) => (
                <field.FieldInput
                  label="Email"
                  type="email"
                  placeholder="email@example.com"
                />
              )}
            </form.AppField>
            <form.AppField name="phone">
              {(field: any) => (
                <field.FieldInput label="Phone" placeholder="+62 xxx" />
              )}
            </form.AppField>
            <form.AppField name="photoUrl">
              {(field: any) => (
                <field.FieldInput label="Photo URL" placeholder="https://..." />
              )}
            </form.AppField>
            <form.AppField name="city">
              {(field: any) => (
                <field.FieldInput label="City" placeholder="Your city" />
              )}
            </form.AppField>
          </div>
          <form.AppField name="summary">
            {(field: any) => (
              <field.FieldTextarea
                label="Summary"
                rows={4}
                placeholder="Brief professional summary"
              />
            )}
          </form.AppField>
          <form.SubscribeButton label="Save" />
        </div>
      </form>
    </form.AppForm>
  )
}

export { PersonalDetailForm }
