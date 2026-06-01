import { forwardRef, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const avatarVariants = cva(
  [
    'inline-flex items-center justify-center rounded-full',
    'font-bold overflow-hidden flex-shrink-0',
    'border-2',
  ],
  {
    variants: {
      variant: {
        default: 'bg-ds-current text-ds-fg border-ds-current',
        user:    'bg-ds-green text-ds-on-accent border-ds-current shadow-neu-sm',
        bot:     'bg-ds-panel text-ds-purple border-ds-purple shadow-neu-sm',
        tool:    'bg-ds-panel text-ds-orange border-ds-orange shadow-neu-sm',
      },
      size: {
        sm: 'w-7 h-7 text-[11px]',
        md: 'w-10 h-10 text-sm',
        lg: 'w-14 h-14 text-lg',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  initials?: string
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, variant, size, src, alt, initials, children, ...props }, ref) => {
    const [imgError, setImgError] = useState(false)
    const showImage = src && !imgError

    return (
      <span ref={ref} className={cn(avatarVariants({ variant, size }), className)} {...props}>
        {showImage ? (
          <img
            src={src}
            alt={alt ?? ''}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : initials ? (
          initials.slice(0, 2).toUpperCase()
        ) : (
          children
        )}
      </span>
    )
  }
)
Avatar.displayName = 'Avatar'
