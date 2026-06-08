# CV Generator 3 — Code Conventions

## Package Manager

- Always use `bun`. Do NOT use npm, pnpm, or yarn.

## Coding Rules

- No comments in code. Code should be self-documenting.
- No emojis, emoticons, or any Unicode pictograms in code or commits.
- No default exports. Always use named exports.
- Use `import type` for type-only imports.
- Prioritize readability and simplicity. Write code a beginner can understand.

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
- Zod schemas in `lib/schema/`, form options in `lib/form/`. One file per domain/group.

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
- Query and mutation keys in `lib/tanstack-query/keys.ts`.
  Key structure: domain-separated private variables (e.g. `cvKeys`, `authMutationKeys`)
  with `all` as anchor, merged into exported `queryKeys` / `mutationKeys` objects.
  Use spread from `all` for child keys to keep them DRY.
  Use `as const` tuples for static keys, factory functions for parameterized keys
  (e.g. `detail: (id: string) => [...cvKeys.all, 'detail', id]`).
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
