# CV Generator 3 — Timeline

Single source of truth untuk semua step pengerjaan. Detail per step: scope, pattern, files touched, dependencies.

---

## Phase 1 — Lengkapi CRUD Forms

### 1. Project — add + edit form

| Item         | Detail                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------ |
| File         | `src/routes/(dashboard)/cv.$cvId.edit.tsx`                                                                         |
| Pattern      | Copy `ExperienceSection`, sesuaikan field dan mutation                                                             |
| Scope        | Tambah form add + edit di `ProjectSection` (mirip ExperienceSection). Saat ini hanya list + delete.                |
| Fields       | `name`, `role`, `description`, `url`, `techStack` (textarea, comma-separated), `startDate`, `endDate`, `isCurrent` |
| Hooks        | `useCreateProjectMutation(cvId)`, `useUpdateProjectMutation(cvId)`                                                 |
| Server       | `createProject`, `updateProject` (sudah ada)                                                                       |
| Dependencies | Tidak ada                                                                                                          |
| Notes        | Edit inline pakai state `editing/editForm` seperti Experience                                                      |

### 2. Certificate — add + edit form

| Item         | Detail                                                                        |
| ------------ | ----------------------------------------------------------------------------- |
| File         | `src/routes/(dashboard)/cv.$cvId.edit.tsx`                                    |
| Pattern      | Copy `ExperienceSection`, sesuaikan field dan mutation                        |
| Scope        | Tambah form add + edit di `CertificateSection`. Saat ini hanya list + delete. |
| Fields       | `name`, `issuer`, `url`, `issueDate`, `expirationDate`                        |
| Hooks        | `useCreateCertificateMutation(cvId)`, `useUpdateCertificateMutation(cvId)`    |
| Server       | `createCertificate`, `updateCertificate` (sudah ada)                          |
| Dependencies | Tidak ada                                                                     |

### 3. Award — add + edit form

| Item         | Detail                                                                  |
| ------------ | ----------------------------------------------------------------------- |
| File         | `src/routes/(dashboard)/cv.$cvId.edit.tsx`                              |
| Pattern      | Copy `ExperienceSection`, sesuaikan field dan mutation                  |
| Scope        | Tambah form add + edit di `AwardSection`. Saat ini hanya list + delete. |
| Fields       | `title`, `issuer`, `date`, `description`                                |
| Hooks        | `useCreateAwardMutation(cvId)`, `useUpdateAwardMutation(cvId)`          |
| Server       | `createAward`, `updateAward` (sudah ada)                                |
| Dependencies | Tidak ada                                                               |

### 4. Organization — add + edit form

| Item         | Detail                                                                         |
| ------------ | ------------------------------------------------------------------------------ |
| File         | `src/routes/(dashboard)/cv.$cvId.edit.tsx`                                     |
| Pattern      | Copy `ExperienceSection`, sesuaikan field dan mutation                         |
| Scope        | Tambah form add + edit di `OrganizationSection`. Saat ini hanya list + delete. |
| Fields       | `name`, `role`, `startDate`, `endDate`, `isCurrent`, `description`, `url`      |
| Hooks        | `useCreateOrganizationMutation(cvId)`, `useUpdateOrganizationMutation(cvId)`   |
| Server       | `createOrganization`, `updateOrganization` (sudah ada)                         |
| Dependencies | Tidak ada                                                                      |

### 5. SocialLink — add + edit form

| Item         | Detail                                                                       |
| ------------ | ---------------------------------------------------------------------------- |
| File         | `src/routes/(dashboard)/cv.$cvId.edit.tsx`                                   |
| Pattern      | Copy `SkillSection` (simple add inline, tanpa edit form kompleks)            |
| Scope        | Tambah form add + edit di `SocialLinkSection`. Saat ini hanya list + delete. |
| Fields       | `label`, `url`                                                               |
| Hooks        | `useCreateSocialLinkMutation(cvId)`, `useUpdateSocialLinkMutation(cvId)`     |
| Server       | `createSocialLink`, `updateSocialLink` (sudah ada)                           |
| Dependencies | Tidak ada                                                                    |

### 6. Education — edit form

| Item         | Detail                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------- |
| File         | `src/routes/(dashboard)/cv.$cvId.edit.tsx`                                                        |
| Pattern      | Copy edit inline dari `ExperienceSection`                                                         |
| Scope        | Tambah edit state + form di `EducationSection`. Saat ini hanya add + delete.                      |
| Fields       | `level`, `institution`, `fieldOfStudy`, `gpa`, `startDate`, `endDate`, `isCurrent`, `description` |
| Hooks        | `useUpdateEducationMutation(cvId)` (sudah di-import)                                              |
| Server       | `updateEducation` (sudah ada)                                                                     |
| Dependencies | Tidak ada                                                                                         |
| Notes        | `gpa` perlu handle `number \| null` di input                                                      |

---

## Phase 2 — Adjust UI

