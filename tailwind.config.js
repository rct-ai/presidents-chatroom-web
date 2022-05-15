const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      ...colors,
      'primary': '#F3B922',
      'primary-shadow': '#7E5F0D',
      'primary-hover': '#F2CB66',
      'primary-disable': '#B6B1A6',
      'primary-disable-shadow': '#959186',
      'black-top': '#2F393D',
      'black-body': '#0D1517',
      'black-subtop': '#2C3234',
      'black-text': '#172023',
      'black-hover': '#474E50'
    },
  },
  plugins: [],
}
