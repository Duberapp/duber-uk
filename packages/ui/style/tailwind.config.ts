import type { Config } from "tailwindcss";

// import tailwindcssAnimatePlugin from "tailwindcss-animate";

import tailwindcssScrollbar from "tailwind-scrollbar";
const tailwindcssScrollbarPlugin = tailwindcssScrollbar({ nocompatible: true })

let config: Config = {
  content: [
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

        // Customize Colors
        "duber-navyBlue": {
          DEFAULT: "hsl(var(--navy-blue))",
          dark: "hsl(var(--navy-blue-dark))",
        },
        "duber-skyBlue": {
          DEFAULT: "hsl(var(--sky-blue))",
          dark: "hsl(var(--sky-blue-dark))",
          light: "hsl(var(--sky-blue-light))",
          low: "hsl(var(--sky-blue-low))",
        },
        "duber-teal": {
          DEFAULT: "hsl(var(--teal-primary))",
          dark: "hsl(var(--teal-dark))",
          light: "hsl(var(--teal-light))",
        },
        "duber-pink": {
          DEFAULT: "hsl(var(--pink-primary))",
          dark: "hsl(var(--pink-dark))",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    tailwindcssScrollbarPlugin
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};

export default config
