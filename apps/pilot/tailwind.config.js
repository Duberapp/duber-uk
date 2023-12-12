import sharedConfig from "ui/tailwind.config";

module.exports = {
  ...sharedConfig,
  content: [
    `./pages/**/*.{ts,tsx,js,jsx,html}`,
    `./components/**/*.{ts,tsx,js,jsx,html}`,
    "../../packages/*/**/*.{ts,tsx,html,stories.tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        skyBlue: "#007AFF",
        primaryBlue: "#2263DF",
        primaryBlueLight: "#D9E8FF",
        primaryTeal: "#00ddc3",
        primaryTealLight: "#DCF7F4",
        navyBlue: "#0B2C60",
        primaryPink: "#E23DCB",
        primaryPurple: "#2F51B4",
        primaryGray: "#697598",
      },
      boxShadow: {
        card: "0 0.6px 5.5px -1px rgba(0, 0, 0, 0.3)",
        box: "0 0 32px -2px rgba(0, 0, 0, 0.15)",
        sharp: "0px 0px 7px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        enter: "fadeInRight 300ms ease-out",
        leave: "fadeOutLeft 300ms ease-in",
      },
      keyframes: {
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translate(2rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(0)",
          },
        },
        fadeOut: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
    },
  },
};
