module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',},
      animation: {'bounce-slow': 'bounce 2s infinite', 'marquee': 'marquee 28s linear infinite'},
      keyframes: { marquee: {'0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' },},},
    },
  },
  plugins: [],
}
