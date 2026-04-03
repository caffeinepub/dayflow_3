# DayFlow

## Current State
The app uses a `df-red` token (`oklch(0.62 0.26 22)`) as the primary accent color throughout: header logo, nav active state, footer, quote bar, date selector, Tasks widget (border, icon, progress bar, buttons, checkboxes), and CSS custom properties (`--primary`, `--accent`, `--destructive`, `--ring`, sidebar primaries). `df.teal` is aliased to the same red value. `card-glow` utility also uses this red value.

## Requested Changes (Diff)

### Add
- Nothing

### Modify
- Change all red accent values (oklch hue 22) to blue (oklch hue ~250) across tailwind.config.js, index.css, App.tsx, and TasksCard.tsx

### Remove
- Nothing

## Implementation Plan
1. `tailwind.config.js`: change `df.red`, `df.red-dim`, `df.teal`, `df.teal-dim` from oklch hue 22 to oklch hue 250. Update `boxShadow.glow`.
2. `index.css`: update `--primary`, `--accent`, `--destructive`, `--ring`, sidebar primary/ring, `--chart-1` from hue 22 to hue 250. Update `card-glow` utility.
3. `App.tsx`: update two inline style values on quote accent bar from red oklch to blue.
4. `TasksCard.tsx`: change `border-t-red-300` to `border-t-blue-300`.
5. Validate.
