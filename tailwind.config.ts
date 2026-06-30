import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Light institutional-premium palette: white + deep blue + brass
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        navy: {
          DEFAULT: 'var(--navy)',
          700: 'var(--navy-700)',
          600: 'var(--navy-600)',
          500: 'var(--navy-500)',
        },
        ink: 'var(--ink)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        brass: {
          DEFAULT: 'var(--brass)',
          2: 'var(--brass-2)',
          3: 'var(--brass-3)',
        },
        amber: {
          DEFAULT: 'var(--amber)',
          600: 'var(--amber-600)',
          100: 'var(--amber-100)',
        },
        gold: {
          DEFAULT: 'var(--gold)',
          hi: 'var(--gold-hi)',
          deep: 'var(--gold-deep)',
        },
        cream: 'var(--cream)',
        'gold-muted': 'var(--gold-muted)',
        'hero-bg0': 'var(--hero-bg0)',
        'hero-bg1': 'var(--hero-bg1)',
        uae: {
          red: 'var(--red)',
          'red-600': 'var(--red-600)',
          'red-100': 'var(--red-100)',
        },
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '100px',
        card: '18px',
        xl2: '22px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(10,81,50,.05), 0 8px 24px rgba(10,81,50,.07)',
        lift: '0 2px 6px rgba(10,81,50,.07), 0 20px 44px rgba(10,81,50,.12)',
        brass: '0 10px 30px rgba(176,125,43,.20)',
      },
      maxWidth: {
        content: '1200px',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        dash: {
          to: { strokeDashoffset: '-200' },
        },
        fadeup: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        dash: 'dash 3s linear infinite',
        fadeup: 'fadeup .6s ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;
