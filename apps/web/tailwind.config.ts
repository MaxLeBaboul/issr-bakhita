import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        issr: {
          primary: "#0B2238", // Deep Noble Vatican Blue
          "primary-light": "#13416F",
          "primary-dark": "#071625",
          sapphire: "#1D4ED8", // Vibrant Liturgical Sapphire
          "sapphire-light": "#3B82F6",
          gold: "#D97706", // Sacred Gold / Amber
          "gold-light": "#F59E0B",
          "gold-vibrant": "#FBBF24",
          "gold-dark": "#B45309",
          cardinal: "#BE123C", // Cardinal Pontifical Crimson
          "cardinal-light": "#E11D48",
          emerald: "#059669", // Pastoral Emerald
          "emerald-light": "#10B981",
          cream: "#FAF8F5", // Warm Ivory & Parchment
          "cream-dark": "#F3EFEA",
          surface: "#FFFFFF",
          muted: "#64748B",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
