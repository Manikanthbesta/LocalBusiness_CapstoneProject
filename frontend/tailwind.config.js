/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'zoom-in-out': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '0.9',
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0)'
          },
          '50%': { 
            transform: 'translateY(-10px)'
          },
        },
        scaleX: {
          '0%': { 
            transform: 'scaleX(0)'
          },
          '100%': { 
            transform: 'scaleX(1)'
          },
        },
        bounceSlight: {
          '0%, 100%': { 
            transform: 'translateY(0)'
          },
          '50%': { 
            transform: 'translateY(-5px)'
          },
        },
        fadeInRight: {
          '0%': { 
            transform: 'translateX(-20px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1'
          },
        },
        fadeInLeft: {
          '0%': { 
            transform: 'translateX(20px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1'
          },
        },
        fadeInUp: {
          '0%': { 
            transform: 'translateY(20px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
        zoomIn: {
          '0%': { 
            transform: 'scale(0.95)',
            opacity: '0'
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '1'
          },
        },
        clickEffect: {
          '0%': { 
            transform: 'scale(1)' 
          },
          '50%': { 
            transform: 'scale(0.95)' 
          },
          '100%': { 
            transform: 'scale(1)' 
          },
        },
        floatRandom: {
          '0%, 100%': { 
            transform: 'translate(0, 0) rotate(0deg)' 
          },
          '33%': { 
            transform: 'translate(2%, 2%) rotate(120deg)' 
          },
          '66%': { 
            transform: 'translate(-2%, -2%) rotate(240deg)' 
          },
        },
        floatGeometric: {
          '0%, 100%': { 
            transform: 'translate(0, 0) rotate(0deg) scale(1)' 
          },
          '50%': { 
            transform: 'translate(30px, -30px) rotate(180deg) scale(1.1)' 
          },
        },
        wave: {
          '0%': { 
            transform: 'translateX(-100%)' 
          },
          '100%': { 
            transform: 'translateX(100%)' 
          },
        },
        glow: {
          '0%, 100%': { 
            opacity: 0.3 
          },
          '50%': { 
            opacity: 0.6 
          },
        },
        fadeInDown: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-20px)' 
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)' 
          },
        },
        fadeIn: {
          '0%': { 
            opacity: '0' 
          },
          '100%': { 
            opacity: '1' 
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'scroll-left': {
          '0%': { 
            transform: 'translateX(0)'
          },
          '100%': { 
            transform: 'translateX(-50%)'
          },
        },
        'scroll-right': {
          '0%': { 
            transform: 'translateX(-50%)'
          },
          '100%': { 
            transform: 'translateX(0)'
          },
        },
        scroll: {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-50%)'
          }
        }
      },
      animation: {
        'zoom-in-out': 'zoom-in-out 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out 1s infinite',
        'scale-x': 'scaleX 0.5s ease-out forwards',
        'bounce-subtle': 'bounceSlight 2s ease-in-out infinite',
        'fade-in-right': 'fadeInRight 0.5s ease-out',
        'fade-in-left': 'fadeInLeft 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'zoom-in': 'zoomIn 0.5s ease-out',
        'clickEffect': 'clickEffect 0.3s ease-in-out',
        'float-random': 'floatRandom 20s ease-in-out infinite',
        'float-geometric': 'floatGeometric 25s ease-in-out infinite',
        'wave': 'wave 10s linear infinite',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'glow': 'glow 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'gradient-x': 'gradient-x 15s ease infinite',
        'scroll': 'scroll 25s linear infinite',
        'infinite-scroll': 'scroll 25s linear infinite',
        'scroll-left': 'scroll-left 10s linear infinite',
        'scroll-right': 'scroll-right 10s linear infinite',
      },
    },
  },
  plugins: [],
}