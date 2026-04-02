# DayFlow

## Current State
Budget widget exists with full CRUD for income entries, expense entries, and savings goals. Data is persisted in localStorage. All interaction is via modal dialogs. Default sample data (salary, rent, etc.) is loaded when no stored data exists.

## Requested Changes (Diff)

### Add
- Inline quick-add row at the top of the Income and Expenses sections so the user can type a description + amount and press Enter or a + button without opening a modal
- Clear default sample data -- start with empty entries and goals so the user's own values are not mixed with placeholder data
- Allow editing the saved amount directly (not just adding/subtracting) in the goal update dialog, with an "Edit target" option

### Modify
- DEFAULT_ENTRIES and DEFAULT_GOALS: change to empty arrays so the widget starts blank
- GoalsSection update dialog: add option to directly set the saved amount rather than only incrementing
- Income / Expenses sections: add a compact inline form row above the list for fast entry

### Remove
- Nothing removed structurally

## Implementation Plan
1. Set DEFAULT_ENTRIES = [] and DEFAULT_GOALS = [] in BudgetCard.tsx
2. Add inline quick-add form state (inlineIncome, inlineExpense) local to BudgetCard
3. Render a compact input + amount + add button row at the top of EntriesSection, wired to a new onQuickAdd prop
4. Update goal update dialog to include a toggle between "add amount" and "set amount" modes, and also allow editing target
