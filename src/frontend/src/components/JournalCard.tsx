import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "dayflow_journal_v2";

interface GoalItem {
  text: string;
  done: boolean;
}

interface JournalData {
  thoughts: { title: string; body: string; savedAt: string } | null;
  gratitude: string[];
  prayers: string[];
  goals: GoalItem[];
  mood: string | null;
}

interface JournalCardProps {
  dateKey: string;
}

const MOODS = [
  { key: "grateful", emoji: "\uD83D\uDE4F", label: "Grateful" },
  { key: "peaceful", emoji: "\uD83D\uDE0C", label: "Peaceful" },
  { key: "tired", emoji: "\uD83D\uDE34", label: "Tired" },
  { key: "anxious", emoji: "\uD83D\uDE30", label: "Anxious" },
  { key: "joyful", emoji: "\uD83D\uDE0A", label: "Joyful" },
];

function loadData(dateStr: string): JournalData {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return (
      all[dateStr] ?? {
        thoughts: null,
        gratitude: [],
        prayers: [],
        goals: [],
        mood: null,
      }
    );
  } catch {
    return {
      thoughts: null,
      gratitude: [],
      prayers: [],
      goals: [],
      mood: null,
    };
  }
}

function persistData(dateStr: string, data: JournalData) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    all[dateStr] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* ignore */
  }
}

function useDateData(dateKey: string) {
  const [data, setData] = useState<JournalData>(() => loadData(dateKey));

  useEffect(() => {
    setData(loadData(dateKey));
  }, [dateKey]);

  const update = (patch: Partial<JournalData>) => {
    setData((prev) => {
      const next = { ...prev, ...patch };
      persistData(dateKey, next);
      return next;
    });
  };

  return { data, update };
}

// — dot indicator for tab completion —————————————————————————————————————
function Dot() {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-df-violet ml-1 mb-0.5"
      aria-hidden="true"
    />
  );
}

function hasThoughts(d: JournalData) {
  return !!d.thoughts?.title || !!d.thoughts?.body;
}

// — Thoughts tab ——————————————————————————————————————————————————————————
function ThoughtsTab({
  dateKey,
  data,
  update,
}: {
  dateKey: string;
  data: JournalData;
  update: (patch: Partial<JournalData>) => void;
}) {
  const [title, setTitle] = useState(data.thoughts?.title ?? "");
  const [body, setBody] = useState(data.thoughts?.body ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(!!data.thoughts);
  const prevDateKey = useRef(dateKey);

  // sync local state when dateKey changes (cross-day navigation)
  if (prevDateKey.current !== dateKey) {
    prevDateKey.current = dateKey;
    setTitle(data.thoughts?.title ?? "");
    setBody(data.thoughts?.body ?? "");
    setSaved(!!data.thoughts);
  }

  const handleSave = async () => {
    if (!title.trim() && !body.trim()) {
      toast.error("Write something first!");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 380));
    update({ thoughts: { title, body, savedAt: new Date().toISOString() } });
    setSaving(false);
    setSaved(true);
    toast.success("Journal entry saved!");
  };

  return (
    <div className="flex flex-col gap-3 flex-1">
      <Input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setSaved(false);
        }}
        placeholder="Give your entry a title..."
        data-ocid="journal.input"
        className="bg-white/10 border-white/10 text-white placeholder:text-white/40 text-sm h-9 focus:ring-white/20"
      />
      <Textarea
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
          setSaved(false);
        }}
        placeholder="What's on your mind today? Reflect on your goals, feelings, or moments that mattered..."
        data-ocid="journal.textarea"
        className="flex-1 bg-white/10 border-white/10 text-white placeholder:text-white/40 text-sm resize-none min-h-[120px] focus:ring-white/20"
      />
      <Button
        onClick={handleSave}
        disabled={saving}
        data-ocid="journal.save_button"
        className="bg-df-violet text-white font-semibold hover:bg-df-violet/90 h-9 text-sm"
      >
        {saving ? (
          <>
            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-1.5" />
            {saved ? "Update Entry" : "Save Entry"}
          </>
        )}
      </Button>
    </div>
  );
}

