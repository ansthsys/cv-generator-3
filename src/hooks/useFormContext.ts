import { createFormHookContexts } from '@tanstack/react-form'
import type { ZodError } from 'zod'

const contexts = createFormHookContexts()

function useFieldContext<TData>() {
  const field = contexts.useFieldContext<TData>()
  return field as Omit<typeof field, 'state'> & {
    state: Omit<(typeof field)['state'], 'meta'> & {
      meta: Omit<(typeof field)['state']['meta'], 'errors'> & {
        errors: ZodError['issues']
      }
    }
  }
}

export const { fieldContext, formContext, useFormContext } = contexts
export { useFieldContext }
