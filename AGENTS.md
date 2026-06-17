# CV Generator 3 — Code Conventions

## Package Manager

- Always use `bun`. Do NOT use npm, pnpm, or yarn.

## Coding Rules

- No comments in code. Code should be self-documenting.
- No emojis, emoticons, or any Unicode pictograms in code or commits.
- No default exports. Always use named exports.
- Use `import type` for type-only imports.
- Prioritize readability and simplicity. Write code a beginner can understand.
- All user-facing strings must be in English. Error messages, labels, descriptions, and any text visible to users must use English.

## File & Folder Structure

- Components: Atomic Design (atoms, molecules, organisms, templates)
- Component files: PascalCase (`Button.tsx`, `UserCard.tsx`)
- Folder names: kebab-case (`plain-field/`, `tanstack-query/`, `better-auth/`)
- Utility files: kebab-case (`format-date.ts`, `cn.ts`)
- Common/shared atoms (like `LoadingButton`) go directly in `atoms/common/`
- Common/shared molecules (like `StatusAlert`) go directly in `molecules/common/`
- Use `#/` path alias for all imports (e.g. `#/components/atoms/Button`)

## Shadcn

- Prefer shadcn components. Add new ones via `bunx shadcn@latest add <component>`.
- Do NOT create custom atoms when a shadcn equivalent exists.
- For typography elements (h1-h4, p, muted, small, blockquote, code, lead, large), use `TypographyXxx` from `#/components/atoms/typography`.
- For link styling, use `linkVariants` cva from `#/components/atoms/typography` with `@tanstack/react-router`'s `Link`:
  ```tsx
  <Link to="/login" className={linkVariants({ variant: 'default' })}>
    Sign in
  </Link>
  ```
- For loading indicators, use `LoaderCircleIcon` from `lucide-react` with `className="animate-spin"`. Do NOT create a Spinner component.

## Form System

- Use `useAppForm` from `#/hooks/useAppForm` for complex/multi-field forms.
- `plain-field/FieldXxx` — standalone forms or custom logic. Pass `value`, `onChange`, `error` manually. Use when TanStack Form context is not needed (simple forms, one-off fields).
- `form-field/FormFieldXxx` — inside `form.AppField` with `useAppForm`. Auto-wired via field context. Use for complex forms with validation.
- Form options in `lib/form/` (one file per domain). Zod schemas from `prisma-zod-generator` at `#/generated/zod/schemas/variants/input/`. No manual schema files for models. Manual Zod schemas are allowed only for non-model data (route params, query params, etc.).

## UI

- Use Tailwind CSS v4 for styling (via `@tailwindcss/vite`).

## Git & Commits

