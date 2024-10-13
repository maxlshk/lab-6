/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'radial-blur': "radial-gradient(ellipse 50% 100% at center , #ffff, #ffff, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))",
        'radial-blur-lg': "radial-gradient(ellipse 70% 120% at center , #ffff, #ffff, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))",
      },
      backgroundColor: {
        "primary": '#DEF4C6',
        'secondary': '#B1CF5F',
        'danger': '#1B512D',
        'neutral': '#a3b18a',
        'sidebar': '#dad7cd'
      },
      textColor: {
        'neutral': '#dad7cd',
        'danger': '#1B512D',
        'accent': '#588157',
      },
      zIndex: {
        "-1": "-1",
      },
      animation: {
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}

