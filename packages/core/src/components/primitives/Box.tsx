import { forwardRef, type ElementType, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const boxVariants = cva('', {
  variants: {
    variant: {
      none: '',
      panel: 'bg-ds-panel border border-ds-current',
      neu: 'bg-ds-panel border-2 border-black shadow-neu',
      'neu-purple': 'bg-ds-purple/10 border-2 border-black shadow-neu-purple',
      'neu-green': 'bg-ds-green/10 border-2 border-black shadow-neu-green',
      'neu-pink': 'bg-ds-pink/10 border-2 border-black shadow-neu-pink',
      'neu-cyan': 'bg-ds-cyan/10 border-2 border-black shadow-neu-cyan',
    },
    padding: {
      none: '',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    },
    rounded: {
      none: '',
      sm: 'rounded-ds-sm',
      md: 'rounded-ds-md',
      lg: 'rounded-ds-lg',
    },
  },
  defaultVariants: {
    variant: 'none',
    padding: 'md',
    rounded: 'md',
  },
})

export interface BoxProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof boxVariants> {
  as?: ElementType
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  ({ className, variant, padding, rounded, as: Component = 'div', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(boxVariants({ variant, padding, rounded }), className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Box.displayName = 'Box'