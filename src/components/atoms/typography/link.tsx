import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export const linkVariants = cva(
  'underline underline-offset-4 transition-all hover:decoration-2',
  {
    variants: {
      variant: {
        default: '',
        muted: 'text-muted-foreground',
        destructive: 'text-destructive',
        warning: 'text-amber-600 dark:text-amber-400',
        success: 'text-green-600 dark:text-green-400',
        info: 'text-blue-600 dark:text-blue-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type LinkVariants = VariantProps<typeof linkVariants>
