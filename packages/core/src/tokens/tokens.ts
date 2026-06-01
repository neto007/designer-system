/* Auto-derived from tokens.json — edit tokens.css/.json as source of truth */

export const ds = {
  color: {
    surface: {
      bg:        '#050101',
      panel:     '#0b0b11',
      current:   '#1a1b26',
      selection: '#282a36',
    },
    text: {
      fg:      '#f8f8f2',
      comment: '#6272a4',
    },
    signal: {
      purple: '#bd93f9',
      green:  '#50fa7b',
      cyan:   '#8be9fd',
      pink:   '#ff79c6',
      orange: '#ffb86c',
      yellow: '#f1fa8c',
      red:    '#ff5555',
    },
  },
  font: {
    sans: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
    size: {
      9:  '9px',
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      20: '20px',
      24: '24px',
      32: '32px',
      40: '40px',
      56: '56px',
      72: '72px',
    },
    tracking: { widest: '0.2em' },
  },
  spacing: {
    1:  '4px',
    2:  '8px',
    3:  '12px',
    4:  '16px',
    6:  '24px',
    8:  '32px',
    12: '48px',
    16: '64px',
    24: '96px',
  },
  radius: {
    none: '0',
    sm:   '2px',
    md:   '4px',
    lg:   '8px',
    xl:   '12px',
    '2xl':'16px',
    pill: '9999px',
  },
  shadow: {
    glow: {
      smPurple: '0 0 8px rgba(189,147,249,.30)',
      mdPurple: '0 0 15px rgba(189,147,249,.35)',
      lgPurple: '0 0 25px rgba(189,147,249,.55)',
      xlPurple: '0 0 40px rgba(189,147,249,.70), inset 0 0 20px rgba(189,147,249,.2)',
      mdGreen:  '0 0 15px rgba(80,250,123,.35)',
      mdCyan:   '0 0 15px rgba(139,233,253,.35)',
      mdPink:   '0 0 15px rgba(255,121,198,.35)',
      mdOrange: '0 0 15px rgba(255,184,108,.35)',
      mdYellow: '0 0 15px rgba(241,250,140,.35)',
      mdRed:    '0 0 15px rgba(255,85,85,.35)',
    },
    neu: {
      sm:     '2px 2px 0px 0px rgba(0,0,0,1)',
      md:     '4px 4px 0px 0px rgba(0,0,0,1)',
      lg:     '6px 6px 0px 0px rgba(0,0,0,1)',
      purple: '4px 4px 0px 0px #bd93f9',
      green:  '4px 4px 0px 0px #50fa7b',
      pink:   '4px 4px 0px 0px #ff79c6',
      cyan:   '4px 4px 0px 0px #8be9fd',
      orange: '4px 4px 0px 0px #ffb86c',
      red:    '4px 4px 0px 0px #ff5555',
    },
  },
  motion: {
    duration: { fast: '150ms', default: '200ms', slow: '300ms' },
    easing: {
      out:    'cubic-bezier(.4,0,.2,1)',
      spring: 'cubic-bezier(.34,1.56,.64,1)',
    },
  },
  z: {
    base:     1,
    dropdown: 50,
    sticky:   60,
    overlay:  70,
    modal:    80,
    toast:    90,
    tooltip:  100,
  },
  layout: {
    headerH:  '64px',
    sidebarW: '260px',
    maxW:     '1280px',
  },
} as const

export type DSColor    = typeof ds.color
export type DSSignal   = typeof ds.color.signal
export type DSFont     = typeof ds.font
export type DSSpacing  = typeof ds.spacing
export type DSRadius   = typeof ds.radius
export type DSShadow   = typeof ds.shadow
export type DSMotion   = typeof ds.motion
export type DSTokens   = typeof ds
