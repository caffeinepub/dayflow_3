import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface CalEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  createdAt: number;
}

const STORAGE_KEY = "dayflow_events";

const DEFAULT_EVENTS: CalEvent[] = [
  {
    id: "e1",
    title: "Team standup",
    date: new Date().toISOString().slice(0, 10),
    time: "09:00",
    createdAt: 1,
  },
  {
    id: "e2",
    title: "Dentist appointment",
    date: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    time: "14:30",
    createdAt: 2,
  },
  {
    id: "e3",
    title: "Lunch with Sarah",
    date: new Date(Date.now() + 86400000 * 4).toISOString().slice(0, 10),
    time: "12:00",
    createdAt: 3,
  },
];

export default function EventsCard() {
  const [events, setEvents] = useState<CalEvent[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_EVENTS;
    } catch {
      return DEFAULT_EVENTS;
    }
  });
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", time: "" });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (!form.title.trim() || !form.date) return;
    setEvents((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...form, createdAt: Date.now() },
    ]);
    setForm({ title: "", date: "", time: "" });
    setAdding(false);
  };

  const remove = (id: string) =>
    setEvents((prev) => prev.filter((e) => e.id !== id));

  const sorted = [...events].sort(
    (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
  );
  const today = new Date().toISOString().slice(0, 10);

  const formatDate = (dateStr: string) => {
    const d = new Date(`${dateStr}T00:00:00`);
    return {
      day: d.getDate(),
      month: d.toLocaleString("en-US", { month: "short" }),
    };
  };

  const isPast = (dateStr: string) => dateStr < today;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-df-navy-mid shadow-card card-glow flex flex-col h-full min-h-[340px] p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-df-orange-dim flex items-center justify-center">
          <Calendar className="w-4 h-4 text-df-orange" />
        </div>
        <h3 className="text-sm font-semibold text-df-text">Upcoming Events</h3>
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          data-ocid="events.open_modal_button"
          className="ml-auto p-1.5 rounded-lg bg-df-teal-dim text-df-teal hover:bg-df-teal/20 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-4"
          >
            <div className="flex flex-col gap-2 p-3 bg-df-navy-light rounded-xl border border-white/[0.06]">
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Event title..."
                data-ocid="events.input"
                className="bg-df-navy-mid border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-8"
              />
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  data-ocid="events.date.input"
                  className="flex-1 bg-df-navy-mid border-white/[0.06] text-df-text text-sm h-8 [color-scheme:dark]"
                />
                <Input
                  type="time"
                  value={form.time}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, time: e.target.value }))
                  }
                  data-ocid="events.time.input"
                  className="flex-1 bg-df-navy-mid border-white/[0.06] text-df-text text-sm h-8 [color-scheme:dark]"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={addEvent}
                  size="sm"
                  className="flex-1 bg-df-teal text-df-navy font-medium hover:bg-df-teal/90 h-8 text-xs"
                  data-ocid="events.submit_button"
                >
                  Add Event
                </Button>
                <Button
                  type="button"
                  onClick={() => setAdding(false)}
                  variant="outline"
                  size="sm"
                  className="border-white/10 bg-transparent text-df-text-muted hover:text-df-text h-8 text-xs"
                  data-ocid="events.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Events list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2">
        <AnimatePresence initial={false}>
          {sorted.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-df-text-muted text-sm"
              data-ocid="events.empty_state"
            >
              No upcoming events. Add one!
            </motion.div>
          )}
          {sorted.map((event, i) => {
            const { day, month } = formatDate(event.date);
            const past = isPast(event.date);
            const isToday = event.date === today;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 group rounded-xl px-2 py-2.5 hover:bg-white/[0.03] transition-colors"
                data-ocid={`events.item.${i + 1}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${
                    isToday
                      ? "bg-df-teal-dim border border-df-teal/30"
                      : past
                        ? "bg-white/[0.03] border border-white/[0.06]"
                        : "bg-df-orange-dim border border-df-orange/20"
                  }`}
                >
                  <span
                    className={`text-xs font-bold leading-none ${
                      isToday
                        ? "text-df-teal"
                        : past
                          ? "text-df-text-muted"
                          : "text-df-orange"
                    }`}
                  >
                    {day}
                  </span>
                  <span
                    className={`text-[9px] font-medium uppercase ${
                      isToday
                        ? "text-df-teal/70"
                        : past
                          ? "text-df-text-muted/70"
                          : "text-df-orange/70"
                    }`}
                  >
                    {month}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${past ? "text-df-text-muted" : "text-df-text"}`}
                  >
                    {event.title}
                  </p>
                  {event.time && (
                    <p className="text-xs text-df-text-muted flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </p>
                  )}
                </div>

                {isToday && (
                  <span className="text-[10px] bg-df-teal-dim text-df-teal rounded-full px-2 py-0.5 font-medium flex-shrink-0">
                    Today
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => remove(event.id)}
                  data-ocid={`events.delete_button.${i + 1}`}
                  className="opacity-0 group-hover:opacity-100 text-df-text-muted hover:text-df-red transition-all p-1 flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
