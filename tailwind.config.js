module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        aftrYellow: {
          DEFAULT: '#FFDF6C'
        },
        aftrDarkGrey: {
          light: '#707070',
          DEFAULT: '#3F3F3F',
          dark: '#202020'
        },
        aftrBlue: {
          DEFAULT: '#6C8CFF',
          dark: '#3964FF'
        },
        aftrRed: {
          DEFAULT: '#FF6C8C'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
