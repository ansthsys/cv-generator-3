import type { ComponentProps, ReactNode } from 'react'

import { TypographyH3, TypographyMuted } from '#/components/atoms/typography'

interface AuthFormLayoutProps {
  title: string
  description?: string
  children: ReactNode
  onSubmit?: ComponentProps<'form'>['onSubmit']
}

function AuthFormLayout({
  title,
  description,
  children,
  onSubmit,
}: AuthFormLayoutProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <TypographyH3>{title}</TypographyH3>
        {description && (
          <TypographyMuted className="text-balance">
            {description}
          </TypographyMuted>
        )}
      </div>

      {children}
    </form>
  )
}

export { AuthFormLayout }
export type { AuthFormLayoutProps }
