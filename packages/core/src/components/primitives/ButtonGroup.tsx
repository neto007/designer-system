import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

// ─── Button Group ─────────────────────────────────────────────────────────────

export interface ButtonGroupProps {
  children: ReactNode
  orientation?: 'horizontal' | 'vertical'
  className?: string
  'aria-label'?: string
}

export function ButtonGroup({
  children,
  orientation = 'horizontal',
  className,
  'aria-label': ariaLabel,
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        // Round only outer corners
        '[&>*]:rounded-none',
        orientation === 'horizontal'
          ? [
              '[&>*:first-child]:rounded-l-ds-md',
              '[&>*:last-child]:rounded-r-ds-md',
              '[&>*:not(:first-child)]:border-l-0',
            ]
          : [
              '[&>*:first-child]:rounded-t-ds-md',
              '[&>*:last-child]:rounded-b-ds-md',
              '[&>*:not(:first-child)]:border-t-0',
            ],
        className
      )}
    >
      {children}
    </div>
  )
}
