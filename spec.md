# DayFlow — Bible Reader Enhancements

## Current State
`BibleReaderCard.tsx` is a compact dashboard widget card with:
- A header (Library icon + title + translation name)
- Book dropdown (Select) + Chapter dropdown (Select) + prev/next chapter buttons
- A `ScrollArea` of height `h-80` showing verse list
- Dark navy card background, df-red/teal accents
- Used both in the dashboard grid (compact) and in the full-screen Bible nav tab

Navigation is functional but visually flat: two plain Select dropdowns side by side with small arrow buttons.

## Requested Changes (Diff)

### Add
- **Bigger, more immersive layout**: increase the card height and reading area substantially. In the dashboard grid, `min-h-[500px]`. In the full Bible tab view it already fills the page, so make the scroll area taller there too.
- **Redesigned book navigation**: Replace the plain book Select dropdown with a categorised, two-panel approach:
  - A **Testament toggle** (Old Testament / New Testament) as two pill/tab buttons at the top
  - A **scrollable book grid** below the toggle showing all books for the selected testament as small clickable pills/chips (e.g. 3–4 columns). Selected book is highlighted with df-red accent.
  - This replaces the current book Select dropdown entirely.
- **Chapter strip**: Replace the chapter Select dropdown with a **horizontal scrollable row of chapter number buttons** (small square/circle chips, highlighted when active). Prev/next arrows remain flanking the strip.
- **Reference header**: Make the current chapter reference (e.g. "John 3") larger and more prominent — semibold, slightly bigger text, as a section divider between navigation and content.
- Keep all existing fetch logic, error states, loading spinner, and verse display unchanged.

### Modify
- Card container: set `min-h-[500px]` (dashboard) and ensure the scroll area for verses grows to fill available space.
- Header: keep the icon + "Bible Reader" title row but make it slightly more spacious.

### Remove
- The old book `<Select>` dropdown component.
- The old chapter `<Select>` dropdown component.

## Implementation Plan
1. Add `selectedTestament` state: `'old' | 'new'`, defaulting to `'new'`.
2. Split `BIBLE_BOOKS` into `OT_BOOKS` and `NT_BOOKS` arrays.
3. Build `TestamentToggle` inline: two pill buttons (Old / New), clicking switches testament and resets to the first book of that testament.
4. Build `BookGrid` inline: scrollable grid of book name chips, 3–4 per row, selected one highlighted with df-red background.
5. Build `ChapterStrip` inline: `overflow-x-auto flex gap-1` row of small chapter chips (numbers), selected highlighted, flanked by prev/next arrow buttons.
6. Keep verse fetch logic and rendering untouched.
7. Run validate after implementation.