### 7. Ganti raw `<input>` ke shadcn components

| Item         | Detail                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| Scope        | Semua section di `cv.$cvId.edit.tsx`                                                                          |
| Target       | `<input>` -> `Input`, `<textarea>` -> `Textarea`, `<select>` -> `Select`, `<button>` -> `Button`              |
| Add shadcn   | `bunx shadcn@latest add input textarea select`                                                                |
| Dependencies | Butuh shadcn add dulu untuk komponen yang belum ada                                                           |
| Notes        | `date` input mungkin tetap pakai native `<input type="date">`, tidak ada shadcn date picker di registry dasar |

### 8. Migrasi form kompleks ke `useAppForm` + Zod validasi

| Item         | Detail                                                                |
| ------------ | --------------------------------------------------------------------- |
| Priority     | `PersonalDetail` + `Experience` (paling kompleks)                     |
| Pattern      | Copy pola dari auth forms (`SignInForm`, dll)                         |
| Scope        | Ganti `useState` + raw form jadi `useAppForm` + `FieldXxx` components |
| Dependencies | Step 7 (shadcn components sudah ter-install)                          |
| Notes        | Minimal 2 section dulu, sisanya menyusul kalau perlu                  |

---

## Phase 3 — UX + Interaction

### 9. Scroll spy navigasi antar section

| Item           | Detail                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------- |
| Implementation | Intersection Observer + sidebar/list daftar section                                          |
| UX             | Klik section name -> scroll smooth ke section target. Section aktif di-highlight di sidebar. |
| Dependencies   | Tidak ada (independent dari phase lain)                                                      |
| Notes          | Bisa dikerjakan sebelum atau sesudah Phase 2                                                 |

### 10. Drag-and-drop reorder

| Item           | Detail                                                          |
| -------------- | --------------------------------------------------------------- |
| Scope          | Experience, Education (yang punya `sortOrder` field)            |
| Server         | `reorderXxx` functions sudah ada di service/server layer        |
| Implementation | Drag handler di setiap item list, update sortOrder via mutation |
| Dependencies   | Forms sudah lengkap (Phase 1)                                   |

### 11. CV name edit inline

| Item  | Detail                                       |
| ----- | -------------------------------------------- |
| File  | `src/routes/(dashboard)/cv.$cvId.edit.tsx`   |
| Scope | Ganti header `{cv.name}` jadi editable input |
| Hooks | `useUpdateCvMutation(cvId)`                  |

### 12. Error handling + Sonner toast

| Item           | Detail                                                                               |
| -------------- | ------------------------------------------------------------------------------------ |
| Scope          | Semua mutation hooks di CV editor + dashboard                                        |
| Implementation | `onError` callback di mutation -> `toast.error()`. `onSuccess` -> `toast.success()`. |
| Library        | shadcn Sonner sudah ter-install                                                      |

### 13. Loading skeleton

| Item    | Detail                                                   |
| ------- | -------------------------------------------------------- |
| Scope   | Dashboard (CV list loading), CV editor (section loading) |
| Pattern | Skeleton component dari shadcn                           |

---

## Phase 4 — Layout Refactor

### 14. Dua panel: kiri form + scroll spy, kanan preview

| Item         | Detail                                                                             |
| ------------ | ---------------------------------------------------------------------------------- |
| Layout       | Kiri: scrollable form sections dengan navigasi scroll spy. Kanan: live CV preview. |
| Responsive   | Single column di mobile (preview di atas/bawah).                                   |
| Dependencies | Phase 1 (forms lengkap), Step 9 (scroll spy), Step 7/8 (UI rapi)                   |

### 15. Responsive single column mobile

| Item  | Detail                                              |
| ----- | --------------------------------------------------- |
| Scope | Layout collapse ke single column di breakpoint < md |
| Notes | Bagian dari Step 14, bukan step terpisah            |

### 16. Sticky header + smooth scroll

| Item  | Detail                                                         |
| ----- | -------------------------------------------------------------- |
| Scope | Header section navigation sticky di atas, smooth scroll anchor |

---

## Phase 5 — Output

### 17. CV template rendering / preview

| Item   | Detail                                                               |
| ------ | -------------------------------------------------------------------- |
| Scope  | Live preview panel (kanan) yang render CV berdasarkan data dari form |
| Format | HTML-based preview, mirip tampilan CV final                          |

### 18. PDF export

| Item    | Detail                   |
| ------- | ------------------------ |
| Scope   | Export CV preview ke PDF |
| Library | Belum ditentukan         |

### 19. Public CV page

| Item  | Detail                                                                   |
| ----- | ------------------------------------------------------------------------ |
| Route | `/cv/:slug` (public, no auth required)                                   |
| Scope | Tampilkan CV berdasarkan slug, dengan template yang sama seperti preview |

### 20. Profile management

| Item  | Detail                                                           |
| ----- | ---------------------------------------------------------------- |
| Scope | Halaman settings/profile untuk update nama, email, password user |
