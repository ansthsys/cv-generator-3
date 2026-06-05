import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(2, 'At least 2 characters'),
    email: z.email('Invalid email'),
    password: z.string().min(8, 'At least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
