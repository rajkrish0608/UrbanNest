/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas:  'var(--color-canvas)',
        surface: 'var(--color-surface)',
        'border-col': 'var(--color-border)',
        cream:   'var(--color-cream)',
        accent:  'var(--color-accent)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card:  '12px',
        ghost: '22.5px',
        pill:  '36px',
      },
    },
  },
  plugins: [],
}
