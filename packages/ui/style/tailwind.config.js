module.exports = function (app, options) {
  let config = {
    content: [
      `../../apps/${app}/src/index.html`,
      `../../apps/${app}/src/**/*.{ts,tsx,html,stories.tsx}`,
      "../../packages/*/src/**/*.{ts,tsx,html,stories.tsx}",
      "../../interface/**/*.{ts,tsx,html,stories.tsx}",

      // Nextjs 12 apps
      `../../apps/${app}/pages/**/*.{ts,tsx,js,jsx,html,stories.tsx}`,
      `../../apps/${app}/components/**/*.{ts,tsx,js,jsx,html,stories.tsx}`,
    ],
    darkMode: ["class"],
    theme: {
      screens: {
        xs: "475px",
        sm: "650px",
        md: "868px",
        lg: "1024px",
        xl: "1280px",
      },
      fontSize: {
        tiny: ".65rem",
        xs: ".75rem",
        sm: ".80rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },

          // from customer repo
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
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },

        // from customer repo
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
        // ----------------------
      },
    },
    plugins: [
      require("tailwindcss-animate"),
      require("tailwind-scrollbar")({ nocompatible: true }),
    ],
    variants: {
      scrollbar: ["rounded"],
    },
  };
  return config;
};
