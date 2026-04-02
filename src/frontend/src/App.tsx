import { Toaster } from "@/components/ui/sonner";
import { useQuery } from "@tanstack/react-query";
import {
  BookMarked,
  BookOpen,
  Cake,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Library,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import BibleReaderCard from "./components/BibleReaderCard";
import DailyHabitsCard from "./components/DailyHabitsCard";
import DevotionCard from "./components/DevotionCard";
import JournalCard from "./components/JournalCard";
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
  { label: "Journal", icon: BookOpen },
  { label: "Devotion", icon: BookMarked },
  { label: "Habits", icon: Star },
  { label: "Bible", icon: Library },
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
      ? `Today is ${first.name}'s birthday! \uD83C\uDF89`
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
        <span className="font-semibold">\uD83C\uDF82 Upcoming: </span>
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

function getDayOfYear(date: Date): number {
  return Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const dateKey = selectedDate.toISOString().slice(0, 10);
  const dayOfYear = getDayOfYear(selectedDate);
  const quote = QUOTES[dayOfYear % QUOTES.length];
  const dateStr = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const isToday = dateKey === todayKey;

  const goToPrevDay = () => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      return d;
    });
  };

  const goToNextDay = () => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      return d;
    });
  };

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
          <div className="flex-1">
            {/* Day navigation */}
            <div className="flex items-center gap-2 mb-1">
              <button
                type="button"
                onClick={goToPrevDay}
                data-ocid="nav.prev_day.button"
                className="text-df-text-muted hover:text-df-text transition-colors p-0.5 rounded-md hover:bg-white/[0.06]"
                aria-label="Previous day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <p className="text-df-text-muted text-sm font-medium">
                {dateStr}
                {isToday && (
                  <span className="ml-2 text-[10px] text-df-teal font-semibold uppercase tracking-wider">
                    Today
                  </span>
                )}
              </p>
              <button
                type="button"
                onClick={goToNextDay}
                data-ocid="nav.next_day.button"
                className="text-df-text-muted hover:text-df-text transition-colors p-0.5 rounded-md hover:bg-white/[0.06]"
                aria-label="Next day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              {!isToday && (
                <button
                  type="button"
                  onClick={() => setSelectedDate(new Date())}
                  data-ocid="nav.today.button"
                  className="text-[10px] text-df-teal hover:text-df-teal/80 font-medium transition-colors ml-1"
                >
                  Back to Today
                </button>
              )}
            </div>
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

      {/* Main content */}
      <main className="max-w-[1200px] mx-auto px-6 pb-10 w-full flex-1">
        {activeNav === "Dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <TasksCard dateKey={dateKey} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <JournalCard dateKey={dateKey} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <BibleReaderCard />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <DevotionCard dayOfYear={dayOfYear} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <DailyHabitsCard />
            </motion.div>
          </div>
        )}
        {activeNav === "Tasks" && <TasksCard dateKey={dateKey} />}
        {activeNav === "Journal" && <JournalCard dateKey={dateKey} />}
        {activeNav === "Devotion" && <DevotionCard dayOfYear={dayOfYear} />}
        {activeNav === "Habits" && <DailyHabitsCard />}
        {activeNav === "Bible" && <BibleReaderCard />}
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
