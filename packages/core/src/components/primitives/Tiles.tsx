import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface TileItem<T extends string = string> {
  value: T
  label: string
  description?: string
  icon?: ReactNode
  disabled?: boolean
}

export interface TilesProps<T extends string = string> {
  items: TileItem<T>[]
  value?: T
  onChange?: (value: T) => void
  columns?: 2 | 3 | 4
  className?: string
}

const colsMap: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
}

export function Tiles<T extends string = string>({
  items,
  value,
  onChange,
  columns = 3,
  className,
}: TilesProps<T>) {
  return (
    <div
      role="radiogroup"
      className={cn('grid gap-3', colsMap[columns], className)}
    >
      {items.map((item) => {
        const selected = item.value === value

        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={item.disabled}
            onClick={() => !item.disabled && onChange?.(item.value)}
            className={cn(
              'relative flex flex-col items-start gap-2 p-4 rounded-ds-xl border-2 text-left',
              'transition-all duration-fast cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-purple focus-visible:ring-offset-2 focus-visible:ring-offset-ds-bg',
              selected
                ? 'bg-ds-purple/10 border-ds-purple shadow-glow text-ds-fg'
                : 'bg-ds-panel border-ds-current hover:border-ds-purple/40 text-ds-fg/80',
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {/* Selected indicator */}
            <span
              className={cn(
                'absolute top-3 right-3 w-4 h-4 rounded-full border-2 transition-all',
                selected
                  ? 'border-ds-purple bg-ds-purple'
                  : 'border-ds-comment bg-transparent'
              )}
            >
              {selected && (
                <span className="absolute inset-0.5 rounded-full bg-ds-bg" />
              )}
            </span>

            {item.icon && (
              <span className={cn('text-xl', selected ? 'text-ds-purple' : 'text-ds-comment')}>
                {item.icon}
              </span>
            )}
            <div>
              <div className="text-sm font-semibold leading-tight">{item.label}</div>
              {item.description && (
                <div className="text-xs text-ds-comment mt-0.5 leading-relaxed">{item.description}</div>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
