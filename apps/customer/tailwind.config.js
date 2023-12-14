/** @type {import('tailwindcss').Config} */
import sharedConfig from "ui/tailwind";

const config = {
  ...sharedConfig,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/*/**/*.{ts,tsx,html,stories.tsx}",
  ],
};

export default config;
