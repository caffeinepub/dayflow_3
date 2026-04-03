# DayFlow — Featured Layout + Side Rail Navigation

## Current State
- Navigation is a horizontal top bar with pill-buttons (Dashboard, Tasks, Journal, Devotion, Habits, Bible)
- Dashboard uses a 3-column CSS grid (`xl:grid-cols-3`), all cards same size
- App has a sticky header containing the logo + nav pills + the full-width date/quote section below it
- All widget cards (BibleReaderCard, JournalCard, TasksCard, DailyHabitsCard, DevotionCard) are standalone components with consistent premium styling

## Requested Changes (Diff)

### Add
- Fixed left sidebar (side rail) with icons + labels, like Notion/Linear
  - Width: ~220px expanded on desktop, collapses to icon-only (~56px) on mobile/small screens
  - Items: Dashboard, Bible, Journal, Tasks, Devotion, Habits — each with icon + label
  - Active item: distinct highlight using the widget's color identity (or blue for Dashboard)
  - DayFlow logo + branding at the top of the sidebar
  - Subtle dividers and smooth hover transitions
  - Sidebar is fixed (not scrollable with content)

### Modify
- Remove horizontal nav pills from the top header entirely
- Top header becomes minimal: just the date navigator pill + live badge (quote section stays below)
- Dashboard layout changes to a **featured layout**:
  - LEFT main column (wider, ~65% width): Bible Reader card + Journal card — both taller/larger
  - RIGHT side column (~35% width): Tasks, Daily Habits, Devotion — smaller/compact cards stacked vertically
- Full-page layout: `flex flex-row` with sidebar + main content area side by side
- Main content area scrolls independently; sidebar stays fixed
- Bible Reader and Journal cards should have `min-h-[500px]` or taller to take advantage of the extra space

### Remove
- Horizontal nav pills from the header
- BirthdayAlertBanner component usage (already orphaned, references removed actor)

## Implementation Plan
1. Refactor `App.tsx` layout:
   - Outer shell: `flex flex-row min-h-screen`
   - Left: fixed sidebar component (220px desktop, icon-only on mobile)
   - Right: main area with header + content, `flex-1 overflow-y-auto`
2. Build `SideRail` component inline in App.tsx:
   - Logo at top
   - Nav items list with icon + label, active state color, hover state
   - Responsive: full labels on `lg:`, icon-only on smaller screens
3. Simplify top header: remove nav pills, keep date selector + live badge
4. Update Dashboard grid to featured layout:
   - `grid grid-cols-[1fr_380px]` or similar two-column split
   - Left column: `<BibleReaderCard />` and `<JournalCard />` stacked, each with `min-h-[520px]`
   - Right column: `<TasksCard />`, `<DailyHabitsCard />`, `<DevotionCard />` stacked
5. Remove `BirthdayAlertBanner` and its related imports/query
6. Ensure all individual tab views (Tasks, Journal, etc.) still render full-width when selected from sidebar
