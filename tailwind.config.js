/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: '#2430D0',
      secondary: '#F4F4FC',
      gray: '#a4a4a4',
      secondGray: '#D5D8E1',
      dark: '#282F4B',
      white: '#fff',
      red: '#FA4778',
      green: '#2BDE73',
      yellow: '#FFE812',
    },
    extend: {
      backgroundImage: {
        my_bg_image: "url('/leaf.png')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
