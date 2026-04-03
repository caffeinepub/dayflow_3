import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        /* DayFlow semantic tokens */
        df: {
          red: "oklch(0.55 0.22 250)",
          "red-dim": "oklch(0.55 0.22 250 / 0.15)",
          gold: "oklch(0.78 0.16 75)",
          "gold-dim": "oklch(0.78 0.16 75 / 0.15)",
          emerald: "oklch(0.72 0.18 158)",
          "emerald-dim": "oklch(0.72 0.18 158 / 0.15)",
          sky: "oklch(0.72 0.17 225)",
          "sky-dim": "oklch(0.72 0.17 225 / 0.15)",
          violet: "oklch(0.62 0.22 280)",
          "violet-dim": "oklch(0.62 0.22 280 / 0.15)",
          purple: "oklch(0.62 0.22 280)",
          "purple-dim": "oklch(0.62 0.22 280 / 0.15)",
          orange: "oklch(0.75 0.18 50)",
          "orange-dim": "oklch(0.75 0.18 50 / 0.15)",
          green: "oklch(0.76 0.17 155)",
          "green-dim": "oklch(0.76 0.17 155 / 0.15)",
          navy: "oklch(0.11 0.04 245)",
          "navy-mid": "oklch(0.15 0.05 245)",
          "navy-light": "oklch(0.20 0.05 245)",
          text: "oklch(0.96 0.01 240)",
          "text-muted": "oklch(0.60 0.05 240)",
          teal: "oklch(0.55 0.22 250)",
          "teal-dim": "oklch(0.55 0.22 250 / 0.15)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 4px 32px oklch(0.05 0.02 240 / 0.7), inset 0 1px 0 oklch(1 0 0 / 0.06)",
        glow: "0 0 30px oklch(0.55 0.22 250 / 0.35)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in": { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "pop": { "0%": { transform: "scale(1)" }, "50%": { transform: "scale(1.3)" }, "100%": { transform: "scale(1)" } },
        "check-fill": { from: { strokeDashoffset: "20" }, to: { strokeDashoffset: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "pop": "pop 0.3s ease-out",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
