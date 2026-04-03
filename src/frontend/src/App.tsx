import { Toaster } from "@/components/ui/sonner";
import {
  BookMarked,
  BookOpen,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Library,
  Star,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
  activeColor: string;
  indicatorColor: string;
  hoverBg: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Devotion",
    icon: BookMarked,
    activeColor: "text-df-gold",
    indicatorColor: "oklch(0.78 0.16 75)",
    hoverBg: "hover:bg-amber-50",
  },
  {
    label: "Tasks",
    icon: CheckSquare,
    activeColor: "text-blue-600",
    indicatorColor: "oklch(0.55 0.22 250)",
    hoverBg: "hover:bg-blue-50",
  },
  {
    label: "Bible",
    icon: Library,
    activeColor: "text-df-sky",
    indicatorColor: "oklch(0.72 0.17 225)",
    hoverBg: "hover:bg-sky-50",
  },
  {
    label: "Habits",
    icon: Star,
    activeColor: "text-df-emerald",
    indicatorColor: "oklch(0.72 0.18 158)",
    hoverBg: "hover:bg-emerald-50",
  },
  {
    label: "Journal",
    icon: BookOpen,
    activeColor: "text-df-violet",
    indicatorColor: "oklch(0.62 0.22 280)",
    hoverBg: "hover:bg-violet-50",
  },
];

const TAB_DISPLAY: Record<string, string> = {
  Devotion: "Daily Devotion",
  Tasks: "My Day Tasks",
  Bible: "Bible",
  Habits: "Habits",
  Journal: "Journal",
};

function getDayOfYear(date: Date): number {
  return Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  );
}

interface SlimHeaderProps {
  dateStr: string;
  isToday: boolean;
  onPrevDay: () => void;
  onNextDay: () => void;
  onBackToToday: () => void;
}

function SlimHeader({
  dateStr,
  isToday,
  onPrevDay,
  onNextDay,
  onBackToToday,
}: SlimHeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
      aria-label="DayFlow header"
    >
      <div className="flex items-center gap-3 px-4 lg:px-6 h-12">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "oklch(0.55 0.22 250 / 0.12)" }}
          >
            <Zap className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-bold text-gray-900 tracking-tight hidden sm:block">
            DayFlow
          </span>
        </div>

        <div className="w-px h-5 bg-gray-200 mx-1 hidden sm:block" />

        {/* Date selector pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 border border-gray-200 bg-gray-50 rounded-full px-1 py-0.5 shadow-sm">
            <button
              type="button"
              onClick={onPrevDay}
              data-ocid="nav.prev_day.button"
              aria-label="Previous day"
              className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex flex-col items-center px-2 min-w-[120px] lg:min-w-[160px]">
              <span className="text-xs font-semibold text-gray-800 tracking-tight leading-tight">
                {dateStr}
              </span>
              {isToday && (
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none mt-0.5"
                  style={{
                    color: "oklch(0.55 0.22 250)",
                    background: "oklch(0.55 0.22 250 / 0.1)",
                  }}
                >
                  Today
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onNextDay}
              data-ocid="nav.next_day.button"
              aria-label="Next day"
              className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <AnimatePresence>
            {!isToday && (
              <motion.button
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                type="button"
                onClick={onBackToToday}
                data-ocid="nav.today.button"
                className="text-[11px] text-blue-600 hover:text-blue-500 font-semibold transition-colors hover:underline underline-offset-2 whitespace-nowrap"
              >
                Back to Today
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1" />

        {/* Live badge */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1 whitespace-nowrap">
          <span className="relative flex w-1.5 h-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
          </span>
          <span className="hidden sm:inline">Live</span>
        </div>
      </div>
    </header>
  );
}

interface BottomDockProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

function BottomDock({ activeNav, setActiveNav }: BottomDockProps) {
  return (
    <nav
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
      aria-label="Page navigation"
    >
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-full bg-white/90 backdrop-blur-xl"
        style={{
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)",
        }}
      >
        {NAV_ITEMS.map(({ label, icon: Icon, indicatorColor }) => {
          const isActive = activeNav === label;
          const displayName = TAB_DISPLAY[label] ?? label;
          // Build pill background color by injecting opacity into oklch
          const pillBg = indicatorColor.endsWith(")")
            ? `${indicatorColor.slice(0, -1)} / 0.12)`
            : indicatorColor;
          const pillBorder = indicatorColor.endsWith(")")
            ? `${indicatorColor.slice(0, -1)} / 0.25)`
            : indicatorColor;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActiveNav(label)}
              data-ocid={`nav.${label.toLowerCase()}.tab`}
              aria-current={isActive ? "page" : undefined}
              aria-label={displayName}
              className="relative flex flex-col items-center justify-center gap-0.5 px-3 sm:px-4 py-1.5 rounded-full min-w-[52px] sm:min-w-[64px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {/* Animated active pill background */}
              {isActive && (
                <motion.span
                  layoutId="dock-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: pillBg,
                    boxShadow: `0 0 0 1px ${pillBorder}`,
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                />
              )}

              {/* Icon — wrapped in a colored span since Icon only accepts className */}
              <span
                className="relative z-10 w-5 h-5 flex items-center justify-center transition-colors duration-150"
                style={{
                  color: isActive ? indicatorColor : "oklch(0.6 0.01 250)",
                }}
              >
                <Icon className="w-5 h-5" />
              </span>

              {/* Label */}
              <span
                className="relative z-10 text-[10px] font-semibold leading-none whitespace-nowrap transition-colors duration-150 max-w-[56px] sm:max-w-none truncate"
                style={{
                  color: isActive ? indicatorColor : "oklch(0.65 0.01 250)",
                }}
              >
                {label === "Devotion" ? "Devotion" : displayName}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Devotion");
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
    <div className="min-h-screen flex flex-col bg-[#fafaf8]">
      <Toaster position="top-right" />

      {/* Slim sticky header */}
      <SlimHeader
        dateStr={dateStr}
        isToday={isToday}
        onPrevDay={goToPrevDay}
        onNextDay={goToNextDay}
        onBackToToday={() => setSelectedDate(new Date())}
      />

      {/* Quote centrepiece */}
      <div className="px-5 lg:px-8 pt-8 pb-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative pl-5"
        >
          <span
            className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full"
            style={{ background: "oklch(0.55 0.22 250 / 0.7)" }}
          />
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

      {/* Main content area — pb-28 so content clears the floating dock */}
      <main className="px-5 lg:px-8 pb-28 flex-1">
        {activeNav === "Devotion" && (
          <motion.div
            key="devotion"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <DevotionCard dayOfYear={dayOfYear} />
          </motion.div>
        )}
        {activeNav === "Tasks" && (
          <motion.div
            key="tasks"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <TasksCard dateKey={dateKey} />
          </motion.div>
        )}
        {activeNav === "Bible" && (
          <motion.div
            key="bible"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <BibleReaderCard />
          </motion.div>
        )}
        {activeNav === "Habits" && (
          <motion.div
            key="habits"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <DailyHabitsCard />
          </motion.div>
        )}
        {activeNav === "Journal" && (
          <motion.div
            key="journal"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <JournalCard dateKey={dateKey} />
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-4 bg-white mb-20">
        <div className="px-5 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs text-gray-400 font-medium">DayFlow</span>
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()}. Built with \u2665 using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* Floating bottom dock */}
      <BottomDock activeNav={activeNav} setActiveNav={setActiveNav} />
    </div>
  );
}
