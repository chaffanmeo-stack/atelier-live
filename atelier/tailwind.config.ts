import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ivory: "#F7F3EA", charcoal: { DEFAULT: "#1C1C1E", soft: "#2A2A2D" }, gold: { DEFAULT: "#B8975A", light: "#D9C08C", deep: "#8C6F3A" } },
      fontFamily: { serif: ["var(--font-cormorant)", "serif"], sans: ["var(--font-inter)", "sans-serif"] },
      letterSpacing: { luxe: "0.22em" },
      screens: { "3xl": "1920px", "4k": "2560px" },
      transitionTimingFunction: { luxe: "cubic-bezier(0.22,1,0.36,1)" },
    },
  },
  plugins: [],
} satisfies Config;