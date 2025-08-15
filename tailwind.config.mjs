/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'custom-white': '#FFFFFF',
        'custom-black': '#161616',
        'custom-lightgray': '#BDBDBD',
        'custom-green': '#13B41E',
      },
    },
  },
  plugins: [],
}
