module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        aftrYellow: {
          //DEFAULT: '#FFDF6C'
          DEFAULT: '#FFFC79'
        },
        aftrDarkGrey: {
        //   light: '#707070',
        //   DEFAULT: '#3F3F3F',
        //   dark: '#202020'
          light: '#8D98A3',
          DEFAULT: '#484F55',
          //DEFAULT: '#323B3D',
          dark: '#323B3D'
        },
        aftrBlue: {
          DEFAULT: '#6C8CFF',
          dark: '#3964FF'
        },
        aftrRed: {
          DEFAULT: '#FF6C8C'
        },
        aftrGo: {
            light: 'rgba(0, 0, 0, 0.4)',
            DEFAULT: '#00F900',
            dark: 'rgba(0, 0, 0, 0.6)'
        },
        aftrDarkGreen: {
            DEFAULT: '#065F46'
        },
        smoke: {
            DEFAULT: 'rgba(0, 0, 0, 0.5)'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
