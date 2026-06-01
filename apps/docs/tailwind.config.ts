import type { Config } from 'tailwindcss'
import shieldaiPreset from '../../packages/core/src/tokens/tailwind-preset'

export default {
  presets: [shieldaiPreset as Config],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/core/src/**/*.{ts,tsx}',
  ],
} satisfies Config
