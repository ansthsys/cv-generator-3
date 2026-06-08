import { z } from 'zod'

export const verifyResendSchema = z.object({
  password: z.string().min(1, 'Password is required'),
})

export type VerifyResendSchema = z.infer<typeof verifyResendSchema>
