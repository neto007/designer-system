import { cva } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const dotVariants = cva(
  'flex-shrink-0 rounded-full',
  {
    variants: {
      status: {
        live:     'bg-ds-green animate-pulse-glow shadow-[0_0_6px_rgba(80,250,123,.6)]',
        idle:     'bg-ds-comment',
        error:    'bg-ds-red shadow-[0_0_6px_rgba(255,85,85,.4)]',
        warning:  'bg-ds-orange shadow-[0_0_6px_rgba(255,184,108,.4)]',
        pending:  'bg-ds-yellow',
        running:  'bg-ds-purple animate-pulse-glow shadow-[0_0_6px_rgba(189,147,249,.5)]',
        success:  'bg-ds-green',
        disabled: 'bg-ds-current',
      },
      size: {
        sm: 'w-1.5 h-1.5',
        md: 'w-2 h-2',
        lg: 'w-2.5 h-2.5',
      },
    },
    defaultVariants: { status: 'idle', size: 'md' },
  }
)

const LABELS: Record<string, string> = {
  live:     'Live',
  idle:     'Idle',
  error:    'Error',
  warning:  'Warning',
  pending:  'Pending',
  running:  'Running',
  success:  'Success',
  disabled: 'Disabled',
}

export interface StatusIndicatorProps {
  status: 'live' | 'idle' | 'error' | 'warning' | 'pending' | 'running' | 'success' | 'disabled'
  label?: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function StatusIndicator({ status, label, size = 'md', showLabel = true, className }: StatusIndicatorProps) {
  const displayLabel = label ?? LABELS[status]
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className={dotVariants({ status, size })} />
      {showLabel && (
        <span className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">{displayLabel}</span>
      )}
    </span>
  )
}
