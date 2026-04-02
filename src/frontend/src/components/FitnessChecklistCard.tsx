import { Input } from "@/components/ui/input";
import { Activity, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DEFAULT_ITEMS = [
  "Morning Walk / Run",
  "Drink 8 Glasses of Water",
  "Exercise / Workout",
  "Stretch / Yoga",
  "Sleep 8 Hours",
];

const ITEMS_KEY = "dayflow_fitness_items";
const DONE_KEY = (dateKey: string) => `dayflow_fitness_done_${dateKey}`;

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

export default function FitnessChecklistCard() {
  const todayKey = getTodayKey();
  const [items, setItems] = useState<string[]>(loadItems);
  const [done, setDone] = useState<Record<string, boolean>>(() =>
    loadDone(todayKey),
  );
  const [newItem, setNewItem] = useState("");
  const lastDateRef = useRef(todayKey);

  // Midnight auto-reset: if day changes while app is open
  useEffect(() => {
    const interval = setInterval(() => {
      const current = getTodayKey();
      if (current !== lastDateRef.current) {
        lastDateRef.current = current;
        setDone({});
      }
    }, 30000); // check every 30s
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

  const removeItem = (item: string) => {
    setItems((prev) => prev.filter((i) => i !== item));
    setDone((prev) => {
      const next = { ...prev };
      delete next[item];
      return next;
    });
  };

  const doneCount = items.filter((i) => done[i]).length;
  const pct = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-df-navy-mid shadow-card card-glow flex flex-col h-full min-h-[340px] p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "oklch(0.72 0.17 145 / 0.15)" }}
        >
          <Activity
            className="w-4 h-4"
            style={{ color: "oklch(0.72 0.17 145)" }}
          />
        </div>
        <h3 className="text-sm font-semibold text-df-text">
          Physical Wellbeing
        </h3>
        <span className="ml-auto text-xs text-df-text-muted">
          {doneCount}/{items.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-df-navy-light mb-4 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "oklch(0.72 0.17 145)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {pct === 100 && items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-3 text-center text-xs font-medium rounded-lg py-1.5 px-3"
          style={{
            background: "oklch(0.72 0.17 145 / 0.12)",
            color: "oklch(0.72 0.17 145)",
          }}
        >
          💪 Crushed it! Your body thanks you.
        </motion.div>
      )}

      {/* Checklist */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-1.5 mb-4">
        <AnimatePresence initial={false}>
          {items.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6 text-df-text-muted text-sm"
              data-ocid="fitness.empty_state"
            >
              Add your first fitness goal below.
            </motion.div>
          )}
          {items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 group rounded-xl px-3 py-2.5 hover:bg-white/[0.03] transition-colors"
              data-ocid={`fitness.item.${i + 1}`}
            >
              <button
                type="button"
                onClick={() => toggleItem(item)}
                data-ocid={`fitness.checkbox.${i + 1}`}
                className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  backgroundColor: done[item]
                    ? "oklch(0.72 0.17 145)"
                    : "transparent",
                  borderColor: done[item]
                    ? "oklch(0.72 0.17 145)"
                    : "rgba(255,255,255,0.2)",
                }}
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
              <button
                type="button"
                onClick={() => removeItem(item)}
                data-ocid={`fitness.delete_button.${i + 1}`}
                className="opacity-0 group-hover:opacity-100 text-df-text-muted hover:text-df-red transition-all duration-150 p-1"
                aria-label={`Remove ${item}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add custom item */}
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
          placeholder="Add a fitness goal..."
          data-ocid="fitness.input"
          className="flex-1 bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-9"
        />
        <button
          type="submit"
          data-ocid="fitness.add_button"
          className="h-9 w-9 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
          style={{
            background: "oklch(0.72 0.17 145 / 0.18)",
            color: "oklch(0.72 0.17 145)",
          }}
          aria-label="Add fitness goal"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
