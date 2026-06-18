import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { PlusIcon, LoaderCircleIcon } from 'lucide-react'
import { useCvListQuery } from '#/hooks/query/cv'
import { useCreateCvMutation, useDeleteCvMutation } from '#/hooks/mutation/cv'
import { TypographyH2, TypographyMuted } from '#/components/atoms/typography'
import { Button } from '#/components/atoms/ui/button'
import { LoadingButton } from '#/components/atoms/common/LoadingButton'
import { useState } from 'react'

export const Route = createFileRoute('/(dashboard)/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const router = useRouter()
  const { data: cvs, isPending: cvsPending } = useCvListQuery()
  const deleteCvMutation = useDeleteCvMutation()
  const [showCreate, setShowCreate] = useState(false)

  return (
    <>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <TypographyH2>My CVs</TypographyH2>
          <TypographyMuted>Manage your curriculum vitae</TypographyMuted>
        </div>
        {showCreate ? (
          <CreateCvForm
            onDone={() => {
              setShowCreate(false)
              router.invalidate()
            }}
          />
        ) : (
          <Button onClick={() => setShowCreate(true)}>
            <PlusIcon className="mr-2 size-4" />
            New CV
          </Button>
        )}
      </header>

      {cvsPending ? (
        <div className="flex justify-center py-12">
          <LoaderCircleIcon className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : cvs && cvs.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cvs.map((cv) => (
            <div key={cv.id} className="rounded-lg border p-4">
              <div className="mb-2 font-medium">{cv.name}</div>
              <TypographyMuted className="mb-4 text-sm">
                Updated {new Date(cv.updatedAt).toLocaleDateString()}
              </TypographyMuted>
              <div className="flex gap-2">
                <Link to="/cv/$cvId/edit" params={{ cvId: cv.id }}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                <LoadingButton
                  variant="outline"
                  size="sm"
                  onClick={() => deleteCvMutation.mutate(cv.id)}
                  isLoading={deleteCvMutation.isPending}
                  loadingText="..."
                >
                  Delete
                </LoadingButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <TypographyMuted>No CVs yet. Create your first one.</TypographyMuted>
        </div>
      )}
    </>
  )
}

function CreateCvForm({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState('')
  const createCvMutation = useCreateCvMutation()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    await createCvMutation.mutateAsync({ name: name.trim() })
    setName('')
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="CV name"
        className="rounded-md border px-3 py-1.5 text-sm"
        autoFocus
      />
      <LoadingButton
        size="sm"
        type="submit"
        isLoading={createCvMutation.isPending}
        loadingText="Creating..."
      >
        Create
      </LoadingButton>
      <Button variant="ghost" size="sm" type="button" onClick={onDone}>
        Cancel
      </Button>
    </form>
  )
}
