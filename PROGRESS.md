# CV Generator 3 — Progress

## Status

| Item            | Detail                                     |
| --------------- | ------------------------------------------ |
| Current         | Phase 1 — Step 1 (Project add + edit form) |
| Phase progress  | 0 / 6 steps completed                      |
| Timeline detail | [Lihat TIMELINE.md](./TIMELINE.md)         |

## Phase 1 — CRUD Forms (current)

- [ ] Project add + edit form
- [ ] Certificate add + edit form
- [ ] Award add + edit form
- [ ] Organization add + edit form
- [ ] SocialLink add + edit form
- [ ] Education edit form

## Completed

### Foundation

- Project Setup (TanStack Start, Tailwind v4, Atomic Design, `#/` alias)
- Design System (Typography components, shadcn radix-sera theme, form system)
- Auth (better-auth with email/password, verification, remember me)
- Session & middleware (dynamic session, guest/authed guards)
- Layout uniformity (AuthLayout, AuthFormLayout)

### Data Layer

- Prisma schema with all CV models + Zod generator config
- Three-layer architecture (Repository -> Service -> ServerFn)
- Zod form schemas + form options for all CV domains
- TanStack Query hooks + nested key convention (`['cv', cvId, 'domain']`)
- Dashboard route (CV list, create, delete)
- CV editor base (9 sections, some CRUD incomplete)

## Known Issues

- Build fails at Nitro stage (kysely compatibility, pre-existing)
- 1310 eslint errors from `src/generated/`
- Rate limiting might need runtime verification
