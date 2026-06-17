import { useState } from 'react'
import { useSocialLinksQuery } from '#/hooks/query/cv'
import { SocialLinkForm } from './SocialLinkForm'
import { Button } from '#/components/atoms/ui/button'

interface SocialLinkSectionProps {
  cvId: string
}

function SocialLinkSection({ cvId }: SocialLinkSectionProps) {
  const { data: socialLinks } = useSocialLinksQuery(cvId)
  const [isAdding, setIsAdding] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Social Links</h3>
        {!isAdding && (
          <Button size="sm" variant="outline" onClick={() => setIsAdding(true)}>
            Add Social Link
          </Button>
        )}
      </div>

      {isAdding && (
        <SocialLinkForm cvId={cvId} onSuccess={() => setIsAdding(false)} />
      )}

      {socialLinks?.map((link) => (
        <SocialLinkForm key={link.id} cvId={cvId} item={link} />
      ))}

      {!socialLinks?.length && !isAdding && (
        <p className="text-sm text-muted-foreground">
          No social links added yet.
        </p>
      )}
    </div>
  )
}

export { SocialLinkSection }
