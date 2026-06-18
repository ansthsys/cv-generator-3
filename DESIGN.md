# CV Generator 3 — Design System

## Style

Brutalism-inspired. Monochrome (hitam putih), color reserved for semantic meaning only. No shadows, no rounded corners. High-contrast borders as primary visual separator.

## Theme Variables

All values below are overrides to the radix-sera preset variables defined in `src/assets/styles/global.css`.

### Radius

```css
--radius: 0;
```

### Colors

| Variable                   | Light            | Dark             | Usage                  |
| -------------------------- | ---------------- | ---------------- | ---------------------- |
| `--background`             | `white`          | `near-black`     | Page background        |
| `--foreground`             | `black`          | `white`          | Body text              |
| `--primary`                | `black`          | `white`          | Borders, high-emphasis |
| `--primary-foreground`     | `white`          | `black`          | Text on primary bg     |
| `--secondary`              | `light gray`     | `dark gray`      | Card/surface bg        |
| `--secondary-foreground`   | `black`          | `white`          | Text on secondary      |
| `--muted`                  | `lighter gray`   | `darker gray`    | Subtle bg              |
| `--muted-foreground`       | `medium gray`    | `medium gray`    | Secondary text         |
| `--accent`                 | `black`          | `white`          | Hover/active states    |
| `--accent-foreground`      | `white`          | `black`          | Text on accent         |
| `--border`                 | `var(--primary)` | `var(--primary)` | All borders            |
| `--input`                  | `var(--primary)` | `var(--primary)` | Input underline        |
| `--ring`                   | `var(--primary)` | `var(--primary)` | Focus ring             |
| `--destructive`            | `red`            | `red`            | Error/danger           |
| `--destructive-foreground` | `white`          | `white`          | Text on destructive    |

### Typography

- Sans: `--font-sans` (Inter Variable)
- Heading: `--font-heading` (Merriweather Variable)
- Use `TypographyXxx` components

### Shapes

- All radius vars: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl` → `0`

### Rules

- All borders: `border-primary` (not `border-border` or `border-input`)
- Input: underline style `border-b border-primary`
- No `shadow-*` or `drop-shadow-*` classes
- No `rounded-*` classes (global override via radius)
