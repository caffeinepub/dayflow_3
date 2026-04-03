import { Toaster } from "@/components/ui/sonner";
import {
  BookMarked,
  BookOpen,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Library,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import BibleReaderCard from "./components/BibleReaderCard";
import DailyHabitsCard from "./components/DailyHabitsCard";
import DevotionCard from "./components/DevotionCard";
import JournalCard from "./components/JournalCard";
import TasksCard from "./components/TasksCard";

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

type NavItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    color: "text-df-red",
    bgColor: "bg-df-red/10",
    borderColor: "border-l-[3px] border-l-df-red",
  },
  {
    label: "Bible",
    icon: Library,
    color: "text-df-sky",
    bgColor: "bg-df-sky/10",
    borderColor: "border-l-[3px] border-l-df-sky",
  },
  {
    label: "Journal",
    icon: BookOpen,
    color: "text-df-violet",
    bgColor: "bg-df-violet/10",
    borderColor: "border-l-[3px] border-l-df-violet",
  },
  {
    label: "Tasks",
    icon: CheckSquare,
    color: "text-df-red",
    bgColor: "bg-df-red/10",
    borderColor: "border-l-[3px] border-l-df-red",
  },
  {
    label: "Devotion",
    icon: BookMarked,
    color: "text-df-gold",
    bgColor: "bg-df-gold/10",
    borderColor: "border-l-[3px] border-l-df-gold",
  },
  {
    label: "Habits",
    icon: Star,
    color: "text-df-emerald",
    bgColor: "bg-df-emerald/10",
    borderColor: "border-l-[3px] border-l-df-emerald",
  },
];

function getDayOfYear(date: Date): number {
  return Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  );
}

interface SideRailProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

function SideRail({ activeNav, setActiveNav }: SideRailProps) {
  return (
    <aside
      className="fixed left-0 top-0 h-full z-30 flex flex-col border-r border-gray-200 w-14 lg:w-[220px]"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.995 0.005 80) 0%, oklch(0.975 0.01 75) 100%)",
      }}
      aria-label="Side navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 lg:px-5 h-14 border-b border-gray-200 flex-shrink-0">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "oklch(0.55 0.22 250 / 0.15)" }}
        >
          <Zap className="w-4 h-4 text-df-red" />
        </div>
        <span className="text-base font-semibold text-gray-900 tracking-tight hidden lg:block whitespace-nowrap">
          DayFlow
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 lg:px-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, color, bgColor, borderColor }) => {
          const isActive = activeNav === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActiveNav(label)}
              data-ocid={`nav.${label.toLowerCase()}.tab`}
              title={label}
              className={[
                "group flex items-center gap-3 rounded-lg px-2.5 lg:px-3 py-2.5 text-sm font-medium transition-all duration-150 w-full text-left relative",
                isActive
                  ? `${bgColor} ${color} ${borderColor}`
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100/80 border-l-[3px] border-l-transparent",
              ].join(" ")}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={[
                  "w-4 h-4 flex-shrink-0 transition-colors",
                  isActive ? color : "text-gray-400 group-hover:text-gray-600",
                ].join(" ")}
              />
              <span className="hidden lg:block leading-none">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer branding */}
      <div className="px-3 py-4 border-t border-gray-200 flex-shrink-0 hidden lg:block">
        <p className="text-[10px] text-gray-400 leading-tight">
          Built with ♥ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-df-red hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </aside>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

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
    <div className="flex min-h-screen">
      <Toaster position="top-right" />

      {/* Fixed side rail */}
      <SideRail activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Main content — offset by sidebar width */}
      <div className="flex-1 flex flex-col ml-14 lg:ml-[220px] min-w-0">
        {/* Header — simplified, date nav only */}
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
          <div className="px-5 lg:px-8 h-14 flex items-center gap-4">
            {/* Date selector pill */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border border-gray-200 bg-white rounded-full px-1.5 py-1 shadow-sm">
                <button
                  type="button"
                  onClick={goToPrevDay}
                  data-ocid="nav.prev_day.button"
                  aria-label="Previous day"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-df-red/[0.08] transition-all duration-150"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <div className="flex flex-col items-center min-w-[140px] lg:min-w-[180px] px-1">
                  <span className="text-sm font-semibold text-gray-900 tracking-tight leading-snug">
                    {dateStr}
                  </span>
                  {isToday && (
                    <span className="text-[10px] font-semibold text-df-red bg-df-red/10 px-2 py-0.5 rounded-full leading-none mt-0.5 ring-1 ring-df-red/20">
                      Today
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={goToNextDay}
                  data-ocid="nav.next_day.button"
                  aria-label="Next day"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-df-red/[0.08] transition-all duration-150"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {!isToday && (
                <motion.button
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  type="button"
                  onClick={() => setSelectedDate(new Date())}
                  data-ocid="nav.today.button"
                  className="text-xs text-df-red hover:text-df-red/70 font-medium transition-colors hover:underline underline-offset-2"
                >
                  Back to Today
                </motion.button>
              )}
            </div>

            <div className="flex-1" />

            {/* Live badge */}
            <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 whitespace-nowrap">
              <span className="relative flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-df-green opacity-60" />
                <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-df-green" />
              </span>
              Live
            </div>
          </div>
        </header>

        {/* Quote centrepiece */}
        <div className="px-5 lg:px-8 pt-8 pb-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative pl-5"
          >
            {/* Blue left accent bar */}
            <span
              className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full"
              style={{ background: "oklch(0.55 0.22 250 / 0.7)" }}
            />
            {/* Faint decorative quote mark */}
            <span
              className="absolute -top-4 -left-1 text-[6rem] leading-none font-serif select-none pointer-events-none"
              style={{ color: "oklch(0.55 0.22 250 / 0.06)" }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-800 leading-snug tracking-tight max-w-3xl relative"
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontStyle: "italic",
              }}
            >
              &ldquo;{quote}&rdquo;
            </h2>
          </motion.div>
        </div>

        {/* Main content area */}
        <main className="px-5 lg:px-8 pb-10 flex-1">
          {/* Dashboard: featured two-column layout */}
          {activeNav === "Dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
              {/* Left main column — Bible Reader + Journal (featured / taller) */}
              <div className="flex flex-col gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="min-h-[520px] flex flex-col"
                >
                  <BibleReaderCard />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="min-h-[520px] flex flex-col"
                >
                  <JournalCard dateKey={dateKey} />
                </motion.div>
              </div>

              {/* Right side column — Tasks, Habits, Devotion (compact) */}
              <div className="flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <TasksCard dateKey={dateKey} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <DailyHabitsCard />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <DevotionCard dayOfYear={dayOfYear} />
                </motion.div>
              </div>
            </div>
          )}

          {/* Individual views */}
          {activeNav === "Tasks" && <TasksCard dateKey={dateKey} />}
          {activeNav === "Journal" && <JournalCard dateKey={dateKey} />}
          {activeNav === "Devotion" && <DevotionCard dayOfYear={dayOfYear} />}
          {activeNav === "Habits" && <DailyHabitsCard />}
          {activeNav === "Bible" && <BibleReaderCard />}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-4">
          <div className="px-5 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-df-red" />
              <span className="text-xs text-gray-400 font-medium">DayFlow</span>
            </div>
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()}. Built with \u2665 using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-df-red hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
