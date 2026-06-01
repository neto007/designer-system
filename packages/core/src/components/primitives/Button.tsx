import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-medium text-sm rounded-ds-md border-0 bg-transparent',
    'transition-all duration-fast ease-ds-out cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-ds-purple focus-visible:ring-offset-ds-bg',
    'disabled:opacity-50 disabled:pointer-events-none',
    'select-none',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-ds-purple text-ds-on-accent shadow-glow',
          'hover:bg-ds-pink hover:shadow-glow-pink',
          'active:scale-95',
        ],
        secondary: [
          'bg-ds-green text-ds-on-accent shadow-glow-green',
          'hover:brightness-110',
          'active:scale-95',
        ],
        destructive: [
          'bg-ds-red text-ds-on-accent shadow-glow-red',
          'hover:brightness-110',
          'active:scale-95',
        ],
        outline: [
          'border border-ds-purple text-ds-purple bg-transparent',
          'hover:bg-ds-purple/10',
          'active:scale-95',
        ],
        ghost: [
          'text-ds-fg',
          'hover:bg-ds-current hover:text-ds-purple',
          'active:scale-95',
        ],
        link: [
          'text-ds-purple underline-offset-4',
          'hover:underline',
        ],
        neu: [
          'bg-ds-panel text-ds-fg border-2 border-ds-fg',
          'rounded-ds-lg shadow-neu font-bold',
          'hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_black]',
          'active:translate-x-0.5 active:translate-y-0.5 active:shadow-neu-sm',
          'transition-all',
        ],
        'neu-purple': [
          'bg-ds-panel text-ds-purple border-2 border-ds-purple',
          'rounded-ds-lg shadow-neu-purple font-bold',
          'hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_#bd93f9]',
          'active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#bd93f9]',
          'transition-all',
        ],
        'neu-green': [
          'bg-ds-panel text-ds-green border-2 border-ds-green',
          'rounded-ds-lg shadow-neu-green font-bold',
          'hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_#50fa7b]',
          'active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#50fa7b]',
          'transition-all',
        ],
        'neu-pink': [
          'bg-ds-panel text-ds-pink border-2 border-ds-pink',
          'rounded-ds-lg shadow-neu-pink font-bold',
          'hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_#ff79c6]',
          'active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#ff79c6]',
          'transition-all',
        ],
        'neu-red': [
          'bg-ds-panel text-ds-red border-2 border-ds-red',
          'rounded-ds-lg shadow-neu-red font-bold',
          'hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_#ff5555]',
          'active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#ff5555]',
          'transition-all',
        ],
      },
      size: {
        sm:   'h-8 px-3 text-xs rounded-ds-sm',
        md:   'h-9 px-4 text-sm',
        lg:   'h-10 px-8 text-sm',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  )
)
Button.displayName = 'Button'

export { buttonVariants }
