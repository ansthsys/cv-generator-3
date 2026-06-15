# CV Generator 3 — Progress

## What's been built

Auth flow (login, register, email verification, session management) and supporting systems. Core CV features not started yet.

### Project Setup

- TanStack Start with React 19, Vite 8, Tailwind CSS v4
- Atomic Design folder structure (atoms → molecules → organisms → templates)
- `#/` path alias, named exports, English-only messages
- Husky + lint-staged (prettier + eslint on commit)

### Design System

- Golden-ratio typography scale (14px base, shadcn-compatible)
- 13 Typography components (H1-H4, P, Lead, Large, Small, Muted, Blockquote, Code, Ul, Ol, Li)
- Custom `text-lead` class in Tailwind theme for phi step
- StatusAlert, shadcn Alert, shadcn Card, shadcn Sonner
- linkVariants CVA for Link styling
- Heading typography (H1–H4, Large) use `font-heading` (Merriweather Variable)
- shadcn radix-sera theme applied via `apply --preset` (preset b4dGlY0Nez) — restyled all shadcn UI components (button, card, input, checkbox, etc.) and global.css tokens
- `cn.ts` migrated to shadcn-generated `utils.ts` + re-export via `#/utils`

### Form System

- `useFormContext` — wraps `createFormHookContexts()` with ZodError Omit override
- `useAppForm` — registers all field components via `createFormHook()`
- Plain-field layer (RawField): FieldInput, FieldTextarea, FieldSelect, FieldCheckbox, FieldRadioGroup — pure UI, manual value/onChange/error
- Form-field layer (FormField): FormFieldInput, FormFieldTextarea, FormFieldSelect, FormFieldCheckbox, FormFieldRadioGroup, FormSubscribeButton — auto-wired via field context
- Generic FieldCheckbox: `boolean | string[]` value with runtime check (single vs multi)
- Zod schemas in `lib/schema/`, form options in `lib/form/`

### Authentication (better-auth)

- Server config: email/password, email verification, rate limit, tanstackStartCookies plugin
- Client: `authClient` from `createAuthClient()`
- Prisma: RateLimits model generated via `auth:generate`, migrated to database
- Email: nodemailer SMTP transporter (Mailtrap dev), `sendVerificationEmail()`
- Auth forms: SignInForm (email + password + rememberMe), SignUpForm (name + email + password + confirmPassword), ForgotPasswordForm, ResetPasswordForm, VerifyEmailForm, VerifyEmailSuccess
- Remember me feature on sign-in (boolean, not passed to signUp.email)
- TanStack Query mutation hooks (`hooks/mutation/auth.ts`): signIn, signUp, signOut, forgotPassword, resetPassword, sendVerification
- Session query (`hooks/query/auth.ts`) via `useSessionQuery()`
- Query/mutation keys in `lib/tanstack-query/keys.ts`
- Mutation hooks unwrap `{ data, error }` from authClient and throw on error for TanStack Query error state

### Session & Middleware

- Dynamic session: `getSession()` moved from `router.tsx` to root `beforeLoad` — fetched fresh on every `router.invalidate()`
- `router.invalidate()` called after sign-in, sign-up, and logout
- Guest middleware (`/login`, `/register`): redirect to `/` if session exists
- Authed middleware (`/verify-email`, `/verify-email-success`): redirect to `/login` if no session
- Root middleware: redirect unverified users to `/verify-email` (except auth pages)
- verify-email page: resend verification email, logout button
- verify-email-success page: shown after email verification, accessible only when logged in
- `callbackURL` override in `sendVerificationEmail` (auth.ts): `/verify-email-success`
- Index page navbar: shows sign-in/sign-up buttons when logged out, user email + logout when logged in

### Layout & Uniformity

- AuthLayout template shared across all auth pages
- AuthFormLayout simplified: only `title`, `description`, `children`, `onSubmit`, `gap-10`
- All 6 auth forms follow unified structure:
  - StatusAlert langsung sebagai children AuthFormLayout (di luar container fields)
  - `<div className="space-y-4">` hanya untuk `form.AppField`
  - `form.SubscribeButton` langsung sebagai children AuthFormLayout
  - Footer items (FieldSeparator, GitHub button, sign-in/sign-up links) inline langsung
  - Footer files (`SignInFooter.tsx`, `SignUpFooter.tsx`) deleted
  - Setiap `form.AppField` tanpa inner `<div>` tambahan
- `LoadingButton` atom (`atoms/common/LoadingButton`)
- StatusAlert moved to `molecules/common/StatusAlert` (flat structure, no subfolder)
- Single-file component folders flattened (no subfolder for single file)

### Data Layer (Phase 2 — Complete)

- `src/lib/server/cv.ts` — all CV CRUD server functions via `createServerFn` + `.inputValidator()`:
  - CV: list, get (with all relations), create, update, delete
  - PersonalDetail: get, upsert
  - Experience: list, create, update, delete, reorder
  - Education: list, create, update, delete, reorder
  - Skill: list, create, update, delete, reorder
  - Project: list, create, update, delete, reorder
  - Certificate: list, create, update, delete, reorder
  - Award: list, create, update, delete, reorder
  - Organization: list, create, update, delete, reorder
  - SocialLink: list, create, update, delete, reorder
- TanStack Query hooks: query hooks (`hooks/query/cv.ts`) + mutation hooks (`hooks/mutation/cv.ts`) for all 10 domains
- Query/mutation keys in `lib/tanstack-query/keys.ts` — nested `['cv', cvId, 'domain']` convention so `invalidateQueries(['cv', cvId])` cascades to all sub-resources
- Zod form schemas in `lib/schema/cv.ts` — adapted from generated `prisma-zod` input schemas with string date coercion
- Routes:
  - `/dashboard` — list CVs, create new, delete
  - `/cv/$cvId/edit` — CV editor with all sections (PersonalDetail form, Experience/Education/Skill add+delete, Project/Certificate/Award/Organization/SocialLink list+delete)

## What's NOT done

- CV template rendering / PDF export (Phase 3)
- Full UI polish — basic HTML forms, user said they'll adjust UI later
- Drag-and-drop reordering (server functions exist, UI not built)
- Profile management

## Known issues

- Build failures at Nitro stage due to pre-existing kysely compatibility issue (`DEFAULT_MIGRATION_LOCK_TABLE` / `DEFAULT_MIGRATION_TABLE`). Client build (2270 modules) and SSR build (228 modules) succeed. Unrelated to UI/auth.
- Rate limiting might need runtime verification
- 1310 eslint errors from generated files in `src/generated/` (outdated project config)
