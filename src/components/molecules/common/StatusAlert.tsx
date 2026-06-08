import type { ReactNode } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '#/components/atoms/ui/alert'
import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'

const variantConfig = {
  success: {
    alertVariant: 'default' as const,
    icon: CircleCheckIcon,
    className: 'border-green-500/20 bg-green-50 dark:bg-green-950',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  error: {
    alertVariant: 'destructive' as const,
    icon: OctagonXIcon,
    className: 'bg-destructive/10',
    iconColor: '',
  },
  warning: {
    alertVariant: 'default' as const,
    icon: TriangleAlertIcon,
    className: 'border-amber-500/20 bg-amber-50 dark:bg-amber-950',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  info: {
    alertVariant: 'default' as const,
    icon: InfoIcon,
    className: 'border-blue-500/20 bg-blue-50 dark:bg-blue-950',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
}

interface StatusAlertProps {
  variant: keyof typeof variantConfig
  title?: string
  children?: ReactNode
}

function StatusAlert({ variant, title, children }: StatusAlertProps) {
  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <Alert variant={config.alertVariant} className={config.className}>
      <Icon className={config.iconColor} />
      {title && <AlertTitle>{title}</AlertTitle>}
      {children && <AlertDescription>{children}</AlertDescription>}
    </Alert>
  )
}

export { StatusAlert }
export type { StatusAlertProps }
