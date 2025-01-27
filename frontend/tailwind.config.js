/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      ringWidth: {
        '3': '3px',
      },
      ringColor: {
        'blue': {
          '400': '#60a5fa',
          '500': '#3b82f6',
        }
      },
      backgroundColor: {
        'dark': '#0f172a',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(49,113,235,0.15)',
        'glow-hover': '0 0 30px rgba(49,113,235,0.25)',
      }
    },
  },
  plugins: [],
}
