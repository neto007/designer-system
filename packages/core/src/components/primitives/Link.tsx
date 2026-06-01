import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { ExternalLink } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const linkVariants = cva(
  'inline-flex items-center gap-1 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-purple focus-visible:ring-offset-2 focus-visible:ring-offset-ds-bg rounded-sm',
  {
    variants: {
      variant: {
        inline: 'text-ds-purple hover:text-ds-pink underline decoration-ds-purple/30 hover:decoration-ds-pink/50 underline-offset-2',
        nav: 'text-ds-fg/80 hover:text-ds-purple no-underline font-medium',
        external: 'text-ds-purple hover:text-ds-pink underline decoration-ds-purple/30 hover:decoration-ds-pink/50 underline-offset-2',
      },
      disabled: {
        true: 'opacity-50 pointer-events-none cursor-not-allowed',
      },
    },
    defaultVariants: { variant: 'inline', disabled: false },
  }
)

export interface LinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, disabled, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, disabled }), className)}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        rel={variant === 'external' ? 'noopener noreferrer' : undefined}
        target={variant === 'external' ? '_blank' : undefined}
        {...props}
      >
        {children}
        {variant === 'external' && (
          <ExternalLink className="h-3 w-3 flex-shrink-0" />
        )}
      </a>
    )
  }
)
Link.displayName = 'Link'