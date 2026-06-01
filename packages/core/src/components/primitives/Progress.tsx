import { forwardRef } from 'react'
import * as RadixProgress from '@radix-ui/react-progress'
import { cn } from '../../lib/cn'

const colorMap = {
  purple: { bar: 'bg-ds-purple', glow: 'shadow-[0_0_8px_#bd93f9]' },
  green:  { bar: 'bg-ds-green',  glow: 'shadow-[0_0_8px_#50fa7b]' },
  cyan:   { bar: 'bg-ds-cyan',   glow: 'shadow-[0_0_8px_#8be9fd]' },
  orange: { bar: 'bg-ds-orange', glow: 'shadow-[0_0_8px_#ffb86c]' },
  red:    { bar: 'bg-ds-red',    glow: 'shadow-[0_0_8px_#ff5555]' },
} as const

export type ProgressColor = keyof typeof colorMap

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  color?: ProgressColor
  showLabel?: boolean
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, color = 'purple', showLabel, ...props }, ref) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100))
    const { bar, glow } = colorMap[color]

    return (
      <div ref={ref} className={cn('flex items-center gap-3', className)} {...props}>
        <RadixProgress.Root
          value={value}
          max={max}
          className="relative flex-1 h-1 bg-ds-current rounded-full overflow-hidden"
        >
          <RadixProgress.Indicator
            className={cn('h-full rounded-full transition-all duration-slow ease-ds-out', bar, glow)}
            style={{ width: `${pct}%` }}
          />
        </RadixProgress.Root>
        {showLabel && (
          <span className="text-[11px] font-mono text-ds-comment tabular-nums w-8 text-right">
            {Math.round(pct)}%
          </span>
        )}
      </div>
    )
  }
)
Progress.displayName = 'Progress'
