import { Toaster } from "@/components/ui/sonner";
import { useQuery } from "@tanstack/react-query";
import {
  BookMarked,
  BookOpen,
  Cake,
  CheckSquare,
  LayoutDashboard,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import BirthdayCard from "./components/BirthdayCard";
import DevotionCard from "./components/DevotionCard";
import EventsCard from "./components/EventsCard";
import HabitCard from "./components/HabitCard";
import JournalCard from "./components/JournalCard";
import PomodoroCard from "./components/PomodoroCard";
import TasksCard from "./components/TasksCard";
import { useActor } from "./hooks/useActor";

const QUOTES = [
  "The secret of getting ahead is getting started.",
  "It always seems impossible until it's done.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future depends on what you do today.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "You don't have to be great to start, but you have to start to be great.",
  "Believe you can and you're halfway there.",
  "Action is the foundational key to all success.",
  "Your limitation\u2014it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
];

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Tasks", icon: CheckSquare },
  { label: "Habits", icon: TrendingUp },
  { label: "Journal", icon: BookOpen },
  { label: "Birthdays", icon: Cake },
  { label: "Devotion", icon: BookMarked },
];

function daysUntilBirthday(month: number, day: number): number {
  const today = new Date();
  const thisYear = today.getFullYear();
  let next = new Date(thisYear, month - 1, day);
  if (next < today) {
    next = new Date(thisYear + 1, month - 1, day);
  }
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  return Math.round((next.getTime() - todayMidnight.getTime()) / 86400000);
}

function BirthdayAlertBanner() {
  const { actor, isFetching } = useActor();
  const { data: contacts = [] } = useQuery({
    queryKey: ["birthdays"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listContacts();
    },
    enabled: !!actor && !isFetching,
  });

  const soonContacts = contacts
    .map((c) => ({
      name: c.name,
      days: daysUntilBirthday(Number(c.birthMonth), Number(c.birthDay)),
    }))
    .filter((c) => c.days <= 3)
    .sort((a, b) => a.days - b.days);

  if (soonContacts.length === 0) return null;

  const first = soonContacts[0];
  const label =
    first.days === 0
      ? `Today is ${first.name}'s birthday! 🎉`
      : `${first.name}'s birthday is in ${first.days} day${first.days === 1 ? "" : "s"}!`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-6 mb-4 rounded-xl border border-pink-500/25 bg-pink-500/[0.08] px-4 py-2.5 flex items-center gap-2"
      data-ocid="birthdays.toast"
    >
      <Cake className="w-4 h-4 text-pink-400 flex-shrink-0" />
      <p className="text-sm text-pink-200">
        <span className="font-semibold">🎂 Upcoming: </span>
        {label}
        {soonContacts.length > 1 && (
          <span className="text-pink-300/70">
            {" "}
            +{soonContacts.length - 1} more
          </span>
        )}
      </p>
    </motion.div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const quote = QUOTES[dayOfYear % QUOTES.length];
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[oklch(0.14_0.04_240/0.95)] backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center gap-6">
          <div className="flex items-center gap-2 min-w-fit">
            <div className="w-7 h-7 rounded-lg bg-df-teal-dim flex items-center justify-center">
              <Zap className="w-4 h-4 text-df-teal" />
            </div>
            <span className="text-base font-semibold text-df-text">
              DayFlow
            </span>
          </div>

          <nav
            className="flex items-center gap-1 flex-1 overflow-x-auto scrollbar-none"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveNav(label)}
                data-ocid={`nav.${label.toLowerCase()}.tab`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeNav === label
                    ? "bg-df-teal-dim text-df-teal"
                    : "text-df-text-muted hover:text-df-text hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Page heading */}
      <div className="max-w-[1200px] mx-auto px-6 pt-8 pb-4 w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-df-text-muted text-sm font-medium mb-1">
              {dateStr}
            </p>
            <h2 className="text-2xl sm:text-3xl font-light text-df-text leading-tight max-w-xl">
              &ldquo;{quote}&rdquo;
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-df-text-muted bg-df-navy-light border border-white/[0.06] rounded-lg px-3 py-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-df-green animate-pulse inline-block" />
            Live
          </div>
        </div>
      </div>

      {/* Birthday alert banner */}
      <div className="max-w-[1200px] mx-auto w-full">
        <BirthdayAlertBanner />
      </div>

      {/* Dashboard grid */}
      <main className="max-w-[1200px] mx-auto px-6 pb-10 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <TasksCard />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PomodoroCard />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <HabitCard />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <JournalCard />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <EventsCard />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <BirthdayCard />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <DevotionCard />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-5">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-df-teal" />
            <span className="text-xs text-df-text-muted font-medium">
              DayFlow
            </span>
          </div>
          <p className="text-xs text-df-text-muted">
            &copy; {new Date().getFullYear()}. Built with \u2665 using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-df-teal hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
