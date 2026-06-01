import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface ContainerProps {
  header?: ReactNode
  footer?: ReactNode
  media?: ReactNode
  children?: ReactNode
  variant?: 'default' | 'panel' | 'neu'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

const variantClasses = {
  default: 'bg-ds-bg border border-ds-current',
  panel:   'bg-ds-panel border border-ds-current',
  neu:     'bg-ds-panel border-2 border-black shadow-neu',
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
}

export function Container({
  header,
  footer,
  media,
  children,
  variant = 'panel',
  padding = 'md',
  className,
}: ContainerProps) {
  return (
    <div className={cn('rounded-ds-xl overflow-hidden', variantClasses[variant], className)}>
      {media && <div className="w-full overflow-hidden">{media}</div>}
      {header && (
        <div className={cn('border-b border-ds-current', paddingClasses[padding])}>
          {header}
        </div>
      )}
      <div className={cn(paddingClasses[padding])}>{children}</div>
      {footer && (
        <div className={cn('border-t border-ds-current', paddingClasses[padding])}>
          {footer}
        </div>
      )}
    </div>
  )
}
