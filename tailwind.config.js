/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        maanvi: {
          orange: '#ff6201',
          cream: '#f8efe8',
          sand: '#efe4d6',
          soft: '#ead7c7',
          text: '#241712',
          muted: '#6f5546',
          mutedLight: '#8b6754',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        teluguSerif: ['"Noto Serif Telugu"', 'serif'],
        teluguSans: ['"Noto Sans Telugu"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(80,40,10,0.05)',
        warm: '0 24px 80px rgba(70,35,10,0.10)',
        hero: '0 24px 80px rgba(70,35,10,0.12)',
      },
    },
  },
  plugins: [],
}