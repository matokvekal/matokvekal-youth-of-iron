/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './dialogs/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './styles/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
      },
      colors: {
        blue: {
          '100': '#0CFFA8', // Replace with your desired HEX code
        },
        red: {
          '100': '#FF004D', // Replace with your desired HEX code
        },
        selago: {
          50: 'hsl(255, 33%, 98%)',
          100: 'hsl(257, 30%, 95%)',
          200: 'hsl(255, 30%, 92%)', // Primary 20
          300: 'hsl(256, 29%, 85%)',
          400: 'hsl(261, 29%, 76%)',
          500: 'hsl(264, 28%, 66%)',
          600: 'hsl(266, 27%, 58%)',
          700: 'hsl(267, 22%, 50%)',
          800: 'hsl(268, 22%, 42%)',
          900: 'hsl(268, 21%, 35%)',
          950: 'hsl(267, 23%, 23%)',
        },
        mirage: {
          50: 'hsl(227, 53%, 97%)',
          100: 'hsl(228, 48%, 94%)',
          200: 'hsl(229, 47%, 89%)',
          300: 'hsl(232, 46%, 82%)',
          400: 'hsl(236, 44%, 74%)',
          500: 'hsl(239, 42%, 67%)',
          600: 'hsl(244, 37%, 59%)',
          700: 'hsl(246, 29%, 51%)',
          800: 'hsl(244, 27%, 41%)',
          900: 'hsl(243, 23%, 34%)',
          950: 'hsl(245, 24%, 11%)', // primary 80
        },
        stratos: {
          50: 'hsl(221, 100%, 96%)',
          100: 'hsl(226, 100%, 92%)',
          200: 'hsl(226, 100%, 86%)',
          300: 'hsl(229, 100%, 78%)',
          400: 'hsl(235, 100%, 69%)',
          500: 'hsl(240, 100%, 62%)',
          600: 'hsl(244, 100%, 55%)',
          700: 'hsl(246, 89%, 51%)',
          800: 'hsl(245, 84%, 41%)',
          900: 'hsl(243, 73%, 34%)',
          950: 'hsl(245, 72%, 17%)', // Primary 60
        },

        cyan: {
          50: 'hsl(177, 100%, 96%)',
          100: 'hsl(178, 100%, 90%)',
          200: 'hsl(179, 100%, 81%)',
          300: 'hsl(181, 100%, 68%)',
          400: 'hsl(184, 100%, 52%)', // Accent
          500: 'hsl(185, 100%, 45%)',
          600: 'hsl(188, 100%, 38%)',
          700: 'hsl(189, 96%, 31%)',
          800: 'hsl(190, 81%, 27%)',
          900: 'hsl(192, 74%, 24%)',
          950: 'hsl(193, 92%, 15%)',
        },

        haze: {
          50: 'hsl(220, 18%, 97%)', // neutral 10
          100: 'hsl(220, 19%, 94%)',
          200: 'hsl(218, 15%, 86%)',
          300: 'hsl(217, 17%, 74%)',
          400: 'hsl(214, 17%, 60%)',
          500: 'hsl(214, 16%, 48%)',
          600: 'hsl(216, 17%, 39%)',
          700: 'hsl(216, 17%, 32%)',
          800: 'hsl(218, 16%, 27%)',
          900: 'hsl(220, 15%, 24%)',
          950: 'hsl(218, 14%, 16%)',
        },

        border: 'var(--border)',
        input: 'hsl(var(--input))',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        soft: '0px 4px 7.3px rgba(0, 0, 0, 0.028),   0px 9.5px 17.6px rgba(0, 0, 0, 0.04),   0px 17.9px 33.1px rgba(0, 0, 0, 0.05),   0px 31.9px 59px rgba(0, 0, 0, 0.06),   0px 59.7px 110.3px rgba(0, 0, 0, 0.072),   0px 143px 264px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), 'prettier-plugin-tailwindcss'],
};
