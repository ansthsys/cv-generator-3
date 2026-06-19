import { useState } from 'react'
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '#/components/atoms/ui/alert-dialog'
import { LoadingButton } from '#/components/atoms/common/LoadingButton'

type ControlledProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type UncontrolledProps = {
  open?: never
  onOpenChange?: never
}

type ConfirmDialogBaseProps = {
  title: string
  description: string
  labelConfirm?: string
  labelCancel?: string
  loadingLabel?: string
  onConfirm: () => void
  isLoading?: boolean
  isDisabled?: boolean
  variant?: 'destructive' | 'default'
}

type ConfirmDialogProps = ConfirmDialogBaseProps &
  (ControlledProps | UncontrolledProps)

function ConfirmDialog(props: ConfirmDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  const isControlled = props.open !== undefined
  const open = isControlled ? props.open : internalOpen
  const onOpenChange = isControlled ? props.onOpenChange : setInternalOpen

  const {
    title,
    description,
    labelConfirm = 'Delete',
    labelCancel = 'Cancel',
    loadingLabel = 'Deleting...',
    onConfirm,
    isLoading = false,
    isDisabled = false,
    variant = 'destructive',
  } = props

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {labelCancel}
          </AlertDialogCancel>

          <AlertDialogPrimitive.Action asChild onClick={onConfirm}>
            <LoadingButton
              variant={variant}
              isLoading={isLoading}
              disabled={isDisabled}
              loadingText={loadingLabel}
            >
              {labelConfirm}
            </LoadingButton>
          </AlertDialogPrimitive.Action>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { ConfirmDialog }
export type { ConfirmDialogProps }
