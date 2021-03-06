module.exports = {
  // mode: "jit",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      inset: {
        '15': '3.75rem',
        '19': '4.75rem'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
}
