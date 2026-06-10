/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './upsell.html'],
  theme: {
    extend: {
      colors: {
        navy:        '#1B3A6B',
        'navy-2':    '#2E5A9E',
        'navy-deep': '#13294C',
        gold:        '#C9A84C',
        'gold-2':    '#E0C46E',
        'gold-dk':   '#B0902F',
        ink:         '#1A1A2E',
        mist:        '#F0F4FF',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans:  ['"Libre Franklin"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
