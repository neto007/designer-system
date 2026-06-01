import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const inputVariants = cva(
  [
    'w-full h-10 px-3 text-sm',
    'font-sans text-ds-fg',
    'rounded-ds-md border bg-ds-bg',
    'placeholder:text-ds-comment',
    'transition-all duration-fast ease-ds-out',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus:outline-none',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-ds-current',
          'focus:border-ds-purple focus:shadow-[0_0_0_2px_rgba(189,147,249,.2)]',
        ],
        error: [
          'border-ds-red text-ds-red',
          'focus:border-ds-red focus:shadow-[0_0_0_2px_rgba(255,85,85,.2)]',
          'placeholder:text-ds-red/50',
        ],
        neu: [
          'bg-ds-current border-2 border-ds-current rounded-ds-lg',
          'focus:border-ds-green focus:shadow-neu-green',
        ],
        'neu-purple': [
          'bg-ds-current border-2 border-ds-current rounded-ds-lg',
          'focus:border-ds-purple focus:shadow-neu-purple',
        ],
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, leftElement, rightElement, ...props }, ref) => {
    if (leftElement || rightElement) {
      return (
        <div className="relative flex items-center w-full">
          {leftElement && (
            <span className="absolute left-3 text-ds-comment flex items-center pointer-events-none">
              {leftElement}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              inputVariants({ variant }),
              leftElement && 'pl-9',
              rightElement && 'pr-9',
              className
            )}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3 text-ds-comment flex items-center">
              {rightElement}
            </span>
          )}
        </div>
      )
    }

    return (
      <input
        ref={ref}
        className={cn(inputVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { inputVariants }
