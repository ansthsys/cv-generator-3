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
- Auth forms: SignInForm (email + password + rememberMe), SignUpForm (name + email + password + confirmPassword)
- Remember me feature on sign-in (boolean, not passed to signUp.email)
- Forgot password placeholder route (`(auth)/forgot-password.tsx`)

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
- Buttons wrapped in `<div>` for consistency
- Text links grouped with `text-center` alignment
- StatusAlert positioned consistently (below title, above form fields)
- Resend verification text revised to avoid awkward line wraps

## What's NOT done (core features)

- CV builder forms (education, experience, skills, projects)
- CV template rendering / PDF export
- User dashboard
- Profile management
- Any domain-specific business logic

## Known issues

- Build has pre-existing failures (kysely compatibility, unrelated to auth)
- Rate limiting might need runtime verification
