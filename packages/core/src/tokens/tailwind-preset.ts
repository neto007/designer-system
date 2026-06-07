// eslint-disable-next-line @typescript-eslint/no-explicit-any
const preset: Record<string, any> = {
  theme: {
    extend: {
      // MD3 breakpoints as additional named screens (non-conflicting with Tailwind defaults).
      // Existing sm/md/lg/xl/2xl keep their Tailwind values.
      // Use md3-md:, md3-lg:, md3-xl:, md3-2xl: for MD3-aligned layouts.
      screens: {
        'md3-md':  '600px',   // MD3 medium  — 8-col grid
        'md3-lg':  '840px',   // MD3 expanded — 12-col grid
        'md3-xl':  '1200px',  // MD3 large
        'md3-2xl': '1600px',  // MD3 extra-large
      },
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
        // MD3 elevation surfaces
        'ds-surface-0': 'var(--ds-surface-0)',
        'ds-surface-1': 'var(--ds-surface-1)',
        'ds-surface-2': 'var(--ds-surface-2)',
        'ds-surface-3': 'var(--ds-surface-3)',
        'ds-surface-4': 'var(--ds-surface-4)',
        'ds-surface-5': 'var(--ds-surface-5)',
      },

      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      // MD3 type scale — fontSize as [size, { lineHeight, fontWeight }]
      fontSize: {
        'ds-display-lg':  ['var(--ds-type-display-lg-size)',  { lineHeight: 'var(--ds-type-display-lg-line)',  fontWeight: '400' }],
        'ds-display-md':  ['var(--ds-type-display-md-size)',  { lineHeight: 'var(--ds-type-display-md-line)',  fontWeight: '400' }],
        'ds-display-sm':  ['var(--ds-type-display-sm-size)',  { lineHeight: 'var(--ds-type-display-sm-line)',  fontWeight: '400' }],
        'ds-headline-lg': ['var(--ds-type-headline-lg-size)', { lineHeight: 'var(--ds-type-headline-lg-line)', fontWeight: '400' }],
        'ds-headline-md': ['var(--ds-type-headline-md-size)', { lineHeight: 'var(--ds-type-headline-md-line)', fontWeight: '400' }],
        'ds-headline-sm': ['var(--ds-type-headline-sm-size)', { lineHeight: 'var(--ds-type-headline-sm-line)', fontWeight: '400' }],
        'ds-title-lg':    ['var(--ds-type-title-lg-size)',    { lineHeight: 'var(--ds-type-title-lg-line)',    fontWeight: '400' }],
        'ds-title-md':    ['var(--ds-type-title-md-size)',    { lineHeight: 'var(--ds-type-title-md-line)',    fontWeight: '500' }],
        'ds-title-sm':    ['var(--ds-type-title-sm-size)',    { lineHeight: 'var(--ds-type-title-sm-line)',    fontWeight: '500' }],
        'ds-body-lg':     ['var(--ds-type-body-lg-size)',     { lineHeight: 'var(--ds-type-body-lg-line)',     fontWeight: '400' }],
        'ds-body-md':     ['var(--ds-type-body-md-size)',     { lineHeight: 'var(--ds-type-body-md-line)',     fontWeight: '400' }],
        'ds-body-sm':     ['var(--ds-type-body-sm-size)',     { lineHeight: 'var(--ds-type-body-sm-line)',     fontWeight: '400' }],
        'ds-label-lg':    ['var(--ds-type-label-lg-size)',    { lineHeight: 'var(--ds-type-label-lg-line)',    fontWeight: '500' }],
        'ds-label-md':    ['var(--ds-type-label-md-size)',    { lineHeight: 'var(--ds-type-label-md-line)',    fontWeight: '500' }],
        'ds-label-sm':    ['var(--ds-type-label-sm-size)',    { lineHeight: 'var(--ds-type-label-sm-line)',    fontWeight: '500' }],
      },

      spacing: {
        // MD3 complete 4dp grid — fills gaps in previous scale
        'ds-0':   'var(--ds-s-0)',
        'ds-px':  'var(--ds-s-px)',
        'ds-0.5': 'var(--ds-s-0-5)',
        'ds-1':   'var(--ds-s-1)',
        'ds-2':   'var(--ds-s-2)',
        'ds-3':   'var(--ds-s-3)',
        'ds-4':   'var(--ds-s-4)',
        'ds-5':   'var(--ds-s-5)',
        'ds-6':   'var(--ds-s-6)',
        'ds-7':   'var(--ds-s-7)',
        'ds-8':   'var(--ds-s-8)',
        'ds-9':   'var(--ds-s-9)',
        'ds-10':  'var(--ds-s-10)',
        'ds-12':  'var(--ds-s-12)',
        'ds-14':  'var(--ds-s-14)',
        'ds-16':  'var(--ds-s-16)',
        'ds-20':  'var(--ds-s-20)',
        'ds-24':  'var(--ds-s-24)',
        'ds-30':  'var(--ds-s-30)',
        'ds-40':  'var(--ds-s-40)',
      },

      height: {
        // Density-aware component heights (update automatically with --ds-density)
        'ds-button':    'var(--ds-h-button)',
        'ds-input':     'var(--ds-h-input)',
        'ds-chip':      'var(--ds-h-chip)',
        'ds-list-item': 'var(--ds-h-list-item)',
        'ds-table-row': 'var(--ds-h-table-row)',
        'ds-touch':     'var(--ds-touch-target)',
        'ds-header':    'var(--ds-header-h)',
      },

      minHeight: {
        'ds-touch': 'var(--ds-touch-target)',
      },

      minWidth: {
        'ds-touch': 'var(--ds-touch-target)',
      },

      width: {
        'ds-sidebar': 'var(--ds-sidebar-w)',
      },

      maxWidth: {
        'ds-content': 'var(--ds-max-w)',
      },

      boxShadow: {
        // Glow shadows — reference CSS vars so they update with theme
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
        // Neobrutalism offset shadows
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
        // Original values — used by all existing components (sharp Dracula/neu aesthetic)
        'ds-sm':   '2px',
        'ds-md':   '4px',
        'ds-lg':   '8px',
        'ds-xl':   '12px',
        'ds-2xl':  '16px',
        'ds-pill': '9999px',
        // MD3 shape scale — additive, opt-in for new components
        // Use rounded-ds-shape-xs, rounded-ds-shape-md, etc.
        'ds-shape-none': 'var(--ds-shape-none)',
        'ds-shape-xs':   'var(--ds-shape-xs)',
        'ds-shape-sm':   'var(--ds-shape-sm)',
        'ds-shape-md':   'var(--ds-shape-md)',
        'ds-shape-lg':   'var(--ds-shape-lg)',
        'ds-shape-xl':   'var(--ds-shape-xl)',
        'ds-shape-full': 'var(--ds-shape-full)',
      },

      transitionTimingFunction: {
        // MD3 Emphasized family (hero elements, persistent surfaces)
        'ds-emphasized':            'var(--ds-ease-emphasized)',
        'ds-emphasized-decelerate': 'var(--ds-ease-emphasized-decelerate)',
        'ds-emphasized-accelerate': 'var(--ds-ease-emphasized-accelerate)',
        // MD3 Standard family (utility elements, non-hero transitions)
        'ds-standard':            'var(--ds-ease-standard)',
        'ds-standard-decelerate': 'var(--ds-ease-standard-decelerate)',
        'ds-standard-accelerate': 'var(--ds-ease-standard-accelerate)',
        // Legacy aliases
        'ds-out':    'var(--ds-ease-standard)',
        'ds-spring': 'cubic-bezier(.34,1.56,.64,1)',
      },

      transitionDuration: {
        // MD3 complete duration scale
        'short1':      'var(--ds-dur-short1)',
        'short2':      'var(--ds-dur-short2)',
        'short3':      'var(--ds-dur-short3)',
        'short4':      'var(--ds-dur-short4)',
        'medium1':     'var(--ds-dur-medium1)',
        'medium2':     'var(--ds-dur-medium2)',
        'medium3':     'var(--ds-dur-medium3)',
        'medium4':     'var(--ds-dur-medium4)',
        'long1':       'var(--ds-dur-long1)',
        'long2':       'var(--ds-dur-long2)',
        'long3':       'var(--ds-dur-long3)',
        'long4':       'var(--ds-dur-long4)',
        'extra-long1': 'var(--ds-dur-extra-long1)',
        'extra-long2': 'var(--ds-dur-extra-long2)',
        'extra-long3': 'var(--ds-dur-extra-long3)',
        'extra-long4': 'var(--ds-dur-extra-long4)',
        // Legacy aliases
        fast:    'var(--ds-dur-short3)',
        default: 'var(--ds-dur-short4)',
        slow:    'var(--ds-dur-medium2)',
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
        // MD3 enter/exit
        'fade-in':       { from: { opacity: '0' },                               to: { opacity: '1' } },
        'fade-out':      { from: { opacity: '1' },                               to: { opacity: '0' } },
        'slide-in-up':   { from: { transform: 'translateY(8px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        'slide-in-down': { from: { transform: 'translateY(-8px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        'scale-in':      { from: { transform: 'scale(0.95)', opacity: '0' },     to: { transform: 'scale(1)', opacity: '1' } },
        'scale-out':     { from: { transform: 'scale(1)', opacity: '1' },        to: { transform: 'scale(0.95)', opacity: '0' } },
        // Progress variants
        'progress-indeterminate': {
          '0%':   { transform: 'translateX(-110%) scaleX(0.6)' },
          '40%':  { transform: 'translateX(0%)    scaleX(0.8)' },
          '100%': { transform: 'translateX(110%)  scaleX(0.6)' },
        },
        'progress-wave': {
          '0%':   { transform: 'translateX(-100%)', opacity: '0.7' },
          '100%': { transform: 'translateX(250%)',  opacity: '0.1' },
        },
        'progress-stripe': {
          '0%':   { backgroundPosition: '1rem 0' },
          '100%': { backgroundPosition: '0 0' },
        },
      },

      animation: {
        // Classic — hardcoded values required (var() unreliable in animation shorthand)
        wiggle:          'wiggle 1s ease-in-out infinite',
        squash:          'squash 200ms ease-in-out',
        blink:           'blink 1s steps(1) infinite',
        shimmer:         'shimmer 1.6s linear infinite',
        'pulse-glow':    'pulse-glow 2s ease-in-out infinite',
        'spin-slow':     'spin-slow 2s linear infinite',
        // MD3 enter/exit
        'fade-in':       'fade-in 250ms cubic-bezier(0.05, 0.7, 0.1, 1.0) both',
        'fade-out':      'fade-out 150ms cubic-bezier(0.3, 0.0, 0.8, 0.15) both',
        'slide-in-up':   'slide-in-up 300ms cubic-bezier(0.05, 0.7, 0.1, 1.0) both',
        'slide-in-down': 'slide-in-down 300ms cubic-bezier(0.05, 0.7, 0.1, 1.0) both',
        'scale-in':      'scale-in 300ms cubic-bezier(0.05, 0.7, 0.1, 1.0) both',
        'scale-out':     'scale-out 150ms cubic-bezier(0.3, 0.0, 0.8, 0.15) both',
        // Progress
        'progress-indeterminate': 'progress-indeterminate 1.6s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
        'progress-wave':          'progress-wave 1.4s ease-in-out infinite',
        'progress-stripe':        'progress-stripe 0.8s linear infinite',
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
