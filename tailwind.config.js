/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,tsx,jsx,ts,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
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
