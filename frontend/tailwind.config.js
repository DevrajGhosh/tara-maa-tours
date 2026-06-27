/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:           '#9c3f08',
        'primary-light':   '#bc5721',
        'primary-fixed':   '#ffdbcc',
        secondary:         '#15686f',
        'secondary-light': '#a6eff6',
        tertiary:          '#765700',
        'tertiary-light':  '#ffdfa0',
        surface:           '#fff8f4',
        'surface-low':     '#fcf2eb',
        'surface-mid':     '#f6ece5',
        'surface-high':    '#f0e6df',
        'on-surface':      '#1f1b17',
        'on-surface-var':  '#56423a',
        'outline':         '#8a7268',
        'outline-light':   '#ddc1b5',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['Inter', 'sans-serif'],
      },
      maxWidth: { container: '1280px' },
    },
  },
  plugins: [],
}