- Use conventional commits without scope: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`
- Husky + lint-staged will auto-lint and format staged files on commit.

## Testing

- Write tests using Vitest + Testing Library.
- Test files should be co-located: `Button.test.tsx` next to `Button.tsx`.

## TanStack Query

- Query hooks in `hooks/query/<domain>.ts` (e.g. `hooks/query/auth.ts`).
  Named `useXxxQuery`, exported individually.
- Mutation hooks in `hooks/mutation/<domain>.ts` (e.g. `hooks/mutation/auth.ts`).
  Named `useXxxMutation`, exported individually.
- Single key file: `lib/tanstack-query/keys.ts` with `queryKeys` + `mutationKeys` exports.
  Use `as const` tuples for static keys, factory functions for parameterized keys.
- Query keys for CV domains use nested convention under `queryKeys.cv`:

  ```ts
  // CV-level
  cv.lists                              → ['cv', 'list']
  cv.detail(id)                         → ['cv', id]

  // Domain lists (under CV)
  cv.personalDetail(cvId)               → ['cv', cvId, 'personal-detail']
  cv.experience.all(cvId)               → ['cv', cvId, 'experience']
  cv.experience.detail(cvId, id)        → ['cv', cvId, 'experience', id]

  // Kebab-case for multi-word domain names
  cv.socialLink.all(cvId)               → ['cv', cvId, 'social-link']
  ```

  This structure enables `invalidateQueries(['cv', cvId])` to cascade to all
  sub-resources under that CV in a single call.

- Mutation keys for CV domains scoped under `mutationKeys.cv`:
  ```ts
  mutationKeys.cv.experience.create(cvId)     → ['cv', cvId, 'experience', 'create']
  mutationKeys.cv.experience.update(cvId, id) → ['cv', cvId, 'experience', id, 'update']
  mutationKeys.cv.experience.remove(cvId, id) → ['cv', cvId, 'experience', id, 'remove']
  ```
  Omit `mutationKey` entirely for update/delete hooks where the entity `id`
  is not available at hook creation time (passed via `mutationFn` at call time).
- Auth mutation keys stay flat under `mutationKeys.auth`:
  ```ts
  mutationKeys.auth.signIn    → ['auth', 'sign-in']
  mutationKeys.auth.signUp    → ['auth', 'sign-up']
  ```
- Schema inferred types (`export type LoginSchema = z.infer<typeof loginSchema>`)
  defined inside each schema file, not in hooks.
- Mutation functions must unwrap better-auth's `{ data, error }` response
  and throw on error to leverage TanStack Query's error state.

## opencode.json

- `opencode.json` contains MCP server configurations.
- MCP `better-auth` is configured there — always use the MCP tools (`better-auth_search_docs`, `better-auth_get_doc`) for better-auth questions. Do NOT use `websearch`/`webfetch` for better-auth docs.
- Check `opencode.json` before using external search tools.

## State & Data

- Use TanStack Query for server state (API/data fetching).
- Use React context for lightweight client state only.
- Use Prisma + better-auth for database and authentication.

## Data Layer Architecture (Three-Layer)

Always use three separate layers for data operations, split per domain:

```
lib/
├── repository/          → Pure Prisma queries (data access, no auth, no business logic)
│   ├── cv.ts
│   ├── experience.ts
│   └── ...
├── services/            → Business logic + ownership checks
│   ├── cv.ts
│   ├── experience.ts
│   └── ...
└── server/              → Thin createServerFn wrappers (auth guard + call service)
    ├── cv.ts
    ├── experience.ts
    └── ...
```

### Layer responsibilities

| Layer          | Responsibility                                                                                                                                                           | Example                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| **Repository** | Pure Prisma queries. No auth, no business logic, no date conversion. One function per query type.                                                                        | `findCvById(id)`, `insertExperience(data)`, `updateEducation(id, data)`        |
| **Service**    | Business rules, ownership validation, data transformation (e.g. date string → Date), auto sortOrder. Always receive `userId` as parameter. Throw on unauthorized access. | `getUserCv(cvId, userId)`, `createUserExperience(cvId, userId, data)`          |
| **ServerFn**   | `createServerFn` + `inputValidator` + `ensureSession()` + call service. Minimal — just auth guard and validation.                                                        | `createServerFn({...}).inputValidator(...).handler(async ({ data }) => {...})` |

### Rules

- **Auth guard** (`ensureSession`) goes in **ServerFn** layer only (server-only, needs cookies/headers).
- **Ownership checks** go in **Service** layer (it's business logic, not transport).
- **Repository** functions are pure data access — no `if`, no `throw`, no date conversion.
- **Date string → Date** conversion happens in **Service** layer, not repository.
- **Auto sortOrder** (finding max + incrementing) happens in **Service** layer.
- One file per domain in each layer (kebab-case filenames).
- Use `import type` for type-only imports between layers.
- Service functions that check ownership should prefix with `getUser*`, `createUser*`, etc. to signal they enforce user ownership.

## Session Start

At the start of each new session, read TIMELINE.md and PROGRESS.md
first to understand the current status and project roadmap.

## Behavior

- Always read TIMELINE.md and PROGRESS.md at session start before any task.
- Stick to the current phase in TIMELINE.md. Do not suggest work outside the
  current phase unless the user explicitly asks.
- Be decisive. Do not offer multiple options when the plan is already clear.
- Follow existing conventions exactly. No creativity in file structure, naming,
  or patterns unless instructed.
- All output must be in English — code, comments, commits, instructions.
- Never modify git history destructively. Use `git reset --soft` to amend,
  never leave unnecessary commits.
- Think before acting. If unsure, re-read the relevant files first.
- When user gives feedback, acknowledge the mistake directly and fix it
  immediately. No excuses, no excessive apology.
- Do not make assumptions about user intent. If ambiguous, ask once clearly.
