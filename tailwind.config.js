module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,css}"],
  purge: ["./src/**/*.{html,js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      transitionTimingFunction: {
        'custom-bounce-in': 'cubic-bezier(0.8, 0, 1, 1)',
        'custom-bounce-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      keyframes: {
        custom_bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%) custom-bounce-in'
          },
          '50%': {
            transform: 'translateY(0) custom-bounce-out'
          },
        },
      },
      animation: {
        'custom-bounce': 'custom_bounce 1s infinite'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
