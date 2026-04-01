import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Loader2, Save } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "dayflow_journal";

function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

interface JournalEntry {
  title: string;
  body: string;
  savedAt: string;
}

function loadEntry(dateStr: string): JournalEntry | null {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return data[dateStr] ?? null;
  } catch {
    return null;
  }
}

function saveEntry(dateStr: string, entry: JournalEntry) {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    data[dateStr] = entry;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export default function JournalCard() {
  const today = getTodayStr();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const entry = loadEntry(today);
    if (entry) {
      setTitle(entry.title);
      setBody(entry.body);
      setSaved(true);
    }
  }, [today]);

  const handleSave = async () => {
    if (!title.trim() && !body.trim()) {
      toast.error("Write something first!");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    saveEntry(today, { title, body, savedAt: new Date().toISOString() });
    setSaving(false);
    setSaved(true);
    toast.success("Journal entry saved!");
  };

  const displayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="rounded-2xl border border-white/[0.08] shadow-card card-glow flex flex-col h-full min-h-[340px] p-5 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.32 0.14 275) 0%, oklch(0.40 0.18 275) 100%)",
      }}
    >
      {/* Decorative glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-df-purple/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-df-teal/20 blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-1 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-semibold text-white">Daily Journal</h3>
        {saved && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-auto text-[10px] bg-white/10 text-white/70 rounded-full px-2 py-0.5"
          >
            Saved ✓
          </motion.span>
        )}
      </div>

      <p className="text-xs text-white/50 mb-4 relative z-10">{displayDate}</p>

      <div className="flex flex-col gap-3 flex-1 relative z-10">
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
          className="flex-1 bg-white/10 border-white/10 text-white placeholder:text-white/40 text-sm resize-none min-h-[120px] scrollbar-thin focus:ring-white/20"
        />
        <Button
          onClick={handleSave}
          disabled={saving}
          data-ocid="journal.save_button"
          className="bg-df-teal text-df-navy font-semibold hover:bg-df-teal/90 h-9 text-sm"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-1.5" />
              Save Entry
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
