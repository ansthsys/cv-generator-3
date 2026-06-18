# CV Generator 3 — Progress

## Status

| Item            | Detail                             |
| --------------- | ---------------------------------- |
| Current         | Phase 2 — Adjust UI + UX           |
| Phase progress  | 0 / 4 steps completed              |
| Timeline detail | [Lihat TIMELINE.md](./TIMELINE.md) |

## Phase 1 — CRUD Forms (complete)

- [x] Project add + edit form
- [x] Certificate add + edit form
- [x] Award add + edit form
- [x] Organization add + edit form
- [x] SocialLink add + edit form (merged into PersonalDetail)
- [x] Education edit form

### Phase 1 Migrations

- [x] Delete manual Zod schemas (`lib/schema/cv.ts`, `lib/form/cv.ts`)
- [x] Migrate all 9 form files to generated input schemas (`XxxInputType` + `XxxInputSchema`)
- [x] Migrate date picker from native `<input type="date">` to shadcn Popover + Calendar
- [x] Export `inputClasses` from `Input.tsx` for reuse
- [x] Fix Education `gpa` Decimal/number type mismatch (service layer)

## Phase 2 — Adjust UI (current)

- [ ] Shadcn component pass (replace remaining raw elements)
- [ ] Sonner toast for mutation errors/success
- [ ] Drag-and-drop reorder (Experience, Education)
- [ ] Loading skeletons (dashboard + CV editor)

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
- Generated Zod input schemas + form options for all CV domains
- TanStack Query hooks + nested key convention (`['cv', cvId, 'domain']`)
- Dashboard route (CV list, create, delete)
- CV editor with all 9 section CRUD forms complete

### General Layout

- [x] Split Navbar into atomic design (UserAvatar atom, 4 layout molecules)
- [x] Active page indicators unified bg-muted/80
- [x] Link activeProps + data-open for submenu triggers
- [x] Child route detection via item.to (no prefix config)
- [x] Full-height AppLayout (main + Container flex-1)
- [x] Responsive container: max-w-5xl xl:max-w-7xl
- [x] Header h-16, submenu triggers h-10 for consistency
- [x] ESLint ignore src/generated/\*\*

## Known Issues

- Build fails at Nitro stage (kysely compatibility, pre-existing)
- 1310 eslint errors from `src/generated/`
- Rate limiting might need runtime verification
