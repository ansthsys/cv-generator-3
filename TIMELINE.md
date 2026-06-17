# CV Generator 3 — Timeline

Single source of truth untuk semua step pengerjaan. Detail per step: scope, pattern, files touched, dependencies.

---

## Phase 1 — Lengkapi CRUD Forms (selesai)

Semua 9 section CV editor sudah memiliki add/edit/delete inline forms menggunakan `useAppForm` + generated Zod schemas.

### Migrasi yang dilakukan

- Hapus manual Zod schemas (`lib/schema/cv.ts`, `lib/form/cv.ts`)
- Migrasi 9 form files ke generated input schemas (`XxxInputType` + `XxxInputSchema`)
- Tambah shadcn Popover + Calendar untuk date picker
- Fix Education `gpa` Decimal/number di service layer
- Merge SocialLink ke halaman Personal Detail (bukan section terpisah)
- Export `inputClasses` dari `input.tsx` untuk reuse

---

## Phase 2 — Adjust UI (current)

### 7. Ganti raw `<input>` ke shadcn components

| Item         | Detail                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------- |
| Scope        | Semua section di CV editor                                                                         |
| Target       | Ganti leftover raw elements ke shadcn (textarea, select sudah, date picker sudah Popover+Calendar) |
| Dependencies | shadcn components sudah ter-install (calendar, popover)                                            |
| Notes        | Sebagian sudah done. Audit mana yang masih raw.                                                    |

### 8. Sonner toast untuk mutation feedback

| Item           | Detail                                                         |
| -------------- | -------------------------------------------------------------- |
| Scope          | Semua mutation hooks di CV editor + dashboard                  |
| Implementation | `onError` -> `toast.error()`, `onSuccess` -> `toast.success()` |
| Library        | shadcn Sonner sudah ter-install                                |

### 9. Drag-and-drop reorder

| Item           | Detail                                                          |
| -------------- | --------------------------------------------------------------- |
| Scope          | Experience, Education (yang punya `sortOrder` field)            |
| Server         | `reorderXxx` functions sudah ada di service/server layer        |
| Implementation | Drag handler di setiap item list, update sortOrder via mutation |

### 10. Loading skeleton

| Item    | Detail                                                   |
| ------- | -------------------------------------------------------- |
| Scope   | Dashboard (CV list loading), CV editor (section loading) |
| Pattern | Skeleton component dari shadcn                           |

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
