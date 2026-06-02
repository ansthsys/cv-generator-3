# CV Generator 3

A modern CV/resume generator built with TanStack Start.

## Tech Stack

- **Framework:** TanStack Start + React 19
- **Styling:** Tailwind CSS v4 + shadcn
- **Database:** Prisma + PostgreSQL
- **Auth:** better-auth
- **State:** TanStack Query
- **Linting:** ESLint + Prettier (via Husky + lint-staged)
- **Package Manager:** Bun

## Prerequisites

- [Bun](https://bun.sh) v1.x
- PostgreSQL database

## Getting Started

```bash
bun install
bun run dev
```

## Building for Production

```bash
bun run build
bun run preview
```

## Available Scripts

| Script               | Description                        |
| -------------------- | ---------------------------------- |
| `bun run dev`        | Start development server           |
| `bun run build`      | Build for production               |
| `bun run preview`    | Preview production build           |
| `bun run lint`       | Run ESLint                         |
| `bun run format`     | Format code with Prettier + ESLint |
| `bun run check`      | Check Prettier formatting          |
| `bun run test`       | Run tests (Vitest)                 |
| `bun run db:push`    | Push Prisma schema to database     |
| `bun run db:migrate` | Run Prisma migrations              |
| `bun run db:studio`  | Open Prisma Studio                 |
| `bun run db:seed`    | Seed database                      |

## Conventions

See [AGENTS.md](./AGENTS.md) for complete coding conventions used in this project.

## Project Structure

```
src/
  assets/         Static assets (images, styles)
  components/     Atomic Design components
    atoms/        Smallest UI primitives
    molecules/    Composite components
    organisms/    Complex UI sections
    templates/    Page layouts
  lib/            Business logic, utilities
    better-auth/  Authentication setup
    tanstack-query/ TanStack Query setup
  routes/         File-based routes (TanStack Router)
    api/          API route handlers
  router.tsx      Router configuration
  db.ts           Prisma client
```

## Database

This project uses Prisma with PostgreSQL. Copy `.env.example` to `.env.local` and configure your `DATABASE_URL`.

```bash
bun run db:generate
bun run db:migrate
bun run db:studio
```

## Authentication

Authentication is handled by [better-auth](https://www.better-auth.com) with the `tanstackStartCookies()` plugin. Session is automatically injected into the router context via the root route's `beforeLoad`.

## Shadcn

Add new UI components:

```bash
bunx shadcn@latest add <component>
```

## Deployment

Build produces a self-contained Node server in `dist/`. Deploy to any Node-compatible host.

```bash
bun run build
node dist/server/index.mjs
```
