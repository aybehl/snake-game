/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.html',
    './public/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#1E1E1E',
        'custom-green-dark': '#678C85',
        'custom-green-light': '#7D9C97',
        'custom-green': '#275B52',
        'custom-green-snake': '#275B52',
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

