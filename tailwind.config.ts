import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // theme-aware (flip via .theme-dark wrapper)
        bg: 'var(--c-bg)',
        surface: 'var(--c-surface)',
        'surface-2': 'var(--c-surface-2)',
        ink: 'var(--c-ink)',
        muted: 'var(--c-muted)',
        border: 'var(--c-border)',
        'border-blue': 'var(--c-border-blue)',

        // brand fixed
        royal: '#1B5EA6',
        'royal-light': '#2874C8',
        accent: '#4A90D9',
        'accent-dim': 'rgba(74,144,217,0.12)',
        amber: '#F5A524',
        'amber-dim': 'rgba(245,165,36,0.12)',
        coral: '#E85D3B',
        paper: '#F7F3EC',
        'paper-2': '#EEE8DC',
        'ink-pure': '#0F0F10',
        'dark-bg': '#060D1A',
        'dark-surface': '#0B1E38',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem,8vw,6.5rem)', { lineHeight: '0.92', letterSpacing: '-0.045em' }],
        'display-lg': ['clamp(2rem,5.5vw,4.25rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(1.5rem,3.8vw,2.625rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'body-lg': ['clamp(1.0625rem,2vw,1.1875rem)', { lineHeight: '1.65', letterSpacing: '-0.005em' }],
        'body-base': ['clamp(0.9375rem,1.5vw,1rem)', { lineHeight: '1.6', letterSpacing: '-0.003em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(27,94,166,0.12) 0%, transparent 65%)',
        'hero-glow-dark':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(27,94,166,0.3) 0%, transparent 65%)',
        'card-shine':
          'linear-gradient(135deg, rgba(74,144,217,0.04) 0%, transparent 60%)',
        'royal-grad':
          'linear-gradient(135deg, #060D1A 0%, #0B1E38 60%, #1B5EA6 100%)',
        'amber-wash':
          'linear-gradient(135deg, rgba(245,165,36,0.08) 0%, transparent 55%)',
        dots: 'radial-gradient(var(--c-dot,rgba(27,94,166,0.25)) 1px, transparent 1px)',
        grid: 'linear-gradient(var(--c-border) 1px, transparent 1px), linear-gradient(90deg, var(--c-border) 1px, transparent 1px)',
        noise:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
      },
      backgroundSize: {
        dots: '24px 24px',
        grid: '44px 44px',
      },
      boxShadow: {
        royal:
          '0 0 0 1px rgba(74,144,217,0.2), 0 4px 24px rgba(6,13,26,0.15)',
        glow: '0 0 40px rgba(27,94,166,0.25)',
        'glow-amber': '0 0 28px rgba(245,165,36,0.35)',
        cta: '0 4px 20px rgba(27,94,166,0.35)',
        'cta-amber': '0 4px 20px rgba(245,165,36,0.35)',
        paper: '0 1px 2px rgba(15,15,16,0.04), 0 8px 24px rgba(15,15,16,0.06)',
        'inset-hair': 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(27,94,166,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(27,94,166,0.6)' },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
