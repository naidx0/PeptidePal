import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      colors: {
        dedorange: '#E67E50',
        ded: {
          cream: '#FAF8F5',
          warm: '#E8E2DA',
          sand: '#D4CCC4',
          ink: '#1A1917',
          charcoal: '#3D3A36',
          muted: '#6B6560',
          coral: '#D4846A',
          blush: '#E8B4B8',
          sage: '#9CAF88',
          lavender: '#B8A9C9',
        },
      },
    },
  },
  plugins: [],
}
export default config
