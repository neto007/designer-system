import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const textareaVariants = cva(
  [
    'w-full min-h-[80px] px-3 py-2.5 text-sm',
    'font-sans text-ds-fg',
    'rounded-ds-md border bg-ds-bg',
    'placeholder:text-ds-comment',
    'transition-all duration-fast ease-ds-out',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus:outline-none',
    'resize-y',
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
      resize: {
        none:       'resize-none',
        vertical:   'resize-y',
        horizontal: 'resize-x',
        both:       'resize',
      },
    },
    defaultVariants: { variant: 'default', resize: 'vertical' },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, resize, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(textareaVariants({ variant, resize }), className)}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'
