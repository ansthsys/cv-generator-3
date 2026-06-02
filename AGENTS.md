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
- Utility files: kebab-case (`format-date.ts`, `cn.ts`)
- Use `#/` path alias for all imports (e.g. `#/components/atoms/Button`)

## UI

- Use Tailwind CSS v4 for styling (via `@tailwindcss/vite`).
- Use shadcn components via `bunx shadcn@latest add <component>`.

## Git & Commits

- Use conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`
- Husky + lint-staged will auto-lint and format staged files on commit.

## Testing

- Write tests using Vitest + Testing Library.
- Test files should be co-located: `Button.test.tsx` next to `Button.tsx`.

## State & Data

- Use TanStack Query for server state (API/data fetching).
- Use React context for lightweight client state only.
- Use Prisma + better-auth for database and authentication.
