import { forwardRef } from 'react'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const tokenVariants = cva(
  'inline-flex items-center gap-1 rounded-ds-pill px-2.5 py-0.5 text-[11px] font-semibold border transition-colors duration-fast',
  {
    variants: {
      variant: {
        purple: 'text-ds-purple border-ds-purple/40 bg-ds-purple/10',
        green:  'text-ds-green  border-ds-green/40  bg-ds-green/10',
        cyan:   'text-ds-cyan   border-ds-cyan/40   bg-ds-cyan/10',
        pink:   'text-ds-pink   border-ds-pink/40   bg-ds-pink/10',
        orange: 'text-ds-orange border-ds-orange/40 bg-ds-orange/10',
        yellow: 'text-ds-yellow border-ds-yellow/40 bg-ds-yellow/10',
        red:    'text-ds-red    border-ds-red/40    bg-ds-red/10',
      },
    },
    defaultVariants: { variant: 'purple' },
  }
)

export interface TokenProps extends VariantProps<typeof tokenVariants> {
  label: string
  onDismiss?: () => void
  className?: string
}

export const Token = forwardRef<HTMLSpanElement, TokenProps>(
  ({ label, variant, onDismiss, className }, ref) => {
    return (
      <span ref={ref} className={cn(tokenVariants({ variant }), className)}>
        <span className="truncate max-w-[120px]">{label}</span>
        {onDismiss && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onDismiss() }}
            className="flex-shrink-0 p-0.5 rounded-full hover:bg-current/20 transition-colors"
            aria-label={`Remove ${label}`}
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    )
  }
)
Token.displayName = 'Token'