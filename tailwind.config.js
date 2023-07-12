/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      gray: '#C4C4C4',
      primary: '#2430D0',
      textColor: '#A4AFD1',
      dark: '#282F4B',
    },
    extend: {
      backgroundImage: {
        my_bg_image: "url('/leaf.png')",
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
