/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F2',
        peach: '#FFAB76',
        peachLight: '#FFE3CC',
        peachDark: '#E8875A',
        warm: '#F5E6D3',
        'app-text': '#3D2B1F',
        textMuted: '#9B7B6E',
        success: '#82C785',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

