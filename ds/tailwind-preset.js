/**
 * SHIELDAI · Tailwind preset
 * Drop this into your `tailwind.config.js`:
 *
 *   import shieldai from './ds/tailwind-preset.js'
 *   export default { presets: [shieldai], content: [...] }
 */
export default {
  theme: {
    extend: {
      colors: {
        'ds-bg':        '#050101',
        'ds-panel':     '#0b0b11',
        'ds-current':   '#1a1b26',
        'ds-selection': '#282a36',
        'ds-fg':        '#f8f8f2',
        'ds-comment':   '#6272a4',
        'ds-purple':    '#bd93f9',
        'ds-green':     '#50fa7b',
        'ds-cyan':      '#8be9fd',
        'ds-pink':      '#ff79c6',
        'ds-orange':    '#ffb86c',
        'ds-yellow':    '#f1fa8c',
        'ds-red':       '#ff5555',
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glow-sm-purple': '0 0 8px rgba(189,147,249,.30)',
        'glow':           '0 0 15px rgba(189,147,249,.35)',
        'glow-lg':        '0 0 25px rgba(189,147,249,.55)',
        'glow-green':     '0 0 15px rgba(80,250,123,.35)',
        'glow-cyan':      '0 0 15px rgba(139,233,253,.35)',
        'glow-red':       '0 0 15px rgba(255,85,85,.35)',
        'neu-sm':         '2px 2px 0px 0px rgba(0,0,0,1)',
        'neu':            '4px 4px 0px 0px rgba(0,0,0,1)',
        'neu-lg':         '6px 6px 0px 0px rgba(0,0,0,1)',
        'neu-purple':     '4px 4px 0px 0px #bd93f9',
        'neu-green':      '4px 4px 0px 0px #50fa7b',
        'neu-pink':       '4px 4px 0px 0px #ff79c6',
        'neu-cyan':       '4px 4px 0px 0px #8be9fd',
        'neu-orange':     '4px 4px 0px 0px #ffb86c',
        'neu-red':        '4px 4px 0px 0px #ff5555',
      },
      transitionTimingFunction: {
        'ds-out':    'cubic-bezier(.4,0,.2,1)',
        'ds-spring': 'cubic-bezier(.34,1.56,.64,1)',
      },
      keyframes: {
        wiggle:  { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
        squash:  { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(.95,1.05)' }, '100%': { transform: 'scale(1)' } },
        blink:   { '50%': { opacity: '0' } },
        shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
      },
      animation: {
        wiggle:  'wiggle 1s ease-in-out infinite',
        squash:  'squash 200ms ease-in-out',
        blink:   'blink 1s steps(1) infinite',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
};
