import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveUpDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        moveLeftRight: {
          '0%, 100%': {transform : 'translateX(0)'},
          '50%': {transform : 'translateX(6px)'}
        },
        shadowGlow: {
          '0%, 100%': { boxShadow: '0 0 5px teal' },
          '50%': { boxShadow: '0 0 35px teal' }
        },
        textGlow: {
          '0%, 100%': { textShadow: '0 0 var(--glow-size, 10px) var(--glow-color, #217594), 0 0 var(--glow-size, 20px) var(--glow-color, #217594), 0 0 var(--glow-size, 30px) var(--glow-color, #217594)' },
          '50%': { textShadow: '0 0 var(--glow-size, 20px) var(--glow-color, #217594), 0 0 var(--glow-size, 30px) var(--glow-color, #217594), 0 0 var(--glow-size, 40px) var(--glow-color, #217594)' },
        },
      },
      animation: {
        moveUpDown: 'moveUpDown 2s infinite',
        shadowGlow: 'shadowGlow 3s infinite',
        textGlow: 'textGlow 3s infinite',
        moveLeftRight: "moveLeftRight 2s infinite"
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-glow': {
          textShadow: '0 0 10px var(--color, rgba(255, 255, 255, 0.8)), 0 0 20px var(--color, rgba(255, 255, 255, 0.6)), 0 0 30px var(--color, rgba(255, 255, 255, 0.4))',
        },
        '.borderOuter': {
          'border-color': "#217594"
        },
        '.borderInner': {
          'border-color': "#46AFD5"
        },
        '.bodyDark': {
          'background-color' : "#051217"
        },
        '.bodyLight': {
          'background-color' : "#0F3340"
        },
        '.bodyButtonBlue': {
          'background-color' : "#2B96BD"
        }
      });
    },
    daisyui,
  ],
}