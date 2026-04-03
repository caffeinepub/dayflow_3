# DayFlow

## Current State
DayFlow is a dark-themed personal daily dashboard with 5 widgets: Tasks, Journal, Daily Habits, Daily Devotion, and Bible Reader. The app uses an OKLCH-based dark navy color system with red (`oklch(0.65 0.22 25)`) as the primary accent. The current palette is muted/flat — dark navy backgrounds, no gradient depth, no vibrant widget differentiation. Widget cards share a nearly identical look (`bg-df-navy-mid`, same border, same card shadow). The DailyHabitsCard uses a purple accent inline variable (`oklch(0.72 0.18 290)`) inconsistently. No widget has a truly premium, layered visual style.

## Requested Changes (Diff)

### Add
- A richer, more vibrant color palette: deepen the red accent to a true vivid crimson (`oklch(0.62 0.26 22)`), add a warm gold accent for Devotion, a deep indigo/violet for Journal, an emerald green for Habits, and a sky blue for Bible Reader
- Stronger card depth: each widget card gets a unique glass-morphism treatment — subtle gradient backgrounds, glowing border accents, and hover lift/glow effects tuned per widget
- More vibrant background: replace the flat dark navy with a rich deep background that has subtle radial highlights to add dimensionality
- Premium typography upgrade: switch UI body text to Plus Jakarta Sans (pre-bundled) for a sharper, more polished professional feel
- Widget header icon containers get color-matched treatment (not all the same red)
- The nav bar active state gets a more vivid/elevated treatment
- Improved card shadows with colored glows per widget

### Modify
- `index.css`: Update background gradient to be richer. Update CSS custom property values for background, card, border. Add new semantic tokens for widget-specific accent colors
- `tailwind.config.js`: Update `df.*` color tokens. Add per-widget semantic color tokens: `df.devotion` (gold), `df.journal` (indigo), `df.habits` (emerald), `df.bible` (sky). Update `boxShadow.card` for richer depth. Update `fontFamily.sans` to Plus Jakarta Sans
- `TasksCard.tsx`: Update card background to use a subtle warm surface with a red glow border treatment. Upgrade the progress bar. Make the card feel premium — slightly elevated surface, richer header.
- `JournalCard.tsx`: The existing purple gradient background is good but needs to be richer (deeper indigo-to-violet gradient). Update tab styling for more visual punch. Update the body/input styling.
- `DailyHabitsCard.tsx`: Replace the purple ACCENT inline variable with the new `df.habits` emerald token from Tailwind. Give the card a rich dark emerald-tinted surface
- `DevotionCard.tsx`: Enhance the amber/gold treatment — richer gradients, stronger border glow, more elegant blockquote styling with a gold left border
- `BibleReaderCard.tsx`: Give the card a deep sky-blue tinted surface with matching border/glow. Upgrade the navigation to be more premium-looking
- `App.tsx`: Upgrade the nav bar active pill and header section for a more polished look

### Remove
- Nothing removed

## Implementation Plan
1. Update `tailwind.config.js` — enrich all `df.*` tokens, add per-widget color tokens, update shadows, update font
2. Update `index.css` — new background gradient, richer CSS variables, font-face for Plus Jakarta Sans, updated utility classes
3. Update `TasksCard.tsx` — premium card styling with red accent
4. Update `JournalCard.tsx` — richer indigo/violet gradient, better tabs
5. Update `DailyHabitsCard.tsx` — replace inline ACCENT with emerald tokens, premium card
6. Update `DevotionCard.tsx` — enhanced amber/gold card treatment
7. Update `BibleReaderCard.tsx` — sky-blue tinted premium card
8. Update `App.tsx` — richer nav, improved header overall visual polish
