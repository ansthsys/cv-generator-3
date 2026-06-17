import { useState } from 'react'
import type { ReactNode } from 'react'
import { Button } from '#/components/atoms/ui/button'

interface SectionPageTemplateProps<T extends { id: string }> {
  title: string
  isPending: boolean
  children?: ReactNode
  itemSkeleton?: ReactNode
  items?: T[]
  FormComponent?: (props: {
    item?: T
    onSuccess?: () => void
    cvId: string
  }) => ReactNode
  formProps?: { cvId: string }
  emptyMessage?: string
  addButtonLabel?: string
}

function SectionPageTemplate<T extends { id: string }>({
  title,
  isPending,
  children,
  itemSkeleton,
  items,
  FormComponent,
  formProps,
  emptyMessage,
  addButtonLabel,
}: SectionPageTemplateProps<T>) {
  const [isAdding, setIsAdding] = useState(false)
  const isListMode = !!FormComponent

  function renderAddForm() {
    if (!isAdding || !FormComponent || !formProps) return null
    return <FormComponent {...formProps} onSuccess={() => setIsAdding(false)} />
  }

  function renderListItem(item: T) {
    if (!FormComponent || !formProps) return null
    return <FormComponent key={item.id} {...formProps} item={item} />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {isListMode && addButtonLabel && !isPending && !isAdding && (
          <Button size="sm" variant="outline" onClick={() => setIsAdding(true)}>
            {addButtonLabel}
          </Button>
        )}
      </div>

      {renderAddForm()}

      {isPending ? (
        <div className="space-y-2">
          {Array.from({ length: isListMode ? 5 : 1 }, (_, i) => (
            <div key={i}>
              {itemSkeleton ?? (
                <div className="flex items-center justify-between rounded border p-3">
                  <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                  <div className="flex gap-1">
                    <div className="h-8 w-14 animate-pulse rounded bg-muted" />
                    <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : isListMode ? (
        items && items.length > 0 ? (
          <div className="space-y-2">{items.map(renderListItem)}</div>
        ) : !isAdding && emptyMessage ? (
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        ) : null
      ) : (
        children
      )}
    </div>
  )
}

export { SectionPageTemplate }
