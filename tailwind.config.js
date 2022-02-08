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
      }),
      borderRadius: {},
      padding: {},
      margin: {},
      spacing: {
        sm: '1rem',
        md: '2rem',
        lg: '3rem',
        xl: '4rem'
      },
      fontFamily: {
        body: ['Syne', 'sans-serif']
      },
      fontSize: {},
      fontWeight: {},
      lineHeight: {},
      backgroundImage: {
        'heading-texture': "url('/src/img/HEADING_TEXTURE.png')"
      }
    }
  },
  plugins: []
}
