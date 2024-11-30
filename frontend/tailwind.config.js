/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // screens: {
      //   'lg-custom': '1100px', // Custom breakpoint for 1100px
      // },
      keyframes: {
        text: {
          '0%': { width: '0%', color: 'white' },
          '50%': { width: '100%', color: '#cab3fe' },
          '100%': { width: '0%', color: 'white' },
        },
      },
      animation: {
        text: 'text 2s linear infinite',
      },
    },
  },
  plugins: [],
}