// — Bullet list tab (Gratitude / Prayers) ————————————————————————————————
function BulletListTab({
  items,
  placeholder,
  addOcid,
  inputOcid,
  itemOcid,
  deleteOcid,
  onChange,
}: {
  items: string[];
  placeholder: string;
  addOcid: string;
  inputOcid: string;
  itemOcid: string;
  deleteOcid: string;
  onChange: (next: string[]) => void;
}) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const add = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...items, trimmed]);
    setDraft("");
    inputRef.current?.focus();
  };

  const remove = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-3 flex-1">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder={placeholder}
          data-ocid={inputOcid}
          className="flex-1 bg-white/10 border-white/10 text-white placeholder:text-white/40 text-sm h-9 focus:ring-white/20"
        />
        <Button
          onClick={add}
          size="icon"
          data-ocid={addOcid}
          className="bg-df-violet/20 hover:bg-df-violet/40 text-white border border-df-violet/30 h-9 w-9 shrink-0"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[180px] pr-1">
        <AnimatePresence initial={false}>
          {items.length === 0 && (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white/35 text-xs italic py-4 text-center"
              data-ocid={`${itemOcid}.empty_state`}
            >
              Nothing added yet — type above and press Enter
            </motion.p>
          )}
          {items.map((item, idx) => (
            <motion.div
              key={`item-${idx}-${item.slice(0, 20)}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18 }}
              className="flex items-start gap-2 bg-white/[0.07] rounded-lg px-3 py-2 group"
              data-ocid={`${itemOcid}.${idx + 1}`}
            >
              <span className="text-df-violet mt-0.5 text-xs select-none">
                •
              </span>
              <span className="flex-1 text-white/90 text-sm leading-snug break-words">
                {item}
              </span>
              <button
                type="button"
                onClick={() => remove(idx)}
                data-ocid={`${deleteOcid}.${idx + 1}`}
                className="text-white/30 hover:text-white/80 transition-colors shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Remove item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// — Goals / checklist tab ———————————————————————————————————————————————
function GoalsTab({
  goals,
  onChange,
}: {
  goals: GoalItem[];
  onChange: (next: GoalItem[]) => void;
}) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const add = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...goals, { text: trimmed, done: false }]);
    setDraft("");
    inputRef.current?.focus();
  };

  const toggle = (idx: number) => {
    onChange(goals.map((g, i) => (i === idx ? { ...g, done: !g.done } : g)));
  };

  const remove = (idx: number) => {
    onChange(goals.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-3 flex-1">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add a goal for today..."
          data-ocid="journal.goals.input"
          className="flex-1 bg-white/10 border-white/10 text-white placeholder:text-white/40 text-sm h-9 focus:ring-white/20"
        />
        <Button
          onClick={add}
          size="icon"
          data-ocid="journal.goals.add_button"
          className="bg-df-violet/20 hover:bg-df-violet/40 text-white border border-df-violet/30 h-9 w-9 shrink-0"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[180px] pr-1">
        <AnimatePresence initial={false}>
          {goals.length === 0 && (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white/35 text-xs italic py-4 text-center"
              data-ocid="journal.goals.empty_state"
            >
              No goals yet — add one above
            </motion.p>
          )}
          {goals.map((goal, idx) => (
            <motion.div
              key={`goal-${idx}-${goal.text.slice(0, 20)}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2.5 bg-white/[0.07] rounded-lg px-3 py-2 group"
              data-ocid={`journal.goals.item.${idx + 1}`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                data-ocid={`journal.goals.checkbox.${idx + 1}`}
                aria-label={goal.done ? "Mark incomplete" : "Mark complete"}
                aria-pressed={goal.done}
                className="shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-all"
                style={{
                  background: goal.done
                    ? "oklch(0.62 0.22 280)"
                    : "transparent",
                  borderColor: goal.done
                    ? "oklch(0.62 0.22 280)"
                    : "oklch(1 0 0 / 0.3)",
                }}
              >
                {goal.done && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    viewBox="0 0 12 12"
                    fill="none"
                    role="img"
                    aria-label="Done"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <span
                className={`flex-1 text-sm leading-snug break-words ${
                  goal.done ? "line-through text-white/40" : "text-white/90"
                }`}
              >
                {goal.text}
              </span>
              <button
                type="button"
                onClick={() => remove(idx)}
                data-ocid={`journal.goals.delete_button.${idx + 1}`}
                className="text-white/30 hover:text-white/80 transition-colors shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Remove goal"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// — Mood tab ——————————————————————————————————————————————————————————————
function MoodTab({
  mood,
  onChange,
}: {
  mood: string | null;
  onChange: (m: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <p className="text-white/60 text-xs">How are you feeling today?</p>
      <div className="grid grid-cols-5 gap-2">
        {MOODS.map((m) => {
          const active = mood === m.key;
          return (
            <motion.button
              key={m.key}
              type="button"
              onClick={() => onChange(m.key)}
              whileTap={{ scale: 0.92 }}
              data-ocid={`journal.mood.${m.key}.toggle`}
              className={`flex flex-col items-center gap-1.5 rounded-xl py-3 px-1 border transition-all ${
                active
                  ? "bg-df-violet/20 border-df-violet shadow-[0_0_12px_oklch(0.62_0.22_280/0.3)]"
                  : "bg-white/[0.06] border-white/10 hover:bg-white/[0.12]"
              }`}
              aria-label={m.label}
              aria-pressed={active}
            >
              <span className="text-2xl leading-none">{m.emoji}</span>
              <span
                className={`text-[10px] font-medium leading-none ${
                  active ? "text-df-violet" : "text-white/50"
                }`}
              >
                {m.label}
              </span>
            </motion.button>
          );
        })}
      </div>
      {mood && (
        <motion.p
          key={mood}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/50 text-xs text-center"
        >
          Mood recorded{" "}
          <span className="text-df-violet font-medium">
            {MOODS.find((m) => m.key === mood)?.label}
          </span>
        </motion.p>
      )}
    </div>
  );
}

// — Main component ————————————————————————————————————————————————————————
export default function JournalCard({ dateKey }: JournalCardProps) {
  const { data, update } = useDateData(dateKey);

  const displayDate = new Date(`${dateKey}T00:00:00`).toLocaleDateString(
    "en-US",
    { weekday: "long", month: "long", day: "numeric" },
  );

  const tabs = [
    { value: "thoughts", label: "Thoughts", filled: hasThoughts(data) },
    {
      value: "gratitude",
      label: "Gratitude",
      filled: data.gratitude.length > 0,
    },
    { value: "prayers", label: "Prayers", filled: data.prayers.length > 0 },
    { value: "goals", label: "Goals", filled: data.goals.length > 0 },
    { value: "mood", label: "Mood", filled: !!data.mood },
  ] as const;

  return (
    <div
      className="rounded-2xl border border-df-violet/25 shadow-card card-violet-glow flex flex-col min-h-[380px] p-5 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.20 0.10 280) 0%, oklch(0.25 0.13 275) 50%, oklch(0.22 0.12 265) 100%)",
      }}
    >
      {/* Decorative glow blobs */}
      <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-df-violet/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-df-violet/15 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-1 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-df-violet-dim flex items-center justify-center ring-1 ring-df-violet/30">
          <BookOpen className="w-4 h-4 text-df-violet" />
        </div>
        <h3 className="text-sm font-semibold text-white">Daily Journal</h3>
      </div>
      <p className="text-xs text-white/50 mb-3 relative z-10">{displayDate}</p>

      {/* Tabs */}
      <Tabs
        defaultValue="thoughts"
        className="flex flex-col flex-1 relative z-10"
      >
        <TabsList
          className="flex w-full gap-0.5 mb-4 bg-white/[0.07] rounded-xl p-1 h-auto"
          data-ocid="journal.tab"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              data-ocid={`journal.${tab.value}.tab`}
              className="flex-1 text-[10px] font-medium py-1.5 px-1 rounded-lg text-white/50 data-[state=active]:bg-df-violet data-[state=active]:text-white data-[state=active]:shadow-sm transition-all leading-none"
            >
              {tab.label}
              {tab.filled && <Dot />}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="thoughts" className="flex flex-col flex-1 mt-0">
          <ThoughtsTab dateKey={dateKey} data={data} update={update} />
        </TabsContent>

        <TabsContent value="gratitude" className="flex flex-col flex-1 mt-0">
          <BulletListTab
            items={data.gratitude}
            placeholder="What are you thankful for today?"
            addOcid="journal.gratitude.add_button"
            inputOcid="journal.gratitude.input"
            itemOcid="journal.gratitude.item"
            deleteOcid="journal.gratitude.delete_button"
            onChange={(next) => update({ gratitude: next })}
          />
        </TabsContent>

        <TabsContent value="prayers" className="flex flex-col flex-1 mt-0">
          <BulletListTab
            items={data.prayers}
            placeholder="Add a prayer request..."
            addOcid="journal.prayers.add_button"
            inputOcid="journal.prayers.input"
            itemOcid="journal.prayers.item"
            deleteOcid="journal.prayers.delete_button"
            onChange={(next) => update({ prayers: next })}
          />
        </TabsContent>

        <TabsContent value="goals" className="flex flex-col flex-1 mt-0">
          <GoalsTab
            goals={data.goals}
            onChange={(next) => update({ goals: next })}
          />
        </TabsContent>

        <TabsContent value="mood" className="flex flex-col flex-1 mt-0">
          <MoodTab mood={data.mood} onChange={(m) => update({ mood: m })} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
