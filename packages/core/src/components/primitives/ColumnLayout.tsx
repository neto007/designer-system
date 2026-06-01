import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface ColumnLayoutProps {
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
  children?: ReactNode
}

const colsMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const gapMap = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-8',
}

export function ColumnLayout({
  columns = 2,
  gap = 'md',
  className,
  children,
}: ColumnLayoutProps) {
  return (
    <div className={cn('grid', colsMap[columns], gapMap[gap], className)}>
      {children}
    </div>
  )
}