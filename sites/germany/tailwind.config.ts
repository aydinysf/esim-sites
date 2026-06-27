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
          subtle:  "#F5EDD0",
        },
        ink:   "#1C1710",
        ivory: "#F9F6EF",
        stone: "#6B6050",
        sand:  "#EAE3D2",
        card:  "#FFFDF8",

        // keep brand alias for legacy components
        brand: {
          50:  "#F5EDD0",
          100: "#EDD9A0",
          500: "#C4A234",
          600: "#C4A234",
          700: "#A8882A",
          900: "#6B4C14",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        card:  "0 1px 3px rgba(28,23,16,0.06), 0 1px 2px rgba(28,23,16,0.04)",
        lift:  "0 8px 24px rgba(28,23,16,0.10), 0 2px 6px rgba(28,23,16,0.06)",
        gold:  "0 4px 16px rgba(196,162,52,0.25)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        card: "1rem",
        pill: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
