import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'

export interface KeyValueItem {
  key: string
  value: ReactNode
  copyValue?: string
}

export interface KeyValuePairsProps {
  items: KeyValueItem[]
  columns?: 1 | 2 | 3 | 4
  variant?: 'default' | 'compact' | 'code'
  className?: string
}

export function KeyValuePairs({ items, columns = 2, variant = 'default', className }: KeyValuePairsProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  }

  return (
    <dl className={cn('grid gap-x-6 gap-y-4', gridCols[columns], className)}>
      {items.map(({ key, value }) => (
        <div key={key} className="space-y-1">
          <dt className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">{key}</dt>
          <dd
            className={cn(
              'text-ds-fg',
              variant === 'compact' && 'text-sm',
              variant === 'code' && 'font-mono text-ds-cyan text-[12px]',
              variant === 'default' && 'text-sm'
            )}
          >
            {value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
