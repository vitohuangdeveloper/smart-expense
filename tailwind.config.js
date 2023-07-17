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
      secondary: '#F9F9FE',
      third: '#E9EFF7',
      fourth: '#E3E2F9',
      fifth: '#DCEAFF',
      gray: '#a4a4a4',
      secondGray: '#D5DBE1',
      dark: '#282F4B',
      white: '#fff',
      red: '#E95253',
      green: '#089E91',
      yellow: '#E9C42A',
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
