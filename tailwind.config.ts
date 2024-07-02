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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      height: {
        "calc-100vh-minus-80": "calc(100vh - 80px)",
      },
      backgroundImage: {
        "img-gradient-blue-purple":
          "linear-gradient(to right, #4F46E5, #8C43FF)",
      },
    },
  },
  plugins: [],
};
export default config;
