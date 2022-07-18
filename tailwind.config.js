/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro, tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      container: {
        padding: {
          DEFAULT: '2.25rem',
        },
      },
    },
  },
  plugins: [],
};
