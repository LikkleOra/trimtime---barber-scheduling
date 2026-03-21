/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        yellow: '#fbd600',
        'red-bright': '#b32b2b',
        'red-dark': '#3e2723',
      },
      fontFamily: {
        'brand': ['Anton', 'sans-serif'],
        'condensed': ['Big Shoulders Display', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
