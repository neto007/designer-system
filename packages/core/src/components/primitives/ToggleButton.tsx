import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const toggleButtonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-fast',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-purple focus-visible:ring-offset-2 focus-visible:ring-offset-ds-bg',
    'disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-7 px-3 text-xs rounded-ds-sm',
        md: 'h-9 px-4 text-sm rounded-ds-md',
        lg: 'h-11 px-5 text-base rounded-ds-lg',
      },
      pressed: {
        true: 'bg-ds-purple/20 border-2 border-ds-purple text-ds-purple shadow-glow',
        false: 'bg-ds-panel border-2 border-ds-current text-ds-fg/70 hover:border-ds-purple/40 hover:text-ds-fg',
      },
    },
    defaultVariants: { size: 'md', pressed: false },
  }
)

export interface ToggleButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    Omit<VariantProps<typeof toggleButtonVariants>, 'pressed'> {
  pressed?: boolean
  onChange?: (pressed: boolean) => void
}

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ className, size, pressed = false, onChange, onClick, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="button"
        aria-pressed={pressed}
        className={cn(toggleButtonVariants({ size, pressed }), className)}
        onClick={(e) => {
          onChange?.(!pressed)
          onClick?.(e)
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)
ToggleButton.displayName = 'ToggleButton'
