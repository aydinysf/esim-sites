import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C4A234",
          dark:    "#A8882A",
          light:   "#EDD96A",
          pale:    "#FEF9E7",
          subtle:  "#FEF9E7",  // backwards compat alias
        },
        ink: "#0F172A",
        // modern cool neutrals
        muted:   "#475569",
        faint:   "#94A3B8",
        // legacy aliases → now cool-toned
        stone:   "#475569",
        sand:    "#E2E8F0",
        ivory:   "#F1F5F9",
        card:    "#FFFFFF",
        border:  "#E2E8F0",
        surface: "#FFFFFF",
        // brand scale kept for admin components
        brand: {
          50:  "#FEF9E7",
          100: "#FDE68A",
          500: "#C4A234",
          600: "#C4A234",
          700: "#A8882A",
          900: "#6B4C14",
        },
      },
      fontFamily: {
        sans:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card:  "0 1px 3px rgba(15,23,42,0.05), 0 1px 2px rgba(15,23,42,0.03)",
        lift:  "0 8px 28px rgba(15,23,42,0.10), 0 2px 8px rgba(15,23,42,0.05)",
        gold:  "0 4px 16px rgba(196,162,52,0.22)",
        "gold-lg": "0 8px 32px rgba(196,162,52,0.28)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        card: "0.875rem",
        pill: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
