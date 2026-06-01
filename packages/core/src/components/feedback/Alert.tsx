import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const alertVariants = cva(
  [
    'flex gap-3 items-start p-4',
    'border-l-[3px] rounded-r-ds-md',
  ],
  {
    variants: {
      variant: {
        info:    'border-ds-cyan   bg-ds-cyan/5',
        success: 'border-ds-green  bg-ds-green/5',
        warning: 'border-ds-orange bg-ds-orange/5',
        error:   'border-ds-red    bg-ds-red/5',
      },
    },
    defaultVariants: { variant: 'info' },
  }
)

const iconColorMap = {
  info:    'text-ds-cyan',
  success: 'text-ds-green',
  warning: 'text-ds-orange',
  error:   'text-ds-red',
} as const

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', icon, children, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      {icon && (
        <span className={cn('flex-shrink-0 mt-0.5', iconColorMap[variant ?? 'info'])}>
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
)
Alert.displayName = 'Alert'

export const AlertTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('font-bold text-sm text-ds-fg mb-0.5', className)} {...props} />
  )
)
AlertTitle.displayName = 'AlertTitle'

export const AlertDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-ds-comment', className)} {...props} />
  )
)
AlertDescription.displayName = 'AlertDescription'
