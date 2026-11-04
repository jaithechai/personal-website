import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: Object.fromEntries(
        [
          "sheet",
          "ink",
          "ink-2",
          "symbol-fill",
          "symbol-line",
          "wire",
          "wire-text",
          "pin",
          "sheet-line",
        ].map((name) => [name, `var(--${name})`]),
      ),
      fontFamily: {
        sans: ["var(--font-archivo)", "sans-serif"],
        mono: ["var(--font-martian)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
