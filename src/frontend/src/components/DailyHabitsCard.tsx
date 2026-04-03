import { Input } from "@/components/ui/input";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DEFAULT_ITEMS = [
  "Morning Prayer",
  "Bible Reading",
  "Worship / Praise",
  "Gratitude Journal",
  "Evening Reflection",
  "Prayer for Others",
  "Morning Walk / Run",
  "Drink 8 Glasses of Water",
  "Exercise / Workout",
  "Stretch / Yoga",
  "Sleep 8 Hours",
];

const ITEMS_KEY = "dayflow_habits_items";
const DONE_KEY = (dateKey: string) => `dayflow_habits_done_${dateKey}`;

const EMERALD = "oklch(0.72 0.18 158)";
const EMERALD_DIM = "oklch(0.72 0.18 158 / 0.15)";
const EMERALD_BANNER = "oklch(0.72 0.18 158 / 0.12)";

type EditEntry = { id: number; value: string };

let editIdCounter = 0;
function makeEditEntries(items: string[]): EditEntry[] {
  return items.map((value) => ({ id: editIdCounter++, value }));
}

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadItems(): string[] {
  try {
    const stored = localStorage.getItem(ITEMS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_ITEMS;
  } catch {
    return DEFAULT_ITEMS;
  }
}

function loadDone(dateKey: string): Record<string, boolean> {
  try {
    const stored = localStorage.getItem(DONE_KEY(dateKey));
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export default function DailyHabitsCard() {
  const todayKey = getTodayKey();
  const [items, setItems] = useState<string[]>(loadItems);
  const [done, setDone] = useState<Record<string, boolean>>(() =>
    loadDone(todayKey),
  );
  const [newItem, setNewItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editEntries, setEditEntries] = useState<EditEntry[]>([]);
  const lastDateRef = useRef(todayKey);

  // Midnight auto-reset: if day changes while app is open
  useEffect(() => {
    const interval = setInterval(() => {
      const current = getTodayKey();
      if (current !== lastDateRef.current) {
        lastDateRef.current = current;
        setDone({});
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Persist items list
  useEffect(() => {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  }, [items]);

  // Persist done state for today
  useEffect(() => {
    localStorage.setItem(DONE_KEY(todayKey), JSON.stringify(done));
  }, [done, todayKey]);

  const toggleItem = (item: string) => {
    setDone((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const addItem = () => {
    const trimmed = newItem.trim();
    if (!trimmed || items.includes(trimmed)) return;
    setItems((prev) => [...prev, trimmed]);
    setNewItem("");
  };

  const enterEditMode = () => {
    setEditEntries(makeEditEntries(items));
    setIsEditing(true);
  };

  const exitEditMode = () => {
    // Commit edits: filter blanks, deduplicate
    const seen = new Set<string>();
    const committed: string[] = [];
    for (const entry of editEntries) {
      const trimmed = entry.value.trim();
      if (trimmed && !seen.has(trimmed)) {
        seen.add(trimmed);
        committed.push(trimmed);
      }
    }

    // Clean up done state: keep only items whose name is unchanged
    setDone((prev) => {
      const next: Record<string, boolean> = {};
      for (const item of committed) {
        if (prev[item]) next[item] = true;
      }
      return next;
    });

    setItems(committed);
    setIsEditing(false);
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setEditEntries((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  const moveDown = (idx: number) => {
    setEditEntries((prev) => {
      if (idx === prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };

  const removeEditItem = (idx: number) => {
    setEditEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateEditValue = (id: number, value: string) => {
    setEditEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, value } : entry)),
    );
  };

  const doneCount = items.filter((i) => done[i]).length;
  const pct = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  return (
    <div className="rounded-2xl border border-[oklch(0.72_0.18_158/0.25)] bg-gradient-to-br from-df-navy-mid to-[oklch(0.16_0.06_158)] shadow-card card-emerald-glow flex flex-col h-full min-h-[340px] p-5 relative overflow-hidden">
      {/* Glow blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[oklch(0.72_0.18_158/0.08)] blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-4 relative">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{
            background: EMERALD_DIM,
            boxShadow: "0 0 0 1px oklch(0.72 0.18 158 / 0.3)",
          }}
        >
          <Star className="w-4 h-4" style={{ color: EMERALD }} />
        </div>
        <h3 className="text-sm font-semibold text-df-text">Daily Habits</h3>
        {!isEditing && (
          <span className="ml-auto text-xs text-df-text-muted">
            {doneCount}/{items.length}
          </span>
        )}
        {isEditing && <span className="ml-auto" />}
        <button
          type="button"
          onClick={isEditing ? exitEditMode : enterEditMode}
          data-ocid={isEditing ? "habits.save_button" : "habits.edit_button"}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150"
          style={{
            background: isEditing ? EMERALD_DIM : "oklch(1 0 0 / 0.04)",
            color: isEditing ? EMERALD : "oklch(0.67 0.05 240)",
            border: isEditing
              ? "1px solid oklch(0.72 0.18 158 / 0.3)"
              : "1px solid oklch(1 0 0 / 0.06)",
          }}
          aria-label={isEditing ? "Save edits" : "Edit habits"}
        >
          {isEditing ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Done
            </>
          ) : (
            <>
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </>
          )}
        </button>
      </div>

      {/* Progress bar (hidden while editing) */}
      {!isEditing && (
        <div className="h-1.5 rounded-full bg-df-navy-light mb-4 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: EMERALD }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      {/* Completion banner */}
      <AnimatePresence>
        {!isEditing && pct === 100 && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-3 text-center text-xs font-medium rounded-lg py-1.5 px-3"
            style={{
              background: EMERALD_BANNER,
              color: EMERALD,
            }}
          >
            ✨ All done! Keep shining today.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit mode hint */}
      <AnimatePresence>
        {isEditing && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-df-text-muted mb-3"
          >
            Rename, reorder, or remove habits. Tap Done to save.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Checklist / Edit list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-1.5 mb-4">
        <AnimatePresence initial={false}>
          {/* Normal mode — empty state */}
          {!isEditing && items.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6 text-df-text-muted text-sm"
              data-ocid="habits.empty_state"
            >
              Add your first habit below.
            </motion.div>
          )}

          {/* Normal mode — item list */}
          {!isEditing &&
            items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/[0.03] transition-colors"
                data-ocid={`habits.item.${i + 1}`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item)}
                  data-ocid={`habits.checkbox.${i + 1}`}
                  className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    backgroundColor: done[item] ? EMERALD : "transparent",
                    borderColor: done[item] ? EMERALD : "rgba(255,255,255,0.2)",
                  }}
                  aria-label={`Toggle ${item}`}
                >
                  {done[item] && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-label="Checked"
                    >
                      <title>Checked</title>
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="oklch(0.12 0.035 240)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}
                </button>
                <span
                  className={`flex-1 text-sm transition-all duration-300 ${
                    done[item]
                      ? "text-df-text-muted line-through"
                      : "text-df-text"
                  }`}
                >
                  {item}
                </span>
              </motion.div>
            ))}

          {/* Edit mode — entry list */}
          {isEditing &&
            editEntries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 rounded-xl px-2 py-1.5 bg-white/[0.03] border border-white/[0.04]"
                data-ocid={`habits.item.${i + 1}`}
              >
                {/* Reorder buttons */}
                <div className="flex flex-col gap-0.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => moveUp(i)}
                    disabled={i === 0}
                    className="p-0.5 rounded transition-colors disabled:opacity-20 text-df-text-muted hover:text-df-text"
                    aria-label="Move up"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(i)}
                    disabled={i === editEntries.length - 1}
                    className="p-0.5 rounded transition-colors disabled:opacity-20 text-df-text-muted hover:text-df-text"
                    aria-label="Move down"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>

                {/* Inline text input */}
                <Input
                  value={entry.value}
                  onChange={(e) => updateEditValue(entry.id, e.target.value)}
                  className="flex-1 bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-8 px-2"
                  aria-label={`Edit habit ${i + 1}`}
                />

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => removeEditItem(i)}
                  data-ocid={`habits.delete_button.${i + 1}`}
                  className="p-1.5 rounded-lg text-df-text-muted hover:text-df-red hover:bg-white/[0.06] transition-all duration-150 flex-shrink-0"
                  aria-label={`Remove habit ${i + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Add custom item — always visible */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addItem();
        }}
        className="flex gap-2"
      >
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a habit..."
          data-ocid="habits.input"
          className="flex-1 bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-9"
        />
        <button
          type="submit"
          data-ocid="habits.add_button"
          className="h-9 w-9 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
          style={{
            background: EMERALD_DIM,
            color: EMERALD,
          }}
          aria-label="Add habit"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
