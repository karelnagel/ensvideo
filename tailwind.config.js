/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./remotion/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'workSans': ['Work Sans', ...defaultTheme.fontFamily.sans],
        'sora': ['Sora', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: ["cmyk", "night", "cupcake", "bumblebee", "emerald", "halloween", "forest", "pastel"],
  },
  plugins: [require("daisyui")],
}
