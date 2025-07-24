/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dot-grid': "radial-gradient(currentColor 1px, transparent 1px)",
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
