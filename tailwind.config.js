/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        clash: ['"Clash Display"', '"Outfit"', 'sans-serif'],
        sohne: ['sohne', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        cabinet: ['"Cabinet Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
