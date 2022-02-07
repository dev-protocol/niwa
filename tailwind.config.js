const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        link: '#00A3FF'
      },
      gradientColorStops: theme => ({
        primary: '#3b82f6',
        secondary: '#0891b2'
      })
    }
  },
  plugins: []
}
