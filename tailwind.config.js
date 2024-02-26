/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'abril-fatface': ['"Abril Fatface"', 'cursive'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'open-sans': ['"Open Sans"', 'sans-serif']
      },
    },
  },
  plugins: [],
}
