/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../apps/web/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2FBFE',
          100: '#C9EEFD',
          200: '#9FE2FB',
          300: '#75D5FA',
          400: '#4BC8F8',
          500: '#22BBF7',
          600: '#1B96C5',
          700: '#157294',
          800: '#0E4D62',
          900: '#072931'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
