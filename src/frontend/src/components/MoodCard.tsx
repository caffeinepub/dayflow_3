import { ChevronLeft, ChevronRight, Smile } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const MOODS = [
  { emoji: "\uD83D\uDE0A", label: "Happy", color: "oklch(0.78 0.14 185)" },
  { emoji: "\uD83D\uDE10", label: "Neutral", color: "oklch(0.75 0.18 50)" },
  { emoji: "\uD83D\uDE22", label: "Sad", color: "oklch(0.60 0.12 240)" },
  { emoji: "\uD83D\uDE21", label: "Angry", color: "oklch(0.62 0.22 25)" },
  { emoji: "\uD83D\uDE34", label: "Tired", color: "oklch(0.47 0.22 275)" },
];

const STORAGE_KEY = "dayflow_moods";

function loadMoods(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function MoodCard() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [moods, setMoods] = useState<Record<string, number>>(loadMoods);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const dateKey = (d: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const setMood = (d: number, moodIdx: number) => {
    const k = dateKey(d);
    const next = { ...moods, [k]: moodIdx };
    setMoods(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const todayDay =
    today.getMonth() === month && today.getFullYear() === year
      ? today.getDate()
      : -1;

  // Empty spacer cells for days before month start
  const emptyKeys = Array.from(
    { length: firstDay },
    (_, i) => `empty-${year}-${month}-${i}`,
  );

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-df-navy-mid shadow-card card-glow flex flex-col h-full min-h-[340px] p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-df-purple-dim flex items-center justify-center">
          <Smile className="w-4 h-4 text-df-purple" />
        </div>
        <h3 className="text-sm font-semibold text-df-text">Mood Tracker</h3>
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => {
            if (month === 0) {
              setMonth(11);
              setYear((y) => y - 1);
            } else setMonth((m) => m - 1);
          }}
          data-ocid="mood.pagination_prev"
          className="p-1 rounded text-df-text-muted hover:text-df-text transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-medium text-df-text">{monthName}</span>
        <button
          type="button"
          onClick={() => {
            if (month === 11) {
              setMonth(0);
              setYear((y) => y + 1);
            } else setMonth((m) => m + 1);
          }}
          data-ocid="mood.pagination_next"
          className="p-1 rounded text-df-text-muted hover:text-df-text transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] text-df-text-muted font-medium py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5 flex-1">
        {emptyKeys.map((k) => (
          <div key={k} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const dk = dateKey(d);
          const moodIdx = moods[dk] ?? -1;
          const mood = moodIdx >= 0 ? MOODS[moodIdx] : null;
          const isToday = d === todayDay;
          return (
            <motion.button
              key={d}
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={() => setMood(d, (moodIdx + 1) % MOODS.length)}
              onContextMenu={(e) => {
                e.preventDefault();
                setMood(d, (moodIdx + 1) % MOODS.length);
              }}
              data-ocid={`mood.item.${d}`}
              title={`${d}: ${mood ? mood.label : "No mood"} \u2014 click to cycle`}
              className={`aspect-square rounded-md flex items-center justify-center text-[11px] relative transition-all ${
                isToday ? "ring-1 ring-df-teal" : ""
              } hover:ring-1 hover:ring-white/20`}
              style={{ background: mood ? `${mood.color}22` : undefined }}
            >
              {mood ? (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={moodIdx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-base"
                  >
                    {mood.emoji}
                  </motion.span>
                </AnimatePresence>
              ) : (
                <span
                  className={`text-[10px] font-medium ${isToday ? "text-df-teal" : "text-df-text-muted"}`}
                >
                  {d}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        {MOODS.map((m) => (
          <span
            key={m.label}
            className="text-xs text-df-text-muted flex items-center gap-1"
          >
            <span>{m.emoji}</span>
            {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}
