import type { ComponentProps } from 'react'

import { FieldGroup } from '#/components/atoms/ui/field'
import { TypographyH3, TypographyMuted } from '#/components/atoms/typography'

interface AuthFormLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  onSubmit?: ComponentProps<'form'>['onSubmit']
}

function AuthFormLayout({
  title,
  description,
  children,
  footer,
  onSubmit,
}: AuthFormLayoutProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <TypographyH3>{title}</TypographyH3>
          {description && (
            <TypographyMuted className="text-balance">
              {description}
            </TypographyMuted>
          )}
        </div>

        {children}

        {footer}
      </FieldGroup>
    </form>
  )
}

export { AuthFormLayout }
export type { AuthFormLayoutProps }
