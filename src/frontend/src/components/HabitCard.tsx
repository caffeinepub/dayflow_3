import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flame, Plus, Trash2, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Habit {
  id: string;
  name: string;
  emoji: string;
  completions: string[];
}

const STORAGE_KEY = "dayflow_habits";
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function getWeekDates(): string[] {
  const today = new Date();
  const dow = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dow + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

const DEFAULT_HABITS: Habit[] = [
  { id: "1", name: "Morning run", emoji: "\uD83C\uDFC3", completions: [] },
  { id: "2", name: "Read 30 min", emoji: "\uD83D\uDCDA", completions: [] },
  { id: "3", name: "Meditate", emoji: "\uD83E\uDDD8", completions: [] },
];

export default function HabitCard() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_HABITS;
    } catch {
      return DEFAULT_HABITS;
    }
  });
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("\u2B50");

  const weekDates = getWeekDates();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const toggle = (habitId: string, dateStr: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const has = h.completions.includes(dateStr);
        return {
          ...h,
          completions: has
            ? h.completions.filter((d) => d !== dateStr)
            : [...h.completions, dateStr],
        };
      }),
    );
  };

  const addHabit = () => {
    const name = newName.trim();
    if (!name) return;
    setHabits((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, emoji: newEmoji, completions: [] },
    ]);
    setNewName("");
    setNewEmoji("\u2B50");
    setAdding(false);
  };

  const removeHabit = (id: string) =>
    setHabits((prev) => prev.filter((h) => h.id !== id));

  const getStreak = (habit: Habit) => {
    const today = new Date();
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const ds = d.toISOString().slice(0, 10);
      if (habit.completions.includes(ds)) streak++;
      else break;
    }
    return streak;
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-df-navy-mid shadow-card card-glow flex flex-col h-full min-h-[340px] p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-df-green-dim flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-df-green" />
        </div>
        <h3 className="text-sm font-semibold text-df-text">Habit Tracker</h3>
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          data-ocid="habit.open_modal_button"
          className="ml-auto p-1.5 rounded-lg bg-df-teal-dim text-df-teal hover:bg-df-teal/20 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {adding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={(e) => {
              e.preventDefault();
              addHabit();
            }}
            className="flex gap-2 mb-4 overflow-hidden"
          >
            <Input
              value={newEmoji}
              onChange={(e) => setNewEmoji(e.target.value)}
              className="w-12 bg-df-navy-light border-white/[0.06] text-center text-df-text text-sm h-9 px-2"
            />
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Habit name..."
              data-ocid="habit.input"
              className="flex-1 bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-9"
            />
            <Button
              type="submit"
              size="sm"
              className="bg-df-teal text-df-navy font-medium hover:bg-df-teal/90 h-9 px-3"
              data-ocid="habit.submit_button"
            >
              Add
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Header row */}
      <div className="grid grid-cols-[1fr_auto] gap-2 mb-2">
        <span className="text-xs text-df-text-muted">Habit</span>
        <div className="flex gap-1">
          {DAYS.map((d) => (
            <span
              key={d}
              className="w-7 text-center text-[10px] text-df-text-muted font-medium"
            >
              {d}
            </span>
          ))}
          <span className="w-10 text-center text-[10px] text-df-text-muted font-medium">
            \uD83D\uDD25
          </span>
        </div>
      </div>

      {/* Habit rows */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2">
        <AnimatePresence initial={false}>
          {habits.length === 0 && (
            <div
              className="text-center py-8 text-df-text-muted text-sm"
              data-ocid="habit.empty_state"
            >
              No habits yet. Add one!
            </div>
          )}
          {habits.map((habit, idx) => {
            const streak = getStreak(habit);
            return (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-[1fr_auto] gap-2 items-center group"
                data-ocid={`habit.item.${idx + 1}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base flex-shrink-0">{habit.emoji}</span>
                  <span className="text-xs text-df-text truncate">
                    {habit.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeHabit(habit.id)}
                    data-ocid={`habit.delete_button.${idx + 1}`}
                    className="opacity-0 group-hover:opacity-100 text-df-text-muted hover:text-df-red transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex gap-1 items-center">
                  {weekDates.map((date, di) => {
                    const done = habit.completions.includes(date);
                    return (
                      <motion.button
                        key={date}
                        type="button"
                        whileTap={{ scale: 0.8 }}
                        onClick={() => toggle(habit.id, date)}
                        data-ocid={`habit.checkbox.${idx + 1}`}
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-200 ${
                          done
                            ? "bg-df-green border-df-green"
                            : "border-white/10 hover:border-df-green/50"
                        }`}
                        title={DAYS[di]}
                      >
                        {done && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-[10px] text-df-navy font-bold"
                          >
                            ✓
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                  <div className="w-10 flex items-center justify-center gap-0.5">
                    {streak > 0 && <Flame className="w-3 h-3 text-df-orange" />}
                    <span className="text-xs font-medium text-df-orange">
                      {streak > 0 ? streak : ""}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
