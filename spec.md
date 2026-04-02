# DayFlow

## Current State
DayFlow is a personal daily dashboard with the following widgets: Tasks, Journal, Events, Birthdays, and Daily Devotion. The app uses localStorage for persistence, has day navigation (prev/next arrows), and all major widgets are day-specific (Tasks, Journal, Events, Devotion). The app is public, no sign-in required.

Existing component files:
- `src/frontend/src/App.tsx` — main layout, nav, day navigation
- `src/frontend/src/components/TasksCard.tsx` — day-specific tasks with localStorage key `dayflow_tasks_${dateKey}`
- `src/frontend/src/components/DevotionCard.tsx` — 365-day devotion
- `src/frontend/src/components/JournalCard.tsx` — day-specific journal
- `src/frontend/src/components/EventsCard.tsx` — day-specific events
- `src/frontend/src/components/BirthdayCard.tsx` — static birthdays list

Nav items: Dashboard, Tasks, Journal, Birthdays, Devotion

## Requested Changes (Diff)

### Add
1. **ChristianChecklistCard** (`src/frontend/src/components/ChristianChecklistCard.tsx`)
   - Default checklist items: Morning Prayer, Bible Reading, Worship / Praise, Gratitude Journal, Evening Reflection, Prayer for Others
   - User can add custom items and delete items
   - Checklist state (checked/unchecked) resets automatically every midnight
   - Uses localStorage key `dayflow_christian_checklist_items` for the item list (persists across days)
   - Uses localStorage key `dayflow_christian_checklist_done_${todayDateKey}` for today's done state only
   - On load, if the stored done-state date key does not match today, clear it (midnight reset logic)
   - Progress bar showing completion percentage
   - Beautiful, warm spiritual design feel (gold/amber tones for accent)

2. **FitnessChecklistCard** (`src/frontend/src/components/FitnessChecklistCard.tsx`)
   - Default checklist items: Morning Walk, Drink 8 Glasses of Water, Exercise / Workout, Stretch / Yoga, Sleep 8 Hours
   - User can add custom items and delete items
   - Checklist state resets automatically every midnight (same logic as Christian checklist)
   - Uses localStorage key `dayflow_fitness_checklist_items` for item list
   - Uses localStorage key `dayflow_fitness_checklist_done_${todayDateKey}` for today's done state
   - Progress bar showing completion percentage
   - Fresh, energetic design feel (green tones for accent)

3. **Nav items** — Add "Faith" and "Fitness" nav tabs to the navigation bar in App.tsx
   - Faith tab: shows ChristianChecklistCard
   - Fitness tab: shows FitnessChecklistCard

4. **Dashboard** — Both new widgets appear on the Dashboard view alongside existing widgets

### Modify
- `src/frontend/src/App.tsx`:
  - Import ChristianChecklistCard and FitnessChecklistCard
  - Add "Faith" (Heart icon) and "Fitness" (Activity icon or Dumbbell) to NAV_ITEMS
  - Render ChristianChecklistCard in Dashboard grid and in "Faith" nav view
  - Render FitnessChecklistCard in Dashboard grid and in "Fitness" nav view

### Remove
- Nothing removed

## Implementation Plan
1. Create `ChristianChecklistCard.tsx` with midnight-reset logic, default items, add/delete custom items, progress bar
2. Create `FitnessChecklistCard.tsx` with same structure but fitness items and green accent
3. Update `App.tsx` to import new cards, add nav items, and render them in Dashboard and individual views
