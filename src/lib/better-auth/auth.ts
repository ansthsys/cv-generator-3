import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '#/db'
import { sendVerificationEmail } from '#/lib/email/send'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
    usePlural: true,
  }),
  emailAndPassword: {
    autoSignIn: true,
    enabled: true,
    requireEmailVerification: false,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    expiresIn: 86400,
    sendOnSignUp: true,
    sendOnSignIn: true,
    sendVerificationEmail: async ({ user, url }) => {
      const parsed = new URL(url)
      parsed.searchParams.set('callbackURL', '/verify-email-success')
      void sendVerificationEmail(user.email, parsed.toString())
    },
  },
  rateLimit: {
    enabled: true,
    storage: 'database',
    window: 60,
    max: 10,
  },
  plugins: [tanstackStartCookies()],
})
