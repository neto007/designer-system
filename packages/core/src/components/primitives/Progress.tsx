import { forwardRef } from 'react'
import * as RadixProgress from '@radix-ui/react-progress'
import { cn } from '../../lib/cn'

const colorMap = {
  purple: { bar: 'bg-ds-purple', glow: 'shadow-[0_0_8px_#bd93f9]', stripe: 'from-ds-purple/40' },
  green:  { bar: 'bg-ds-green',  glow: 'shadow-[0_0_8px_#50fa7b]', stripe: 'from-ds-green/40'  },
  cyan:   { bar: 'bg-ds-cyan',   glow: 'shadow-[0_0_8px_#8be9fd]', stripe: 'from-ds-cyan/40'   },
  orange: { bar: 'bg-ds-orange', glow: 'shadow-[0_0_8px_#ffb86c]', stripe: 'from-ds-orange/40' },
  red:    { bar: 'bg-ds-red',    glow: 'shadow-[0_0_8px_#ff5555]', stripe: 'from-ds-red/40'    },
} as const

export type ProgressColor = keyof typeof colorMap

const sizeMap = {
  sm: 'h-0.5',
  md: 'h-1',
  lg: 'h-2',
}

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  color?: ProgressColor
  showLabel?: boolean
  /** default: determinate bar · indeterminate: bouncing · wave: shimmer sweep · striped: animated diagonal stripes */
  variant?: 'default' | 'indeterminate' | 'wave' | 'striped'
  size?: keyof typeof sizeMap
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      color = 'purple',
      showLabel,
      variant = 'default',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100))
    const { bar, glow } = colorMap[color]
    const isIndeterminate = variant === 'indeterminate'

    return (
      <div ref={ref} className={cn('flex items-center gap-3', className)} {...props}>
        <RadixProgress.Root
          value={isIndeterminate ? null : value}
          max={max}
          className={cn(
            'relative flex-1 bg-ds-current rounded-full overflow-hidden',
            sizeMap[size]
          )}
        >
          {variant === 'default' && (
            <RadixProgress.Indicator
              className={cn('h-full rounded-full transition-all duration-[300ms] ease-[cubic-bezier(.4,0,.2,1)]', bar, glow)}
              style={{ width: `${pct}%` }}
            />
          )}

          {variant === 'indeterminate' && (
            <div
              className={cn(
                'absolute inset-y-0 left-0 w-[50%] rounded-full animate-[progress-indeterminate_1.6s_cubic-bezier(0.65,0.815,0.735,0.395)_infinite]',
                bar, glow
              )}
            />
          )}

          {variant === 'wave' && (
            <>
              <RadixProgress.Indicator
                className={cn('h-full rounded-full transition-all duration-[300ms]', bar)}
                style={{ width: `${pct}%` }}
              />
              <div
                className="absolute inset-y-0 w-[30%] bg-white/30 rounded-full animate-[progress-wave_1.4s_ease-in-out_infinite]"
                style={{ left: `${Math.max(0, pct - 30)}%` }}
              />
            </>
          )}

          {variant === 'striped' && (
            <RadixProgress.Indicator
              className={cn('h-full rounded-full transition-all duration-[300ms] animate-[progress-stripe_0.8s_linear_infinite]', bar)}
              style={{
                width: `${pct}%`,
                backgroundImage:
                  'repeating-linear-gradient(45deg,transparent,transparent 6px,rgba(255,255,255,0.15) 6px,rgba(255,255,255,0.15) 12px)',
                backgroundSize: '1rem 1rem',
              }}
            />
          )}
        </RadixProgress.Root>

        {showLabel && !isIndeterminate && (
          <span className="text-[11px] font-mono text-ds-comment tabular-nums w-8 text-right">
            {Math.round(pct)}%
          </span>
        )}
      </div>
    )
  }
)
Progress.displayName = 'Progress'
