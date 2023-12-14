/** @type {import('tailwindcss').Config} */
import sharedConfig from "ui/tailwind";

const config = {
  ...sharedConfig,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "../../packages/*/**/*.{ts,tsx,html,stories.tsx}",
  ],
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tw-elements/dist/plugin"),
  ],
};

export default config;
