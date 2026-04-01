import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw, Timer } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const MODES = {
  work: { label: "Focus", duration: 25 * 60, color: "oklch(0.78 0.14 185)" },
  shortBreak: {
    label: "Short Break",
    duration: 5 * 60,
    color: "oklch(0.75 0.18 50)",
  },
  longBreak: {
    label: "Long Break",
    duration: 15 * 60,
    color: "oklch(0.76 0.17 155)",
  },
};
type ModeKey = keyof typeof MODES;

const R = 56;
const CIRC = 2 * Math.PI * R;

export default function PomodoroCard() {
  const [mode, setMode] = useState<ModeKey>("work");
  const [timeLeft, setTimeLeft] = useState(MODES.work.duration);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { duration, color } = MODES[mode];
  const progress = timeLeft / duration;
  const dashOffset = CIRC * (1 - progress);

  const reset = useCallback(() => {
    setRunning(false);
    setTimeLeft(MODES[mode].duration);
  }, [mode]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-df-navy-mid shadow-card card-glow flex flex-col h-full min-h-[340px] p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-df-orange-dim flex items-center justify-center">
          <Timer className="w-4 h-4 text-df-orange" />
        </div>
        <h3 className="text-sm font-semibold text-df-text">Pomodoro Timer</h3>
      </div>

      {/* Mode selector */}
      <div className="flex gap-1 mb-6 bg-df-navy-light rounded-xl p-1">
        {(Object.keys(MODES) as ModeKey[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            data-ocid={`pomodoro.${m}.tab`}
            className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-all ${
              mode === m
                ? "bg-df-navy-mid text-df-text shadow"
                : "text-df-text-muted hover:text-df-text"
            }`}
          >
            {MODES[m].label}
          </button>
        ))}
      </div>

      {/* Timer ring */}
      <div className="flex flex-col items-center gap-5 flex-1">
        <div className="relative w-36 h-36">
          <svg
            width="144"
            height="144"
            viewBox="0 0 144 144"
            className="-rotate-90"
            aria-label="Timer progress"
          >
            <title>Timer progress ring</title>
            <circle
              cx="72"
              cy="72"
              r={R}
              fill="none"
              stroke="oklch(0.22 0.05 240)"
              strokeWidth="8"
            />
            <circle
              cx="72"
              cy="72"
              r={R}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={dashOffset}
              style={{
                transition: running
                  ? "stroke-dashoffset 1s linear"
                  : "stroke-dashoffset 0.3s ease",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold text-df-text tabular-nums">
              {mins}:{secs}
            </span>
            <span className="text-xs text-df-text-muted mt-0.5">
              {MODES[mode].label}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={reset}
            data-ocid="pomodoro.reset.button"
            className="border-white/[0.1] bg-transparent text-df-text-muted hover:text-df-text hover:bg-white/[0.05] h-9 w-9 p-0"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => setRunning((r) => !r)}
            data-ocid={
              running ? "pomodoro.pause.button" : "pomodoro.start.button"
            }
            className="px-6 h-9 font-semibold text-sm"
            style={{ background: color, color: "oklch(0.12 0.035 240)" }}
          >
            {running ? (
              <>
                <Pause className="w-4 h-4 mr-1" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" /> Start
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-df-text-muted">
          {timeLeft === 0
            ? "\u2705 Session complete!"
            : running
              ? "Stay focused\u2026"
              : "Ready when you are"}
        </p>
      </div>
    </div>
  );
}
