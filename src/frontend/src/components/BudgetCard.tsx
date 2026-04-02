import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Edit2,
  Minus,
  PiggyBank,
  Plus,
  Target,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────

type Period = "daily" | "weekly" | "monthly";

interface BudgetEntry {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  category?: string;
  date: string; // ISO date string YYYY-MM-DD
}

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  saved: number;
}

type ActiveSection = "overview" | "income" | "expenses" | "savings";

// ─── Constants ──────────────────────────────────────────────────────────────

const STORAGE_KEY_ENTRIES = "dayflow_budget_entries";
const STORAGE_KEY_GOALS = "dayflow_budget_goals";

const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Health",
  "Entertainment",
  "Shopping",
  "Savings",
  "Other",
];

const CATEGORY_COLORS: Record<string, string> = {
  Food: "text-orange-400",
  Transport: "text-blue-400",
  Bills: "text-red-400",
  Health: "text-green-400",
  Entertainment: "text-purple-400",
  Shopping: "text-pink-400",
  Savings: "text-df-teal",
  Other: "text-df-text-muted",
};

const CATEGORY_BG: Record<string, string> = {
  Food: "bg-orange-400/10",
  Transport: "bg-blue-400/10",
  Bills: "bg-red-400/10",
  Health: "bg-green-400/10",
  Entertainment: "bg-purple-400/10",
  Shopping: "bg-pink-400/10",
  Savings: "bg-df-teal-dim",
  Other: "bg-white/[0.05]",
};

// Empty by default — user enters their own values
const DEFAULT_ENTRIES: BudgetEntry[] = [];
const DEFAULT_GOALS: SavingsGoal[] = [];

// ─── Helpers ────────────────────────────────────────────────────────────────

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function getDateBounds(period: Period): { start: Date; end: Date } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (period === "daily") {
    return { start: today, end: today };
  }
  if (period === "weekly") {
    const day = today.getDay();
    const startOffset = day === 0 ? -6 : 1 - day;
    const start = new Date(today);
    start.setDate(today.getDate() + startOffset);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  }
  // monthly
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start, end };
}

function isInPeriod(dateStr: string, period: Period): boolean {
  const { start, end } = getDateBounds(period);
  const d = new Date(`${dateStr}T00:00:00`);
  return d >= start && d <= end;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(amount);
}

