/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}