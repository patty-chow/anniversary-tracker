/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'beat': 'beat 1s infinite',
        'float': 'float 3s infinite',
        'crumb': 'crumb 0.5s ease-out forwards',
        'fortune': 'fortune 2s ease-out forwards',
      },
      fontFamily: {
        pixel: ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
};