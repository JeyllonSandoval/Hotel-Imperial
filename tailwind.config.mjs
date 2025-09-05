/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        'gray-dark': 'var(--color-gray-dark)',
        'gray-medium': 'var(--color-gray-medium)',
      },
    },
  },
  plugins: [],
}
