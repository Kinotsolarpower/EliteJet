/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0C1B2A',
        'secondary': '#27AE60',
        'accent': '#1F2937', // A slightly lighter dark for cards
        'accent-dark': '#111827'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        condensed: ['Roboto Condensed', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    }
  },
  plugins: [],
}
