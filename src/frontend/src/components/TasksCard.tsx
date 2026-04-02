import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckSquare, Plus, Trash2 } from "lucide-react";
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

  // Reload tasks when dateKey changes
  useEffect(() => {
    setTasks(loadTasks(dateKey));
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
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const remove = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const doneCount = tasks.filter((t) => t.done).length;
  const pct = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-df-navy-mid shadow-card card-glow flex flex-col h-full min-h-[340px] p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-df-teal-dim flex items-center justify-center">
          <CheckSquare className="w-4 h-4 text-df-teal" />
        </div>
        <h3 className="text-sm font-semibold text-df-text">My Day Tasks</h3>
        <span className="ml-auto text-xs text-df-text-muted">
          {doneCount}/{tasks.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-df-navy-light mb-4 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-df-teal"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Add task */}
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
          className="bg-df-teal text-df-navy font-medium hover:bg-df-teal/90 h-9 px-3"
          data-ocid="todo.add_button"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </form>

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
          {tasks.map((task, i) => (
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
                    ? "bg-df-teal border-df-teal"
                    : "border-white/20 hover:border-df-teal"
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
                  task.done ? "text-df-text-muted line-through" : "text-df-text"
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
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
