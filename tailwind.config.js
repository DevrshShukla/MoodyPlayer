/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4ade80', // green-400
          DEFAULT: '#22c55e', // green-500
          dark: '#16a34a', // green-600
        },
        dark: {
          bg: '#121212',
          card: '#1e1e1e',
          text: '#ffffff'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
