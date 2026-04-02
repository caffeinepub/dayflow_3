# DayFlow

## Current State
Dashboard has 7 widgets: Tasks, Journal, BibleReader, Birthday, Devotion, ChristianChecklist (Daily Faith), FitnessChecklist (Physical Wellbeing). Nav has: Dashboard, Tasks, Journal, Birthdays, Devotion, Faith, Fitness, Bible.

## Requested Changes (Diff)

### Add
- New `DailyHabitsCard` component that merges all faith items (Morning Prayer, Bible Reading, Worship/Praise, Gratitude Journal, Evening Reflection, Prayer for Others) and fitness items (Morning Walk/Run, Drink 8 Glasses of Water, Exercise/Workout, Stretch/Yoga, Sleep 8 Hours) into a single merged checklist.
- Single "Daily Habits" nav item replacing Faith and Fitness.

### Modify
- App.tsx: remove ChristianChecklistCard and FitnessChecklistCard, add DailyHabitsCard. Remove BirthdayCard from dashboard and nav. Remove Faith and Fitness nav items. Add "Habits" nav item. Update dashboard grid and nav routes.

### Remove
- ChristianChecklistCard and FitnessChecklistCard usage in App.tsx (files can remain but are unused).
- BirthdayCard widget and Birthday nav item from the dashboard.
- Faith and Fitness nav items.

## Implementation Plan
1. Create `src/frontend/src/components/DailyHabitsCard.tsx` with merged default items (faith + fitness), single localStorage key for items and done state, midnight reset, customisable (add/remove), resets at midnight.
2. Update `App.tsx`: remove BirthdayCard, ChristianChecklistCard, FitnessChecklistCard imports and usages; add DailyHabitsCard; update NAV_ITEMS to replace Faith+Fitness with Habits and remove Birthdays; remove Birthday nav route; add Habits nav route.
