import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface GridProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  children?: ReactNode
}

export interface GridItemProps {
  span?: 1 | 2 | 3 | 4 | 6 | 8 | 12
  spanSm?: 1 | 2 | 3 | 4 | 6 | 12
  spanLg?: 1 | 2 | 3 | 4 | 6 | 8 | 12
  start?: number
  className?: string
  children?: ReactNode
}

const colsMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
}

const gapMap = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

const spanMap: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  6: 'col-span-6',
  8: 'col-span-8',
  12: 'col-span-full',
}

export function Grid({ cols = 12, gap = 'md', className, children }: GridProps) {
  return (
    <div className={cn('grid', colsMap[cols], gapMap[gap], className)}>
      {children}
    </div>
  )
}

export function GridItem({ span, spanSm, spanLg, className, children }: GridItemProps) {
  return (
    <div
      className={cn(
        span && spanMap[span],
        spanSm && `sm:${spanMap[spanSm]}`,
        spanLg && `lg:${spanMap[spanLg]}`,
        className
      )}
    >
      {children}
    </div>
  )
}
