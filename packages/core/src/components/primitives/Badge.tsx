import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'rounded-ds-pill px-2.5 py-0.5',
    'text-[10px] font-black uppercase tracking-widest',
    'border border-transparent',
    'transition-colors duration-fast',
  ],
  {
    variants: {
      variant: {
        purple: 'text-ds-purple border-ds-purple shadow-[0_0_8px_rgba(189,147,249,.25)]',
        green:  'text-ds-green  border-ds-green  shadow-[0_0_8px_rgba(80,250,123,.25)]',
        cyan:   'text-ds-cyan   border-ds-cyan   shadow-[0_0_8px_rgba(139,233,253,.25)]',
        pink:   'text-ds-pink   border-ds-pink   shadow-[0_0_8px_rgba(255,121,198,.25)]',
        orange: 'text-ds-orange border-ds-orange shadow-[0_0_8px_rgba(255,184,108,.25)]',
        yellow: 'text-ds-yellow border-ds-yellow shadow-[0_0_8px_rgba(241,250,140,.25)]',
        red:    'text-ds-red    border-ds-red    shadow-[0_0_8px_rgba(255,85,85,.25)]',
        muted:  'text-ds-comment border-ds-comment',
        'solid-green':  'bg-ds-green/15  text-ds-green  border-transparent',
        'solid-red':    'bg-ds-red/15    text-ds-red    border-transparent',
        'solid-orange': 'bg-ds-orange/15 text-ds-orange border-transparent',
        'solid-purple': 'bg-ds-purple/15 text-ds-purple border-transparent',
      },
    },
    defaultVariants: { variant: 'purple' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
  icon?: React.ReactNode
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, dot, icon, children, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"
          aria-hidden="true"
        />
      )}
      {icon && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  )
)
Badge.displayName = 'Badge'

export { badgeVariants }
