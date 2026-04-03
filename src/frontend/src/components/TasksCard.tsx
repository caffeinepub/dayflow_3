import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowDown,
  ArrowUp,
  CheckSquare,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
}

interface TasksCardProps {
  dateKey: string;
}

function loadTasks(dateKey: string): Task[] {
  try {
    const stored = localStorage.getItem(`dayflow_tasks_${dateKey}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function TasksCard({ dateKey }: TasksCardProps) {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks(dateKey));
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  // Reload tasks when dateKey changes
  useEffect(() => {
    setTasks(loadTasks(dateKey));
    setEditMode(false);
    setEditingId(null);
  }, [dateKey]);

  // Persist tasks for current dateKey
  useEffect(() => {
    localStorage.setItem(`dayflow_tasks_${dateKey}`, JSON.stringify(tasks));
  }, [tasks, dateKey]);

  const addTask = () => {
    const title = input.trim();
    if (!title) return;
    setTasks((prev) => [
      { id: crypto.randomUUID(), title, done: false, createdAt: Date.now() },
      ...prev,
    ]);
    setInput("");
  };

  const toggle = (id: string) => {
    if (editMode) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const remove = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setTasks((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveDown = (index: number) => {
    setTasks((prev) => {
      if (index === prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  const startRename = (task: Task) => {
    setEditingId(task.id);
    setEditingText(task.title);
  };

  const commitRename = (id: string) => {
    const trimmed = editingText.trim();
    if (trimmed) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t)),
      );
    }
    setEditingId(null);
    setEditingText("");
  };

  const exitEditMode = () => {
    if (editingId) commitRename(editingId);
    setEditMode(false);
    setEditingId(null);
  };

  const doneCount = tasks.filter((t) => t.done).length;
  const pct = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-df-navy-mid shadow-card card-glow flex flex-col h-full min-h-[340px] p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-df-red-dim flex items-center justify-center">
          <CheckSquare className="w-4 h-4 text-df-red" />
        </div>
        <h3 className="text-sm font-semibold text-df-text">My Day Tasks</h3>

        {editMode ? (
          <button
            type="button"
            onClick={exitEditMode}
            className="ml-auto text-xs font-semibold text-df-red hover:text-df-red/80 transition-colors px-2.5 py-1 rounded-lg bg-df-red-dim"
            data-ocid="tasks.done_button"
          >
            Done
          </button>
        ) : (
          <>
            <span className="ml-auto text-xs text-df-text-muted">
              {doneCount}/{tasks.length}
            </span>
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="text-df-text-muted hover:text-df-red transition-colors p-1 rounded-lg hover:bg-df-red-dim"
              aria-label="Edit tasks"
              data-ocid="tasks.edit_button"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>

      {/* Progress bar */}
      {!editMode && (
        <div className="h-1 rounded-full bg-df-navy-light mb-4 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-df-red"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      {/* Add task (hidden in edit mode) */}
      {!editMode && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
          className="flex gap-2 mb-4"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
            data-ocid="todo.input"
            className="flex-1 bg-df-navy-light border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-9"
          />
          <Button
            type="submit"
            size="sm"
            className="bg-df-red text-white font-medium hover:bg-df-red/90 h-9 px-3"
            data-ocid="todo.add_button"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </form>
      )}

      {/* Edit mode hint */}
      {editMode && tasks.length > 0 && (
        <p className="text-[11px] text-df-text-muted mb-3">
          Tap a name to rename · use arrows to reorder · trash to delete
        </p>
      )}

      {/* Task list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-1.5">
        <AnimatePresence initial={false}>
          {tasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-df-text-muted text-sm"
              data-ocid="todo.empty_state"
            >
              No tasks for this day. Add one above!
            </motion.div>
          )}

          {tasks.map((task, i) =>
            editMode ? (
              /* ── Edit row ── */
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2 rounded-xl px-2 py-1.5 bg-white/[0.02] border border-white/[0.05]"
                data-ocid={`todo.edit_item.${i + 1}`}
              >
                {/* Reorder */}
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveUp(i)}
                    disabled={i === 0}
                    className="text-df-text-muted hover:text-df-text disabled:opacity-20 transition-colors p-0.5"
                    aria-label="Move up"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(i)}
                    disabled={i === tasks.length - 1}
                    className="text-df-text-muted hover:text-df-text disabled:opacity-20 transition-colors p-0.5"
                    aria-label="Move down"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>

                {/* Inline rename input or label */}
                {editingId === task.id ? (
                  <input
                    // biome-ignore lint/a11y/noAutofocus: intentional focus on rename
                    autoFocus
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => commitRename(task.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitRename(task.id);
                      if (e.key === "Escape") {
                        setEditingId(null);
                        setEditingText("");
                      }
                    }}
                    className="flex-1 bg-df-navy-light border border-df-red/30 rounded-lg px-2 py-1 text-sm text-df-text outline-none focus:border-df-red/60"
                    data-ocid={`todo.rename_input.${i + 1}`}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => startRename(task)}
                    className="flex-1 text-left text-sm text-df-text hover:text-df-red transition-colors truncate px-1"
                    data-ocid={`todo.rename_button.${i + 1}`}
                  >
                    {task.title}
                  </button>
                )}

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => remove(task.id)}
                  className="text-df-text-muted hover:text-df-red transition-colors p-1 flex-shrink-0"
                  aria-label="Delete task"
                  data-ocid={`todo.delete_button.${i + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ) : (
              /* ── Normal row ── */
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 group rounded-xl px-3 py-2.5 hover:bg-white/[0.03] transition-colors"
                data-ocid={`todo.item.${i + 1}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(task.id)}
                  data-ocid={`todo.checkbox.${i + 1}`}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    task.done
                      ? "bg-df-red border-df-red"
                      : "border-white/20 hover:border-df-red"
                  }`}
                >
                  {task.done && (
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
                        stroke="oklch(0.95 0.02 240)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}
                </button>
                <span
                  className={`flex-1 text-sm transition-all duration-300 ${
                    task.done
                      ? "text-df-text-muted line-through"
                      : "text-df-text"
                  }`}
                >
                  {task.title}
                </span>
                <button
                  type="button"
                  onClick={() => remove(task.id)}
                  data-ocid={`todo.delete_button.${i + 1}`}
                  className="opacity-0 group-hover:opacity-100 text-df-text-muted hover:text-df-red transition-all duration-150 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ),
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
