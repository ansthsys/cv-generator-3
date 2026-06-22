# CV Generator 3 — Timeline

Single source of truth untuk semua step pengerjaan. Detail per step: scope, pattern, files touched, dependencies.

---

## Phase 1 — CRUD Forms (complete)

Semua 9 section CV editor sudah memiliki add/edit/delete forms menggunakan per-section wizard approach (8 route pages + Personal Detail dengan Social Link terintegrasi).

### Migrasi yang dilakukan

- Hapus manual Zod schemas (`lib/schema/cv.ts`, `lib/form/cv.ts`)
- Migrasi 9 form files ke generated input schemas (`XxxInputType` + `XxxInputSchema`)
- Tambah shadcn Popover + Calendar untuk date picker
- Fix Education `gpa` Decimal/number di service layer
- Merge SocialLink ke halaman Personal Detail (bukan section terpisah)
- Export `inputClasses` dari `input.tsx` untuk reuse

---

## Phase 2 — UI Polish (current)

### 1. Shadcn component pass

| Item   | Detail                                                                         |
| ------ | ------------------------------------------------------------------------------ |
| Scope  | Semantic section di wizard pages                                               |
| Target | Ganti leftover raw elements ke shadcn (textarea, select sudah, date picker OK) |
| Notes  | Audit mana yang masih raw                                                      |

### 2. Sonner toast untuk mutation feedback

| Item           | Detail                                                         |
| -------------- | -------------------------------------------------------------- |
| Scope          | Semua mutation hooks di CV wizard + dashboard                  |
| Implementation | `onError` -> `toast.error()`, `onSuccess` -> `toast.success()` |
| Library        | shadcn Sonner sudah ter-install                                |

### 3. Drag-and-drop reorder

| Item           | Detail                                                          |
| -------------- | --------------------------------------------------------------- |
| Scope          | List sections: Experience, Education (yang punya `sortOrder`)   |
| Server         | `reorderXxx` functions sudah ada di service/server layer        |
| Implementation | Drag handler di setiap item list, update sortOrder via mutation |

### 4. Loading skeletons

| Item    | Detail                                                         |
| ------- | -------------------------------------------------------------- |
| Scope   | Dashboard (CV list), CV wizard (per-section saat loading data) |
| Pattern | Skeleton component dari shadcn                                 |

---

## Phase 3 — Wizard UX Enhancement

### 5. CV name edit inline

| Item  | Detail                                                    |
| ----- | --------------------------------------------------------- |
| Scope | Header di wizard layout — ganti teks statis jadi editable |
| Hooks | `useUpdateCvMutation(cvId)` — sudah ada                   |

### 6. Dirty state + unsaved warning

| Item  | Detail                                                     |
| ----- | ---------------------------------------------------------- |
| Scope | Deteksi perubahan di form sebelum navigasi ke section lain |
| UX    | Confirm dialog saat pindah section dengan form dirty       |

### 7. Step indicator polish

| Item  | Detail                                                        |
| ----- | ------------------------------------------------------------- |
| Scope | `PageNavigation` — tampilkan step completion, progress visual |

### 8. Keyboard shortcuts

| Item  | Detail                                          |
| ----- | ----------------------------------------------- |
| Scope | Ctrl+S / Cmd+S untuk save form di section aktif |

---

## Phase 4 — Preview + Output

### 9. CV template rendering / preview

| Item   | Detail                                                 |
| ------ | ------------------------------------------------------ |
| Scope  | Live preview yang render CV berdasarkan data dari form |
| Format | HTML-based preview, mirip tampilan CV final            |

### 10. PDF export

| Item    | Detail                   |
| ------- | ------------------------ |
| Scope   | Export CV preview ke PDF |
| Library | Belum ditentukan         |

### 11. Public CV page

| Item  | Detail                                                |
| ----- | ----------------------------------------------------- |
| Route | `/cv/:slug` (public, no auth required)                |
| Scope | Tampilkan CV berdasarkan slug dengan template preview |

---

## Phase 5 — Profile Management

### 12. Settings page

| Item  | Detail                                                           |
| ----- | ---------------------------------------------------------------- |
| Scope | Halaman settings/profile untuk update nama, email, password user |
