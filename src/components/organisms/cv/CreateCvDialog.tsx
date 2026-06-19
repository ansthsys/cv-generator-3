import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { useCreateCvMutation } from '#/hooks/mutation/cv'
import { useAppForm } from '#/hooks/useAppForm'
import { cvFormOpts } from '#/lib/form/cv'
import { Button } from '#/components/atoms/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '#/components/atoms/ui/dialog'

function CreateCvDialog() {
  const [open, setOpen] = useState(false)
  const createCvMutation = useCreateCvMutation()

  const form = useAppForm({
    ...cvFormOpts,
    onSubmit: async ({ value }) => {
      await createCvMutation.mutateAsync(value)
      form.reset()
      setOpen(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4" />
          New CV
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form.AppForm>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <DialogHeader>
              <DialogTitle>Create New CV</DialogTitle>
              <DialogDescription>
                Name your CV to get started.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-5 mb-8">
              <form.AppField name="name">
                {(field: any) => (
                  <field.FieldInput
                    label="CV Name"
                    placeholder="e.g. Software Engineer Resume"
                  />
                )}
              </form.AppField>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <form.SubscribeButton label="Create" />
            </DialogFooter>
          </form>
        </form.AppForm>
      </DialogContent>
    </Dialog>
  )
}

export { CreateCvDialog }
