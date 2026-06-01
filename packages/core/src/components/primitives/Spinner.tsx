import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const spinnerVariants = cva(
  'inline-block rounded-full border-2 border-current animate-spin border-t-transparent',
  {
    variants: {
      size: {
        sm:  'h-3 w-3',
        md:  'h-4 w-4',
        lg:  'h-6 w-6',
        xl:  'h-8 w-8',
      },
      color: {
        default: 'text-ds-fg',
        purple:  'text-ds-purple',
        green:   'text-ds-green',
        cyan:    'text-ds-cyan',
        orange:  'text-ds-orange',
        red:     'text-ds-red',
        muted:   'text-ds-comment',
      },
    },
    defaultVariants: { size: 'md', color: 'default' },
  }
)

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
  label?: string
}

export function Spinner({ size, color, className, label = 'Loading...' }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className={cn('inline-flex items-center gap-2', className)}>
      <span className={spinnerVariants({ size, color })} />
      {label !== 'Loading...' && (
        <span className="text-ds-comment text-sm">{label}</span>
      )}
    </span>
  )
}
