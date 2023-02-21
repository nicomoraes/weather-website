/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.center': {
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
      })
    },
  ],
}