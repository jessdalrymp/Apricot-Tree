import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        apricot: {
          50: "#fff6ee",
          100: "#ffe9d5",
          200: "#ffd0a8",
          300: "#ffb072",
          400: "#ff8a3d",
          500: "#f56a1f",
          600: "#e04f14",
          700: "#b93a12",
          800: "#943017",
          900: "#792a16",
        },
        cream: "#fdf8f1",
        ink: "#2c241b",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
