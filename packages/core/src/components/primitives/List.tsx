import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Check } from 'lucide-react'

export interface ListItem<T extends string = string> {
  value: T
  label: string
  description?: string
  icon?: ReactNode
  meta?: string
  disabled?: boolean
}

export interface ListProps<T extends string = string> {
  items: ListItem<T>[]
  selected?: T | T[]
  onSelect?: (value: T) => void
  multiSelect?: boolean
  variant?: 'default' | 'compact' | 'divided'
  className?: string
  emptyState?: ReactNode
}

export function List<T extends string = string>({
  items,
  selected,
  onSelect,
  multiSelect = false,
  variant = 'default',
  className,
  emptyState,
}: ListProps<T>) {
  const selectedSet = new Set(
    Array.isArray(selected) ? selected : selected ? [selected] : []
  )

  const isSelected = (value: T) => selectedSet.has(value)

  if (items.length === 0) {
    return (
      <div className={cn('py-8 text-center text-sm text-ds-comment', className)}>
        {emptyState ?? 'No items'}
      </div>
    )
  }

  return (
    <ul
      role={multiSelect ? 'listbox' : 'listbox'}
      aria-multiselectable={multiSelect}
      className={cn(
        'w-full',
        variant === 'divided' && 'divide-y divide-ds-current',
        variant === 'default' && 'space-y-0.5',
        className
      )}
    >
      {items.map((item) => {
        const active = isSelected(item.value)

        return (
          <li
            key={item.value}
            role="option"
            aria-selected={active}
            aria-disabled={item.disabled}
            onClick={() => !item.disabled && onSelect?.(item.value)}
            className={cn(
              'flex items-center gap-3 px-3 transition-colors cursor-pointer',
              variant === 'compact' ? 'py-1.5' : 'py-2.5',
              variant !== 'divided' && 'rounded-ds-md',
              active
                ? 'bg-ds-purple/15 text-ds-fg'
                : 'text-ds-fg/80 hover:bg-ds-panel hover:text-ds-fg',
              item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
            )}
          >
            {item.icon && (
              <span className={cn('flex-shrink-0', active ? 'text-ds-purple' : 'text-ds-comment')}>
                {item.icon}
              </span>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{item.label}</div>
              {item.description && (
                <div className="text-xs text-ds-comment truncate">{item.description}</div>
              )}
            </div>
            {item.meta && (
              <span className="text-[10px] text-ds-comment font-mono flex-shrink-0">{item.meta}</span>
            )}
            {active && <Check className="h-3.5 w-3.5 text-ds-purple flex-shrink-0" />}
          </li>
        )
      })}
    </ul>
  )
}
