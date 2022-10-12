/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ["./*.html", "./*.js", "./layout/*.html"],
  theme: {
    extend: {
      screens: {
        xs: '400px'
      },
      lineHeight: {
        '12': '3rem',
        '14': '4rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
