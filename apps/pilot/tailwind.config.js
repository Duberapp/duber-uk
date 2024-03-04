/** @type {import('tailwindcss').Config} */
import sharedConfig from "ui/tailwind";
import scrollbarPlugin from "tailwind-scrollbar";
import twPlugin from "tw-elements/dist/plugin.cjs";

const config = {
  ...sharedConfig,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "../../packages/*/**/*.{ts,tsx,html,stories.tsx}",
  ],
  plugins: [scrollbarPlugin({ nocompatible: true }), twPlugin],
};

export default config;
