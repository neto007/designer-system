// eslint-disable-next-line @typescript-eslint/no-explicit-any
const preset: Record<string, any> = {
  theme: {
    extend: {
      colors: {
        // All colors use CSS variable RGB triplets so that:
        //   1. Theme switching (dark/light) works at runtime
        //   2. Tailwind opacity modifiers work: bg-ds-purple/15, text-ds-fg/60, etc.
        'ds-bg':        'rgb(var(--ds-bg-rgb)        / <alpha-value>)',
        'ds-panel':     'rgb(var(--ds-panel-rgb)     / <alpha-value>)',
        'ds-current':   'rgb(var(--ds-current-rgb)   / <alpha-value>)',
        'ds-selection': 'rgb(var(--ds-selection-rgb) / <alpha-value>)',
        'ds-fg':        'rgb(var(--ds-fg-rgb)        / <alpha-value>)',
        'ds-comment':   'rgb(var(--ds-comment-rgb)   / <alpha-value>)',
        'ds-purple':    'rgb(var(--ds-purple-rgb)    / <alpha-value>)',
        'ds-green':     'rgb(var(--ds-green-rgb)     / <alpha-value>)',
        'ds-cyan':      'rgb(var(--ds-cyan-rgb)      / <alpha-value>)',
        'ds-pink':      'rgb(var(--ds-pink-rgb)      / <alpha-value>)',
        'ds-orange':    'rgb(var(--ds-orange-rgb)    / <alpha-value>)',
        'ds-yellow':    'rgb(var(--ds-yellow-rgb)    / <alpha-value>)',
        'ds-red':       'rgb(var(--ds-red-rgb)       / <alpha-value>)',
        'ds-on-accent': 'var(--ds-on-accent)',
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        // Reference CSS vars so shadows update with theme
        'glow-sm-purple': 'var(--ds-glow-sm-purple)',
        'glow':           'var(--ds-glow-md-purple)',
        'glow-lg':        'var(--ds-glow-lg-purple)',
        'glow-xl':        'var(--ds-glow-xl-purple)',
        'glow-green':     'var(--ds-glow-md-green)',
        'glow-cyan':      'var(--ds-glow-md-cyan)',
        'glow-pink':      'var(--ds-glow-md-pink)',
        'glow-orange':    'var(--ds-glow-md-orange)',
        'glow-yellow':    'var(--ds-glow-md-yellow)',
        'glow-red':       'var(--ds-glow-md-red)',
        'neu-sm':         'var(--ds-neu-sm)',
        'neu':            'var(--ds-neu)',
        'neu-lg':         'var(--ds-neu-lg)',
        'neu-purple':     'var(--ds-neu-purple)',
        'neu-green':      'var(--ds-neu-green)',
        'neu-pink':       'var(--ds-neu-pink)',
        'neu-cyan':       'var(--ds-neu-cyan)',
        'neu-orange':     'var(--ds-neu-orange)',
        'neu-red':        'var(--ds-neu-red)',
      },
      borderRadius: {
        'ds-sm':   '2px',
        'ds-md':   '4px',
        'ds-lg':   '8px',
        'ds-xl':   '12px',
        'ds-2xl':  '16px',
        'ds-pill': '9999px',
      },
      transitionTimingFunction: {
        'ds-out':    'cubic-bezier(.4,0,.2,1)',
        'ds-spring': 'cubic-bezier(.34,1.56,.64,1)',
      },
      transitionDuration: {
        fast:    '150ms',
        default: '200ms',
        slow:    '300ms',
      },
      zIndex: {
        dropdown: '50',
        sticky:   '60',
        overlay:  '70',
        modal:    '80',
        toast:    '90',
        tooltip:  '100',
      },
      keyframes: {
        wiggle:       { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
        squash:       { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(.95,1.05)' }, '100%': { transform: 'scale(1)' } },
        blink:        { '50%': { opacity: '0' } },
        shimmer:      { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
        'pulse-glow': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '.5' } },
        'spin-slow':  { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        wiggle:       'wiggle 1s ease-in-out infinite',
        squash:       'squash 200ms ease-in-out',
        blink:        'blink 1s steps(1) infinite',
        shimmer:      'shimmer 1.6s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow':  'spin-slow 2s linear infinite',
      },
      backgroundImage: {
        'grid-ds': `
          linear-gradient(rgb(var(--ds-purple-rgb) / 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgb(var(--ds-purple-rgb) / 0.06) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid-ds': '48px 48px',
      },
    },
  },
}

export default preset
