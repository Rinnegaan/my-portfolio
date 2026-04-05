import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          primary: "var(--accent-primary)",
          secondary: "var(--accent-secondary)",
          glow: "var(--accent-glow)",
        },
        glass: {
          bg: "var(--glass-bg)",
          border: "var(--glass-border)",
        }
      },
      fontFamily: {
        sans: ["var(--font-rajdhani)"],
        mono: ["var(--font-jetbrains)"],
        heading: ["var(--font-orbitron)"],
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(rgba(0,229,255,0.05) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
} satisfies Config;
