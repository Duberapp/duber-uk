// const sharedConfig = require("ui/tailwind.config");
import sharedConfig from "ui/tailwind";

module.exports = {
  ...sharedConfig,
  content: [
    `./.storybook/**/*.{ts,tsx,js,jsx,html,stories.tsx,stories.jsx}`,
    `./storybook-static/**/*.{ts,tsx,js,jsx,html,stories.tsx,stories.jsx}`,
    "../../packages/*/**/*.{ts,tsx,html,stories.tsx,js,jsx}",
  ],
};
