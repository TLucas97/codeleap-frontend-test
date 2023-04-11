/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      card: '800px',
      smaller: '400px',
    },
    extend: {
      colors: {
        metal: '#DDDDDD',
        primary: '#7695EC',
        success: '#47B960',
        danger: '#FF5151',
        ghost: '#ffffff',
        sand: '#999999',
        deeperSand: '#777777',
      },
      keyframes: {
        zoomIn: {
          '0%': {
            scale: '0.5',
          },
          '100%': {
            scale: '1',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        zoomIn: 'zoomIn 0.5s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
};
