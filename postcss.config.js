const purgecss = require('@fullhuman/postcss-purgecss')

const devConfig = {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss')
  ],
}
const prodConfig = {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
    purgecss({
      content: ['./**/*.tsx', './**/*.ts']
    })
  ],
}

const getProdConfig = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
    purgecss({
      content: ['./**/*.tsx', './**/*.ts']
    })
  ],
}