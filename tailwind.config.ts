import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: '#ffffff',
        foreground: '#0a0a0a',

        // UI component colors
        card: {
          DEFAULT: '#ffffff',
          foreground: '#0a0a0a'
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#0a0a0a'
        },
        primary: {
          DEFAULT: '#171717',
          foreground: '#fafafa'
        },
        secondary: {
          DEFAULT: '#f5f5f5',
          foreground: '#171717'
        },
        muted: {
          DEFAULT: '#f5f5f5',
          foreground: '#737373'
        },
        accent: {
          DEFAULT: '#f5f5f5',
          foreground: '#171717'
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#fafafa'
        },

        // Utility colors
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#0a0a0a',

        // Chart colors
        chart: {
          '1': '#f97316', // orange-500
          '2': '#0ea5e9', // sky-500
          '3': '#14b8a6', // teal-500
          '4': '#eab308', // yellow-500
          '5': '#f43f5e'  // rose-500
        },

        // Additional colors from the codebase
        gray: {
          300: '#d1d5db',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        },
        orange: {
          100: '#ffedd5',
          200: '#fedaaa',
          300: '#fdba74',
          500: '#f97316',
          600: '#ea580c',
          900: '#7c2d12'
        },
        blue: {
          100: '#dbeafe',
          600: '#2563eb'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [typography, tailwindcssAnimate],
} satisfies Config;