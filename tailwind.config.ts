import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#f4efe6",
          secondary: "#ede5d7",
          card: "#fffaf1",
          accent: "#ebe0ce",
        },
        accent: {
          blue: "#1f4e5f",
          amber: "#8a4f2a",
          green: "#556b2f",
        },
        text: {
          primary: "#16120f",
          secondary: "#352d28",
          muted: "#6b6158",
          faint: "#897f75",
        },
        border: {
          DEFAULT: "#b6a793",
          light: "#d0c6b8",
        },
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
