import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface SpaceBetweenProps {
  direction?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  children?: ReactNode
}

const spacingMap = {
  vertical:   { sm: 'space-y-1', md: 'space-y-3', lg: 'space-y-6', xl: 'space-y-10' },
  horizontal: { sm: 'gap-1',     md: 'gap-3',     lg: 'gap-6',     xl: 'gap-10' },
} as const

export function SpaceBetween({
  direction = 'vertical',
  size = 'md',
  className,
  children,
}: SpaceBetweenProps) {
  const spacer = spacingMap[direction][size]

  if (direction === 'horizontal') {
    return (
      <div className={cn('flex items-center', spacer, className)}>
        {children}
      </div>
    )
  }

  return (
    <div className={cn(spacer, className)}>
      {children}
    </div>
  )
}