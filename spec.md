# DayFlow

## Current State
The Bible Reader (`BibleReaderCard.tsx`) has:
- Book/chapter dropdowns with prev/next navigation
- A search bar that does local keyword matching within the current chapter
- Reference detection (e.g. "John 3:16")
- Google fallback for no results

## Requested Changes (Diff)

### Add
- **Scriptural keyword suggestions**: As the user types in the search bar, display a dropdown panel of matching scriptural keywords (e.g. "Grace", "Faith", "Redemption", "Love") with short theological definitions
- **Related scripture suggestions**: Below or alongside keyword suggestions, show a list of curated Bible verse references related to the typed word (e.g. typing "grace" shows Ephesians 2:8, Romans 5:1, John 1:17, etc.) — clickable to jump to that verse
- A rich curated dictionary of 60+ scriptural keywords covering common theological terms, each with:
  - The keyword
  - A short 1-2 sentence definition
  - 3-5 related Bible references

### Modify
- The search panel now shows three sections when typing:
  1. **Scriptural Keywords** — matching keywords with their definitions
  2. **Related Scriptures** — clickable verse references for matching keywords
  3. **Chapter matches** — existing local chapter search (if applicable)
  4. **Google fallback** — always shown
- The search placeholder updated to reflect the new intelligence

### Remove
- Nothing removed

## Implementation Plan
1. Create a `SCRIPTURAL_KEYWORDS` dictionary (60+ entries) in `BibleReaderCard.tsx` with `{ keyword, definition, references: [{book, chapter, verse, label}] }`
2. On each keystroke, filter keywords that match the query (by keyword name or synonym)
3. Display matching keywords in a "Scriptural Keywords" section with definitions
4. Display related scripture references as clickable buttons that navigate the reader
5. Keep existing reference detection, local chapter matches, and Google fallback
6. Style the new panels to match the sky-blue card identity
