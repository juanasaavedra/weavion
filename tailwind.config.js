const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'star-movement-bottom': 'star-movement-bottom 6s linear infinite alternate',
        'star-movement-top': 'star-movement-top 6s linear infinite alternate',
      },
      keyframes: {
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '0.7' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '0.7' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
      },
      fontFamily: {
        sans: ['arial-nova', ...defaultTheme.fontFamily.sans],
        argent: ['argent-pixel-cf', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary': '#D6D6D6',
        'secondary': '#FFD100',
        'accent': '#FFEE32',
        'dark': '#202020',
        'medium': '#333533'
      },
    },
  },
  plugins: [],
}