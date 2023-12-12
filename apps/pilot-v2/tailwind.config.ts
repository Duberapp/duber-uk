import sharedConfig from "ui/tailwind";

const config = {
  ...sharedConfig,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/*/**/*.{ts,tsx,html,stories.tsx}",
  ]
}

export default config
