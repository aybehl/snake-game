/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#275B52',
        'custom-black': '#1E1E1E'
      },
      fontFamily: {
        'serif': ['"Inknut Antiqua"', 'serif']
      }
    },
  },
  plugins: [],
}

