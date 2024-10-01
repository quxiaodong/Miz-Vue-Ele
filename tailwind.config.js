/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      md: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      lg: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      xl: { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      '2xl': { min: '1536px' }
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: []
}
