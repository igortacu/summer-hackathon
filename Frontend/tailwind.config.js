/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary palette — warm brown gradient
        primary: {
          50:  '#FFEDB8',
          100: '#F3D5B5',
          200: '#E7BC91',
          300: '#D4A276',
          400: '#BC8A5F',
          500: '#A47148',
          600: '#8B5E34',
          700: '#6F4518',
          800: '#603808',
          900: '#583101',
        },
        // Secondary palette — a slightly softer brown ramp
        secondary: {
          50:  '#F3D5B5',
          100: '#E7BC91',
          200: '#D4A276',
          300: '#BC8A5F',
          400: '#A47148',
          500: '#8B5E34',
          600: '#6F4518',
          700: '#603808',
          800: '#583101',
          900: '#4B2900',
        },
        // Accent (tertiary) — the lightest end of the brown scale
        accent: {
          50:  '#E7BC91',
          100: '#D4A276',
          200: '#BC8A5F',
          300: '#A47148',
          400: '#8B5E34',
          500: '#6F4518',
          600: '#603808',
          700: '#583101',
          800: '#4B2900',
          900: '#3D1F00',
        },
        // Keep other palettes as before (or remove if you don't need them)
        /* success: { ... },
           warning: { ... },
           error:   { ... }, */
      },
    },
  },
  plugins: [],
}
