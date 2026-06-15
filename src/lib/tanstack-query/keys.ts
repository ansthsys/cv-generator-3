export const queryKeys = {
  session: ['session'] as const,
  cv: {
    all: ['cv'] as const,
    lists: ['cv', 'list'] as const,
    detail: (id: string) => ['cv', id] as const,
    public: (slug: string) => ['cv', slug, 'public'] as const,
    personalDetail: (cvId: string) => ['cv', cvId, 'personal-detail'] as const,
    experience: {
      all: (cvId: string) => ['cv', cvId, 'experience'] as const,
      detail: (cvId: string, id: string) =>
        ['cv', cvId, 'experience', id] as const,
    },
    education: {
      all: (cvId: string) => ['cv', cvId, 'education'] as const,
      detail: (cvId: string, id: string) =>
        ['cv', cvId, 'education', id] as const,
    },
    skill: {
      all: (cvId: string) => ['cv', cvId, 'skill'] as const,
      detail: (cvId: string, id: string) => ['cv', cvId, 'skill', id] as const,
    },
    project: {
      all: (cvId: string) => ['cv', cvId, 'project'] as const,
      detail: (cvId: string, id: string) =>
        ['cv', cvId, 'project', id] as const,
    },
    certificate: {
      all: (cvId: string) => ['cv', cvId, 'certificate'] as const,
      detail: (cvId: string, id: string) =>
        ['cv', cvId, 'certificate', id] as const,
    },
    award: {
      all: (cvId: string) => ['cv', cvId, 'award'] as const,
      detail: (cvId: string, id: string) => ['cv', cvId, 'award', id] as const,
    },
    organization: {
      all: (cvId: string) => ['cv', cvId, 'organization'] as const,
      detail: (cvId: string, id: string) =>
        ['cv', cvId, 'organization', id] as const,
    },
    socialLink: {
      all: (cvId: string) => ['cv', cvId, 'social-link'] as const,
      detail: (cvId: string, id: string) =>
        ['cv', cvId, 'social-link', id] as const,
    },
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
    update: (id: string) => ['cv', id, 'update'] as const,
    remove: (id: string) => ['cv', id, 'remove'] as const,
    personalDetail: {
      upsert: (cvId: string) =>
        ['cv', cvId, 'personal-detail', 'upsert'] as const,
    },
    experience: {
      create: (cvId: string) => ['cv', cvId, 'experience', 'create'] as const,
      update: (cvId: string, id: string) =>
        ['cv', cvId, 'experience', id, 'update'] as const,
      remove: (cvId: string, id: string) =>
        ['cv', cvId, 'experience', id, 'remove'] as const,
    },
    education: {
      create: (cvId: string) => ['cv', cvId, 'education', 'create'] as const,
      update: (cvId: string, id: string) =>
        ['cv', cvId, 'education', id, 'update'] as const,
      remove: (cvId: string, id: string) =>
        ['cv', cvId, 'education', id, 'remove'] as const,
    },
    skill: {
      create: (cvId: string) => ['cv', cvId, 'skill', 'create'] as const,
      update: (cvId: string, id: string) =>
        ['cv', cvId, 'skill', id, 'update'] as const,
      remove: (cvId: string, id: string) =>
        ['cv', cvId, 'skill', id, 'remove'] as const,
    },
    project: {
      create: (cvId: string) => ['cv', cvId, 'project', 'create'] as const,
      update: (cvId: string, id: string) =>
        ['cv', cvId, 'project', id, 'update'] as const,
      remove: (cvId: string, id: string) =>
        ['cv', cvId, 'project', id, 'remove'] as const,
    },
    certificate: {
      create: (cvId: string) => ['cv', cvId, 'certificate', 'create'] as const,
      update: (cvId: string, id: string) =>
        ['cv', cvId, 'certificate', id, 'update'] as const,
      remove: (cvId: string, id: string) =>
        ['cv', cvId, 'certificate', id, 'remove'] as const,
    },
    award: {
      create: (cvId: string) => ['cv', cvId, 'award', 'create'] as const,
      update: (cvId: string, id: string) =>
        ['cv', cvId, 'award', id, 'update'] as const,
      remove: (cvId: string, id: string) =>
        ['cv', cvId, 'award', id, 'remove'] as const,
    },
    organization: {
      create: (cvId: string) => ['cv', cvId, 'organization', 'create'] as const,
      update: (cvId: string, id: string) =>
        ['cv', cvId, 'organization', id, 'update'] as const,
      remove: (cvId: string, id: string) =>
        ['cv', cvId, 'organization', id, 'remove'] as const,
    },
    socialLink: {
      create: (cvId: string) => ['cv', cvId, 'social-link', 'create'] as const,
      update: (cvId: string, id: string) =>
        ['cv', cvId, 'social-link', id, 'update'] as const,
      remove: (cvId: string, id: string) =>
        ['cv', cvId, 'social-link', id, 'remove'] as const,
    },
  },
}
