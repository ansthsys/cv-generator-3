export const queryKeys = {
  session: ['session'] as const,
  cv: {
    all: ['cv'] as const,
    lists: ['cv', 'list'] as const,
    detail: (id: string) => ['cv', 'detail', id] as const,
    public: (slug: string) => ['cv', 'public', slug] as const,
  },
  education: {
    all: ['education'] as const,
    byCv: (cvId: string) => ['education', 'cv', cvId] as const,
    detail: (id: string) => ['education', 'detail', id] as const,
  },
}

export const mutationKeys = {
  auth: {
    signIn: ['auth', 'sign-in'] as const,
    signUp: ['auth', 'sign-up'] as const,
    signOut: ['auth', 'sign-out'] as const,
    forgotPassword: ['auth', 'forgot-password'] as const,
    resetPassword: ['auth', 'reset-password'] as const,
    sendVerification: ['auth', 'send-verification'] as const,
  },
  cv: {
    create: ['cv', 'create'] as const,
    update: (id: string) => ['cv', 'update', id] as const,
    remove: (id: string) => ['cv', 'remove', id] as const,
  },
  education: {
    create: ['education', 'create'] as const,
    update: (id: string) => ['education', 'update', id] as const,
    remove: (id: string) => ['education', 'remove', id] as const,
  },
}
