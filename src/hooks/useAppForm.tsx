import { createFormHook } from '@tanstack/react-form'

import { fieldContext, formContext } from './useFormContext'

import {
  FormFieldInput,
  FormFieldTextarea,
  FormFieldSelect,
  FormFieldCheckbox,
  FormFieldRadioGroup,
  FormSubscribeButton,
} from '#/components/molecules/form-field'

export const { useAppForm } = createFormHook({
  fieldComponents: {
    FieldInput: FormFieldInput,
    FieldTextarea: FormFieldTextarea,
    FieldSelect: FormFieldSelect,
    FieldCheckbox: FormFieldCheckbox,
    FieldRadioGroup: FormFieldRadioGroup,
  },
  formComponents: {
    SubscribeButton: FormSubscribeButton,
  },
  fieldContext,
  formContext,
})
