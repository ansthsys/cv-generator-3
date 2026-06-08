import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authClient } from '#/lib/better-auth/auth-client'
import { mutationKeys, queryKeys } from '#/lib/tanstack-query/keys'
import type {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from '#/lib/schema/auth'

export function useSignInMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.auth.signIn,
    mutationFn: async (values: LoginSchema) => {
      const { data, error } = await authClient.signIn.email(values)
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.session })
    },
  })
}

export function useSignUpMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.auth.signUp,
    mutationFn: async (values: RegisterSchema) => {
      const { data, error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.session })
    },
  })
}

export function useSignOutMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: mutationKeys.auth.signOut,
    mutationFn: async () => {
      const { error } = await authClient.signOut()
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.session })
    },
  })
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationKey: mutationKeys.auth.forgotPassword,
    mutationFn: async (values: ForgotPasswordSchema) => {
      const { error } = await authClient.requestPasswordReset({
        email: values.email,
        redirectTo: '/reset-password',
      })
      if (error) throw error
    },
  })
}

export function useResetPasswordMutation(token: string) {
  return useMutation({
    mutationKey: mutationKeys.auth.resetPassword,
    mutationFn: async (values: ResetPasswordSchema) => {
      const { error } = await authClient.resetPassword({
        newPassword: values.password,
        token,
      })
      if (error) throw error
    },
  })
}

export function useSendVerificationMutation() {
  return useMutation({
    mutationKey: mutationKeys.auth.sendVerification,
    mutationFn: async (email: string) => {
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: '/verify-email-success',
      })
      if (error) throw error
    },
  })
}
