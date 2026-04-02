# DayFlow

## Current State
DayFlow is a personal daily dashboard with five widgets: Tasks, Journal, Events, Birthdays, and Devotion. All data is stored in localStorage. Tasks and Events use a flat storage key (all data together). Journal uses date-keyed storage per day (e.g. `dayflow_journal["2026-04-02"]`). DevotionCard picks a verse based on the day of the year. All widgets always show today's data. There is no way to navigate to a different day.

App.tsx computes `dateStr` and `dayOfYear` from `new Date()` at render time. These are not passed to child widgets -- each widget computes its own current date.

## Requested Changes (Diff)

### Add
- Day navigation bar in App.tsx: previous/next arrow buttons + a date display showing the currently viewed date
- A `selectedDate` state (Date object) in App.tsx, defaulting to today
- Pass `selectedDate` (as ISO date string `YYYY-MM-DD`) as a prop to TasksCard, JournalCard, EventsCard, and DevotionCard
- TasksCard: change storage key to be date-specific (`dayflow_tasks_YYYY-MM-DD`), load/save tasks per date
- JournalCard: already date-keyed; accept `dateKey` prop instead of computing `getTodayStr()` internally
- EventsCard: change to show only events for the selected date (filter by date); tasks/event add form should default to the selected date
- DevotionCard: accept `dayOfYear` prop (computed from selectedDate) instead of computing it internally

### Modify
- App.tsx: add `selectedDate` state + navigation controls in the page heading area (below or alongside the date string); update dateStr to reflect selectedDate not today; pass selectedDate to widgets
- TasksCard: accept `dateKey: string` prop; change STORAGE_KEY usage to be per-day
- JournalCard: accept `dateKey: string` prop; use it instead of `getTodayStr()`
- EventsCard: accept `selectedDate: string` prop; filter events list to show only that date's events; default new event form date to selectedDate
- DevotionCard: accept `dayOfYear: number` prop

### Remove
- Nothing removed

## Implementation Plan
1. In App.tsx:
   - Add `selectedDate: Date` state, default `new Date()`
   - Compute `dateKey` (ISO string `YYYY-MM-DD`) from selectedDate
   - Compute `dayOfYear` from selectedDate
   - Replace hardcoded `now` references with selectedDate for dateStr and dayOfYear
   - Add prev/next day buttons alongside the date heading
   - Pass `dateKey` to TasksCard, JournalCard, EventsCard; pass `dayOfYear` to DevotionCard
2. TasksCard: accept `dateKey` prop; use `dayflow_tasks_${dateKey}` as storage key; reload from storage when dateKey changes
3. JournalCard: accept `dateKey` prop; replace all `today`/`getTodayStr()` usage with prop value; reload when dateKey changes
4. EventsCard: accept `selectedDate` prop; filter displayed events to only those matching selectedDate; default form date field to selectedDate
5. DevotionCard: accept `dayOfYear` prop; use it to pick the verse instead of computing internally
