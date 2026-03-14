/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#ec5b13",
        "background-light": "#f8f6f6",
        "background-dark": "#110a08",
        "space-accent": "#06b6d4",
        "nebula-purple": "#8b5cf6",
        "obsidian": "#0d0a09",
        "charcoal": "#1a1412",
        "accent-cyan": "#00f2ff",
      },
      fontFamily: {
        "display": ["Public Sans", "sans-serif"]
      },
      animation: {
        'rocket-drift': 'rocket-drift 6s ease-in-out infinite',
      },
      keyframes: {
        'rocket-drift': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(2px, -2px) rotate(2deg)' },
          '50%': { transform: 'translate(0, -4px) rotate(0deg)' },
          '75%': { transform: 'translate(-2px, -2px) rotate(-2deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' },
        }
      }
    },
  },
  plugins: [],
}
