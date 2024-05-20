/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.html',
    './public/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#275B52',
        'custom-black': '#1E1E1E',
        'custom-green-square-dark': '#678C85',
        'custom-green-square-light': '#7D9C97',
      },
      fontFamily: {
        'serif': ['"Inknut Antiqua"', 'serif'],
        'libre': ['"Libre Baskerville"', 'serif']
      },
      spacing: {
        '7.5': '30px',
        '600': '600px'
      }
    },
  },
  plugins: [],
}

