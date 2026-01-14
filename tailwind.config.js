/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#050A18', // Deepest blue almost black
        'brand-blue': '#1e3a8a', // Deep Blue
        'brand-purple': '#d946ef', // Neon Fuchsia
        'brand-neon': '#8b5cf6', // Neon Violet
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // We will add Inter via Google Fonts in HTML
        heading: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
