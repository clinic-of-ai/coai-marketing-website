/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        redditOrange: '#FF4500',
        redditBlue: '#0079D3',
        redditGray: {
          100: '#F8F9FA',
          200: '#DAE0E6',
          300: '#878A8C',
          400: '#1A1A1B',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: '#FF4500', // Reddit's orange as primary
          hover: '#FF5414',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#0079D3', // Reddit's blue as secondary
          hover: '#1484D7',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#878A8C',
          foreground: '#1A1A1B',
        },
        accent: {
          DEFAULT: '#FF4500',
          foreground: '#FFFFFF',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A1B',
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
}

