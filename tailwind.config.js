/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'scan-line': 'scan-line 2s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.5s ease-in-out infinite',
      },
      keyframes: {
        'scan-line': {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(1.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}