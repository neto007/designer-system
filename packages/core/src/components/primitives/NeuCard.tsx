import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const neuCardVariants = cva(
  [
    'bg-ds-panel rounded-ds-xl p-6',
    'border-2',
  ],
  {
    variants: {
      variant: {
        default: 'border-ds-current shadow-neu',
        purple:  'border-ds-purple shadow-neu-purple',
        green:   'border-ds-green  shadow-neu-green',
        pink:    'border-ds-pink   shadow-neu-pink',
        red:     'border-ds-red    shadow-neu-red',
        cyan:    'border-ds-cyan   shadow-neu-cyan',
        orange:  'border-ds-orange shadow-neu-orange',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface NeuCardProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof neuCardVariants> {
  as?: React.ElementType
}

export const NeuCard = forwardRef<HTMLElement, NeuCardProps>(
  ({ className, variant, as: Tag = 'div', ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(neuCardVariants({ variant }), className)}
      {...props}
    />
  )
)
NeuCard.displayName = 'NeuCard'