function getPeriodLabel(period: Period): string {
  const now = new Date();
  if (period === "daily") {
    return now.toLocaleDateString("en-GB", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }
  if (period === "weekly") {
    const { start, end } = getDateBounds(period);
    const s = start.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
    });
    const e = end.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
    });
    return `${s} – ${e}`;
  }
  return now.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function BudgetCard() {
  const [entries, setEntries] = useState<BudgetEntry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ENTRIES);
      return stored ? JSON.parse(stored) : DEFAULT_ENTRIES;
    } catch {
      return DEFAULT_ENTRIES;
    }
  });

  const [goals, setGoals] = useState<SavingsGoal[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GOALS);
      return stored ? JSON.parse(stored) : DEFAULT_GOALS;
    } catch {
      return DEFAULT_GOALS;
    }
  });

  const [period, setPeriod] = useState<Period>("monthly");
  const [section, setSection] = useState<ActiveSection>("overview");

  // Dialogs
  const [entryDialog, setEntryDialog] = useState<{
    open: boolean;
    editId?: string;
    type: "income" | "expense";
  }>({ open: false, type: "income" });

  const [goalDialog, setGoalDialog] = useState<{
    open: boolean;
    editId?: string;
    mode: "add" | "update";
  }>({ open: false, mode: "add" });

  // Form state
  const [entryForm, setEntryForm] = useState({
    description: "",
    amount: "",
    category: "Food",
    date: todayStr(),
  });
  const [goalForm, setGoalForm] = useState({
    name: "",
    target: "",
    amount: "",
    saved: "",
  });

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ENTRIES, JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_GOALS, JSON.stringify(goals));
  }, [goals]);

  // ── Derived data ──────────────────────────────────────────────────────────

  const filtered = useMemo(
    () => entries.filter((e) => isInPeriod(e.date, period)),
    [entries, period],
  );

  const totalIncome = useMemo(
    () =>
      filtered
        .filter((e) => e.type === "income")
        .reduce((s, e) => s + e.amount, 0),
    [filtered],
  );

  const totalExpenses = useMemo(
    () =>
      filtered
        .filter((e) => e.type === "expense")
        .reduce((s, e) => s + e.amount, 0),
    [filtered],
  );

  const netBalance = totalIncome - totalExpenses;

  const categoryBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    for (const e of filtered.filter((e) => e.type === "expense")) {
      const cat = e.category ?? "Other";
      map[cat] = (map[cat] ?? 0) + e.amount;
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  const incomeEntries = filtered.filter((e) => e.type === "income");
  const expenseEntries = filtered.filter((e) => e.type === "expense");

  // ── Entry CRUD ────────────────────────────────────────────────────────────

  const openAddEntry = (type: "income" | "expense") => {
    setEntryForm({
      description: "",
      amount: "",
      category: "Food",
      date: todayStr(),
    });
    setEntryDialog({ open: true, type });
  };

  const openEditEntry = (entry: BudgetEntry) => {
    setEntryForm({
      description: entry.description,
      amount: String(entry.amount),
      category: entry.category ?? "Food",
      date: entry.date,
    });
    setEntryDialog({ open: true, editId: entry.id, type: entry.type });
  };

  const saveEntry = () => {
    const amount = Number.parseFloat(entryForm.amount);
    if (!entryForm.description.trim() || Number.isNaN(amount) || amount <= 0)
      return;
    if (entryDialog.editId) {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === entryDialog.editId
            ? {
                ...e,
                description: entryForm.description.trim(),
                amount,
                category:
                  entryDialog.type === "expense"
                    ? entryForm.category
                    : undefined,
                date: entryForm.date,
              }
            : e,
        ),
      );
    } else {
      const entry: BudgetEntry = {
        id: crypto.randomUUID(),
        type: entryDialog.type,
        description: entryForm.description.trim(),
        amount,
        date: entryForm.date,
        ...(entryDialog.type === "expense"
          ? { category: entryForm.category }
          : {}),
      };
      setEntries((prev) => [entry, ...prev]);
    }
    setEntryDialog({ open: false, type: "income" });
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  // ── Quick-add handler ─────────────────────────────────────────────────────

  const quickAddEntry = (
    description: string,
    amount: number,
    type: "income" | "expense",
    category?: string,
  ) => {
    const entry: BudgetEntry = {
      id: crypto.randomUUID(),
      type,
      description: description.trim(),
      amount,
      date: todayStr(),
      ...(type === "expense" ? { category: category ?? "Other" } : {}),
    };
    setEntries((prev) => [entry, ...prev]);
  };

  // ── Goals CRUD ────────────────────────────────────────────────────────────

  const openAddGoal = () => {
    setGoalForm({ name: "", target: "", amount: "", saved: "" });
    setGoalDialog({ open: true, mode: "add" });
  };

  const openUpdateGoal = (goal: SavingsGoal) => {
    setGoalForm({
      name: goal.name,
      target: String(goal.target),
      amount: "",
      saved: String(goal.saved),
    });
    setGoalDialog({ open: true, editId: goal.id, mode: "update" });
  };

  const saveGoal = () => {
    if (goalDialog.mode === "add") {
      const target = Number.parseFloat(goalForm.target);
      const saved = Number.parseFloat(goalForm.saved) || 0;
      if (!goalForm.name.trim() || Number.isNaN(target) || target <= 0) return;
      setGoals((prev) => [
        ...prev,
        { id: crypto.randomUUID(), name: goalForm.name.trim(), target, saved },
      ]);
    } else {
      // update mode: directly set saved and target
      const newSaved = Number.parseFloat(goalForm.saved);
      const newTarget = Number.parseFloat(goalForm.target);
      if (Number.isNaN(newSaved) || Number.isNaN(newTarget)) return;
      if (newSaved < 0 || newTarget < 0) return;
      setGoals((prev) =>
        prev.map((g) =>
          g.id === goalDialog.editId
            ? { ...g, saved: newSaved, target: newTarget }
            : g,
        ),
      );
    }
    setGoalDialog({ open: false, mode: "add" });
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  // ── Section nav ───────────────────────────────────────────────────────────

  const SECTIONS: {
    key: ActiveSection;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: "overview",
      label: "Overview",
      icon: <Wallet className="w-3.5 h-3.5" />,
    },
    {
      key: "income",
      label: "Income",
      icon: <TrendingUp className="w-3.5 h-3.5" />,
    },
    {
      key: "expenses",
      label: "Expenses",
      icon: <TrendingDown className="w-3.5 h-3.5" />,
    },
    {
      key: "savings",
      label: "Goals",
      icon: <Target className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <>
      <div className="rounded-2xl border border-white/[0.06] bg-df-navy-mid shadow-card card-glow flex flex-col min-h-[340px] p-5">
        {/* ── Header ── */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-df-green-dim flex items-center justify-center">
            <Wallet className="w-4 h-4 text-df-green" />
          </div>
          <h3 className="text-sm font-semibold text-df-text">Budget</h3>
          <span className="ml-auto text-[10px] font-medium text-df-text-muted bg-white/[0.06] border border-white/[0.06] rounded-full px-2 py-0.5">
            {getPeriodLabel(period)}
          </span>
        </div>

        {/* ── Period Tabs ── */}
        <Tabs
          value={period}
          onValueChange={(v) => setPeriod(v as Period)}
          className="mb-4"
        >
          <TabsList
            className="w-full bg-df-navy-light border border-white/[0.06] p-0.5 h-8"
            data-ocid="budget.period.tab"
          >
            <TabsTrigger
              value="daily"
              className="flex-1 text-xs h-7 data-[state=active]:bg-df-teal-dim data-[state=active]:text-df-teal data-[state=inactive]:text-df-text-muted"
            >
              Daily
            </TabsTrigger>
            <TabsTrigger
              value="weekly"
              className="flex-1 text-xs h-7 data-[state=active]:bg-df-teal-dim data-[state=active]:text-df-teal data-[state=inactive]:text-df-text-muted"
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="flex-1 text-xs h-7 data-[state=active]:bg-df-teal-dim data-[state=active]:text-df-teal data-[state=inactive]:text-df-text-muted"
            >
              Monthly
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* ── Section Nav ── */}
        <div className="flex gap-1 mb-4" role="tablist">
          {SECTIONS.map(({ key, label, icon }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={section === key}
              onClick={() => setSection(key)}
              data-ocid={`budget.${key}.tab`}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex-1 justify-center ${
                section === key
                  ? "bg-df-green-dim text-df-green border border-df-green/20"
                  : "text-df-text-muted hover:text-df-text hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="flex-1"
          >
            {section === "overview" && (
              <OverviewSection
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
                netBalance={netBalance}
                categoryBreakdown={categoryBreakdown}
              />
            )}
            {section === "income" && (
              <EntriesSection
                entries={incomeEntries}
                type="income"
                onAdd={() => openAddEntry("income")}
                onEdit={openEditEntry}
                onDelete={deleteEntry}
                onQuickAdd={(desc, amt) => quickAddEntry(desc, amt, "income")}
              />
            )}
            {section === "expenses" && (
              <EntriesSection
                entries={expenseEntries}
                type="expense"
                onAdd={() => openAddEntry("expense")}
                onEdit={openEditEntry}
                onDelete={deleteEntry}
                onQuickAdd={(desc, amt, cat) =>
                  quickAddEntry(desc, amt, "expense", cat)
                }
              />
            )}
            {section === "savings" && (
              <GoalsSection
                goals={goals}
                onAdd={openAddGoal}
                onUpdate={openUpdateGoal}
                onDelete={deleteGoal}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Entry Dialog ── */}
      <Dialog
        open={entryDialog.open}
        onOpenChange={(open) => setEntryDialog((d) => ({ ...d, open }))}
      >
        <DialogContent
          className="bg-df-navy-mid border-white/[0.08] text-df-text sm:max-w-sm"
          data-ocid="budget.entry.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-df-text text-sm">
              {entryDialog.editId ? "Edit" : "Add"}{" "}
              {entryDialog.type === "income" ? "Income" : "Expense"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-1">
            <div>
              <Label className="text-xs text-df-text-muted mb-1.5 block">
                Description
              </Label>
              <Input
                value={entryForm.description}
                onChange={(e) =>
                  setEntryForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder={
                  entryDialog.type === "income"
                    ? "e.g. Monthly salary"
                    : "e.g. Grocery run"
                }
                data-ocid="budget.entry.input"
                className="bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-9"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Label className="text-xs text-df-text-muted mb-1.5 block">
                  Amount (£)
                </Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={entryForm.amount}
                  onChange={(e) =>
                    setEntryForm((f) => ({ ...f, amount: e.target.value }))
                  }
                  placeholder="0.00"
                  data-ocid="budget.amount.input"
                  className="bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-9"
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-df-text-muted mb-1.5 block">
                  Date
                </Label>
                <Input
                  type="date"
                  value={entryForm.date}
                  onChange={(e) =>
                    setEntryForm((f) => ({ ...f, date: e.target.value }))
                  }
                  data-ocid="budget.date.input"
                  className="bg-df-navy-light border-white/[0.06] text-df-text text-sm h-9 [color-scheme:dark]"
                />
              </div>
            </div>
            {entryDialog.type === "expense" && (
              <div>
                <Label className="text-xs text-df-text-muted mb-1.5 block">
                  Category
                </Label>
                <Select
                  value={entryForm.category}
                  onValueChange={(v) =>
                    setEntryForm((f) => ({ ...f, category: v }))
                  }
                >
                  <SelectTrigger
                    data-ocid="budget.category.select"
                    className="bg-df-navy-light border-white/[0.06] text-df-text text-sm h-9"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-df-navy-mid border-white/[0.08]">
                    {EXPENSE_CATEGORIES.map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="text-df-text"
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEntryDialog((d) => ({ ...d, open: false }))}
              className="border-white/10 bg-transparent text-df-text-muted hover:text-df-text text-xs"
              data-ocid="budget.entry.cancel_button"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={saveEntry}
              disabled={!entryForm.description.trim() || !entryForm.amount}
              className="bg-df-green text-df-navy font-medium hover:bg-df-green/90 text-xs"
              data-ocid="budget.entry.submit_button"
            >
              {entryDialog.editId ? "Save Changes" : "Add Entry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Goal Dialog ── */}
      <Dialog
        open={goalDialog.open}
        onOpenChange={(open) => setGoalDialog((d) => ({ ...d, open }))}
      >
        <DialogContent
          className="bg-df-navy-mid border-white/[0.08] text-df-text sm:max-w-sm"
          data-ocid="budget.goal.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-df-text text-sm">
              {goalDialog.mode === "add"
                ? "New Savings Goal"
                : `Update: ${goalForm.name}`}
            </DialogTitle>
          </DialogHeader>
          {goalDialog.mode === "add" ? (
            <div className="space-y-3 py-1">
              <div>
                <Label className="text-xs text-df-text-muted mb-1.5 block">
                  Goal Name
                </Label>
                <Input
                  value={goalForm.name}
                  onChange={(e) =>
                    setGoalForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="e.g. Holiday trip"
                  data-ocid="budget.goal.input"
                  className="bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-9"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-xs text-df-text-muted mb-1.5 block">
                    Target (£)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={goalForm.target}
                    onChange={(e) =>
                      setGoalForm((f) => ({ ...f, target: e.target.value }))
                    }
                    placeholder="0.00"
                    data-ocid="budget.goal.target.input"
                    className="bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-9"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-xs text-df-text-muted mb-1.5 block">
                    Already saved (£)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={goalForm.saved}
                    onChange={(e) =>
                      setGoalForm((f) => ({ ...f, saved: e.target.value }))
                    }
                    placeholder="0.00"
                    data-ocid="budget.goal.saved.input"
                    className="bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-9"
                  />
                </div>
              </div>
            </div>
          ) : (
            // ── Update mode: directly set saved and target values ──
            <div className="space-y-3 py-1">
              <div className="rounded-lg bg-df-navy-light border border-white/[0.06] p-3 flex justify-between items-center">
                <div className="text-center flex-1">
                  <p className="text-[10px] text-df-text-muted mb-0.5">
                    Currently saved
                  </p>
                  <p className="text-sm font-semibold text-df-teal">
                    {formatCurrency(Number.parseFloat(goalForm.saved) || 0)}
                  </p>
                </div>
                <div className="w-px h-8 bg-white/[0.06]" />
                <div className="text-center flex-1">
                  <p className="text-[10px] text-df-text-muted mb-0.5">
                    Target
                  </p>
                  <p className="text-sm font-semibold text-df-text">
                    {formatCurrency(Number.parseFloat(goalForm.target) || 0)}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-xs text-df-text-muted mb-1.5 block">
                  Set saved amount (£)
                </Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={goalForm.saved}
                  onChange={(e) =>
                    setGoalForm((f) => ({ ...f, saved: e.target.value }))
                  }
                  placeholder="How much have you saved?"
                  data-ocid="budget.goal.saved.input"
                  className="bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-9"
                />
              </div>
              <div>
                <Label className="text-xs text-df-text-muted mb-1.5 block">
                  New target amount (£)
                </Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={goalForm.target}
                  onChange={(e) =>
                    setGoalForm((f) => ({ ...f, target: e.target.value }))
                  }
                  placeholder="What are you aiming for?"
                  data-ocid="budget.goal.target.input"
                  className="bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-9"
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGoalDialog((d) => ({ ...d, open: false }))}
              className="border-white/10 bg-transparent text-df-text-muted hover:text-df-text text-xs"
              data-ocid="budget.goal.cancel_button"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={saveGoal}
              className="bg-df-teal text-df-navy font-medium hover:bg-df-teal/90 text-xs"
              data-ocid="budget.goal.submit_button"
            >
              {goalDialog.mode === "add" ? "Create Goal" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Overview Section ───────────────────────────────────────────────────────

function OverviewSection({
  totalIncome,
  totalExpenses,
  netBalance,
  categoryBreakdown,
}: {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  categoryBreakdown: [string, number][];
}) {
  const maxCategory = categoryBreakdown[0]?.[1] ?? 1;

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-df-green-dim border border-df-green/10 p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ArrowDownLeft className="w-3 h-3 text-df-green" />
            <span className="text-[10px] text-df-green font-medium">
              Income
            </span>
          </div>
          <p className="text-sm font-bold text-df-green">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="rounded-xl bg-red-500/[0.08] border border-red-500/10 p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ArrowUpRight className="w-3 h-3 text-red-400" />
            <span className="text-[10px] text-red-400 font-medium">Spent</span>
          </div>
          <p className="text-sm font-bold text-red-400">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div
          className={`rounded-xl border p-3 text-center ${
            netBalance >= 0
              ? "bg-df-teal-dim border-df-teal/10"
              : "bg-df-orange-dim border-df-orange/10"
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <Wallet
              className={`w-3 h-3 ${netBalance >= 0 ? "text-df-teal" : "text-df-orange"}`}
            />
            <span
              className={`text-[10px] font-medium ${
                netBalance >= 0 ? "text-df-teal" : "text-df-orange"
              }`}
            >
              Balance
            </span>
          </div>
          <p
            className={`text-sm font-bold ${
              netBalance >= 0 ? "text-df-teal" : "text-df-orange"
            }`}
          >
            {formatCurrency(netBalance)}
          </p>
        </div>
      </div>

      {/* Category breakdown */}
      {categoryBreakdown.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-df-text-muted/60 mb-2 px-0.5">
            Spending by category
          </p>
          <div className="space-y-2">
            {categoryBreakdown.map(([cat, amount]) => (
              <div key={cat} className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-medium w-20 flex-shrink-0 ${
                    CATEGORY_COLORS[cat] ?? "text-df-text-muted"
                  }`}
                >
                  {cat}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-df-navy-light overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(amount / maxCategory) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      cat === "Food"
                        ? "bg-orange-400"
                        : cat === "Transport"
                          ? "bg-blue-400"
                          : cat === "Bills"
                            ? "bg-red-400"
                            : cat === "Health"
                              ? "bg-green-400"
                              : cat === "Entertainment"
                                ? "bg-purple-400"
                                : cat === "Shopping"
                                  ? "bg-pink-400"
                                  : cat === "Savings"
                                    ? "bg-df-teal"
                                    : "bg-df-text-muted"
                    }`}
                  />
                </div>
                <span className="text-[10px] text-df-text-muted w-16 text-right flex-shrink-0">
                  {formatCurrency(amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {categoryBreakdown.length === 0 && totalIncome === 0 && (
        <div
          className="text-center py-6 text-df-text-muted text-sm"
          data-ocid="budget.overview.empty_state"
        >
          No transactions for this period.
        </div>
      )}
    </div>
  );
}

// ─── Entries Section ─────────────────────────────────────────────────────────

function EntriesSection({
  entries,
  type,
  onAdd,
  onEdit,
  onDelete,
  onQuickAdd,
}: {
  entries: BudgetEntry[];
  type: "income" | "expense";
  onAdd: () => void;
  onEdit: (entry: BudgetEntry) => void;
  onDelete: (id: string) => void;
  onQuickAdd: (description: string, amount: number, category?: string) => void;
}) {
  const isIncome = type === "income";
  const [quickDesc, setQuickDesc] = useState("");
  const [quickAmount, setQuickAmount] = useState("");
  const [quickCategory, setQuickCategory] = useState("Food");
  const descRef = useRef<HTMLInputElement>(null);

  const handleQuickSubmit = () => {
    const amount = Number.parseFloat(quickAmount);
    if (!quickDesc.trim() || Number.isNaN(amount) || amount <= 0) return;
    onQuickAdd(quickDesc, amount, isIncome ? undefined : quickCategory);
    setQuickDesc("");
    setQuickAmount("");
    // Keep category selection; reset focus to description
    descRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleQuickSubmit();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-df-text-muted/60">
          {isIncome ? "Income entries" : "Expense entries"}
        </p>
        <button
          type="button"
          onClick={onAdd}
          data-ocid={`budget.${type}.open_modal_button`}
          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
            isIncome
              ? "bg-df-green-dim text-df-green hover:bg-df-green/20"
              : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
          }`}
        >
          <Edit2 className="w-3 h-3" />
          Detail
        </button>
      </div>

      {/* ── Inline quick-add row ── */}
      <div
        className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 ${
          isIncome
            ? "border-df-green/20 bg-df-green/[0.04]"
            : "border-red-500/20 bg-red-500/[0.04]"
        }`}
        data-ocid={`budget.${type}.row`}
      >
        <Input
          ref={descRef}
          value={quickDesc}
          onChange={(e) => setQuickDesc(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Description"
          data-ocid={`budget.${type}.input`}
          className="flex-1 h-8 text-xs bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted/50 min-w-0"
        />
        {!isIncome && (
          <Select value={quickCategory} onValueChange={setQuickCategory}>
            <SelectTrigger
              data-ocid={`budget.${type}.select`}
              className="h-8 text-xs bg-df-navy-light border-white/[0.06] text-df-text w-24 flex-shrink-0"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-df-navy-mid border-white/[0.08]">
              {EXPENSE_CATEGORIES.map((cat) => (
                <SelectItem
                  key={cat}
                  value={cat}
                  className="text-df-text text-xs"
                >
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="relative flex-shrink-0">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-df-text-muted pointer-events-none">
            £
          </span>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={quickAmount}
            onChange={(e) => setQuickAmount(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="0.00"
            data-ocid={`budget.${type}.search_input`}
            className="h-8 w-24 text-xs pl-6 bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted/50"
          />
        </div>
        <button
          type="button"
          onClick={handleQuickSubmit}
          disabled={!quickDesc.trim() || !quickAmount}
          data-ocid={`budget.${type}.primary_button`}
          className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            isIncome
              ? "bg-df-green text-df-navy hover:bg-df-green/90"
              : "bg-red-500/80 text-white hover:bg-red-500"
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {entries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6 text-df-text-muted text-xs"
            data-ocid={`budget.${type}.empty_state`}
          >
            No {type} entries for this period. Use the form above to add one.
          </motion.div>
        )}
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-3 group rounded-xl px-3 py-2.5 hover:bg-white/[0.03] transition-colors"
            data-ocid={`budget.${type}.item.${i + 1}`}
          >
            {/* Icon */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isIncome
                  ? "bg-df-green-dim"
                  : (CATEGORY_BG[entry.category ?? "Other"] ??
                    "bg-white/[0.05]")
              }`}
            >
              {isIncome ? (
                <ArrowDownLeft className="w-3.5 h-3.5 text-df-green" />
              ) : (
                <span
                  className={`text-[10px] font-bold ${
                    CATEGORY_COLORS[entry.category ?? "Other"] ??
                    "text-df-text-muted"
                  }`}
                >
                  {(entry.category ?? "Other").slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-df-text truncate">
                {entry.description}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                {entry.category && (
                  <span
                    className={`text-[10px] ${
                      CATEGORY_COLORS[entry.category] ?? "text-df-text-muted"
                    }`}
                  >
                    {entry.category}
                  </span>
                )}
                <span className="text-[10px] text-df-text-muted">
                  {new Date(`${entry.date}T00:00:00`).toLocaleDateString(
                    "en-GB",
                    {
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </span>
              </div>
            </div>

            {/* Amount */}
            <span
              className={`text-sm font-semibold flex-shrink-0 ${
                isIncome ? "text-df-green" : "text-red-400"
              }`}
            >
              {isIncome ? "+" : "-"}
              {formatCurrency(entry.amount)}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <button
                type="button"
                onClick={() => onEdit(entry)}
                data-ocid={`budget.${type}.edit_button.${i + 1}`}
                className="p-1 text-df-text-muted hover:text-df-teal transition-colors"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(entry.id)}
                data-ocid={`budget.${type}.delete_button.${i + 1}`}
                className="p-1 text-df-text-muted hover:text-df-red transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Goals Section ───────────────────────────────────────────────────────────

function GoalsSection({
  goals,
  onAdd,
  onUpdate,
  onDelete,
}: {
  goals: SavingsGoal[];
  onAdd: () => void;
  onUpdate: (goal: SavingsGoal) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-df-text-muted/60">
          Savings goals
        </p>
        <button
          type="button"
          onClick={onAdd}
          data-ocid="budget.goals.open_modal_button"
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium bg-df-teal-dim text-df-teal hover:bg-df-teal/20 transition-colors"
        >
          <Plus className="w-3 h-3" />
          New Goal
        </button>
      </div>

      <AnimatePresence initial={false}>
        {goals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-df-text-muted text-sm"
            data-ocid="budget.goals.empty_state"
          >
            No savings goals yet. Create one!
          </motion.div>
        )}
        {goals.map((goal, i) => {
          const pct =
            goal.target > 0
              ? Math.min((goal.saved / goal.target) * 100, 100)
              : 0;
          const remaining = goal.target - goal.saved;
          const done = pct >= 100;
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="group rounded-xl border border-white/[0.06] bg-df-navy-light p-3 hover:border-white/[0.1] transition-colors"
              data-ocid={`budget.goals.item.${i + 1}`}
            >
              {/* Goal header */}
              <div className="flex items-start gap-2 mb-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    done ? "bg-df-green-dim" : "bg-df-teal-dim"
                  }`}
                >
                  {done ? (
                    <PiggyBank className="w-3.5 h-3.5 text-df-green" />
                  ) : (
                    <Target className="w-3.5 h-3.5 text-df-teal" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-df-text truncate">
                      {goal.name}
                    </p>
                    {done && (
                      <span className="text-[10px] bg-df-green-dim text-df-green rounded-full px-1.5 py-0.5 font-semibold flex-shrink-0">
                        ✓ Done
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-df-text-muted mt-0.5">
                    {formatCurrency(goal.saved)} of{" "}
                    {formatCurrency(goal.target)}
                    {!done && (
                      <span className="text-df-text-muted/60">
                        {" "}
                        &mdash; {formatCurrency(remaining)} left
                      </span>
                    )}
                  </p>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => onUpdate(goal)}
                    data-ocid={`budget.goals.edit_button.${i + 1}`}
                    className="p-1 text-df-text-muted hover:text-df-teal transition-colors"
                    title="Update savings"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(goal.id)}
                    data-ocid={`budget.goals.delete_button.${i + 1}`}
                    className="p-1 text-df-text-muted hover:text-df-red transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              {/* Progress bar */}
              <Progress
                value={pct}
                className="h-1.5 bg-df-navy-mid"
                style={
                  {
                    "--progress-color": done
                      ? "oklch(0.76 0.17 155)"
                      : "oklch(0.78 0.14 185)",
                  } as React.CSSProperties
                }
              />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-df-text-muted">
                  {Math.round(pct)}% complete
                </span>
                <button
                  type="button"
                  onClick={() => onUpdate(goal)}
                  data-ocid={`budget.goals.save_button.${i + 1}`}
                  className="text-[10px] text-df-teal hover:text-df-teal/80 font-medium flex items-center gap-0.5 transition-colors"
                >
                  <Edit2 className="w-2.5 h-2.5" />
                  Edit
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
