import { type ReactNode, type MouseEvent } from 'react'
import { cn } from '../../lib/cn'
import { Checkbox } from './Checkbox'
import { Skeleton } from './Skeleton'

// ─── Item Card ────────────────────────────────────────────────────────────────

export interface ItemCardProps {
  title: ReactNode
  description?: ReactNode
  media?: ReactNode
  meta?: { label: string; value: ReactNode }[]
  badge?: ReactNode
  actions?: ReactNode
  selected?: boolean
  selectable?: boolean
  onSelect?: (selected: boolean) => void
  onClick?: () => void
  href?: string
  className?: string
  loading?: boolean
}

export function ItemCard({
  title,
  description,
  media,
  meta,
  badge,
  actions,
  selected = false,
  selectable,
  onSelect,
  onClick,
  href,
  className,
  loading,
}: ItemCardProps) {
  const Tag = href ? 'a' : 'div'

  const handleSelect = (e: MouseEvent) => {
    e.stopPropagation()
    onSelect?.(!selected)
  }

  if (loading) {
    return (
      <div className={cn('rounded-ds-lg border border-ds-current bg-ds-panel p-4 space-y-3', className)}>
        {media && <Skeleton className="w-full h-32 rounded-ds-md" />}
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    )
  }

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={cn(
        'relative rounded-ds-lg border bg-ds-panel transition-all duration-fast group',
        'flex flex-col overflow-hidden',
        selected
          ? 'border-ds-purple shadow-glow ring-1 ring-ds-purple/30'
          : 'border-ds-current hover:border-ds-fg/30',
        (onClick || href) && 'cursor-pointer',
        className
      )}
    >
      {/* Selection checkbox */}
      {selectable && (
        <div
          className="absolute top-3 left-3 z-10"
          onClick={handleSelect}
        >
          <Checkbox
            checked={selected}
            onCheckedChange={(v) => onSelect?.(Boolean(v))}
          />
        </div>
      )}

      {/* Badge */}
      {badge && (
        <div className="absolute top-3 right-3 z-10">{badge}</div>
      )}

      {/* Media */}
      {media && (
        <div className="relative overflow-hidden border-b border-ds-current/50">
          {media}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className={cn('font-semibold text-ds-fg text-sm leading-snug', selectable && 'pl-7')}>
          {title}
        </div>
        {description && (
          <div className="text-xs text-ds-comment leading-relaxed">{description}</div>
        )}

        {/* Meta */}
        {meta && meta.length > 0 && (
          <dl className="mt-auto pt-3 border-t border-ds-current/40 grid grid-cols-2 gap-x-4 gap-y-1.5">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-[10px] uppercase tracking-wider text-ds-comment font-mono">{m.label}</dt>
                <dd className="text-xs text-ds-fg mt-0.5">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* Actions */}
      {actions && (
        <div className="px-4 pb-3 flex items-center justify-end gap-2 border-t border-ds-current/30 pt-3">
          {actions}
        </div>
      )}
    </Tag>
  )
}

// ─── Action Card ──────────────────────────────────────────────────────────────

export interface ActionCardProps {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  cta?: ReactNode
  color?: 'purple' | 'green' | 'cyan' | 'orange' | 'red'
  className?: string
  onClick?: () => void
}

const colorVariants = {
  purple: 'border-ds-purple/30 bg-ds-purple/5 hover:bg-ds-purple/10',
  green:  'border-ds-green/30  bg-ds-green/5  hover:bg-ds-green/10',
  cyan:   'border-ds-cyan/30   bg-ds-cyan/5   hover:bg-ds-cyan/10',
  orange: 'border-ds-orange/30 bg-ds-orange/5 hover:bg-ds-orange/10',
  red:    'border-ds-red/30    bg-ds-red/5    hover:bg-ds-red/10',
} as const

const iconColors = {
  purple: 'text-ds-purple',
  green:  'text-ds-green',
  cyan:   'text-ds-cyan',
  orange: 'text-ds-orange',
  red:    'text-ds-red',
} as const

export function ActionCard({
  title,
  description,
  icon,
  cta,
  color = 'purple',
  className,
  onClick,
}: ActionCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-ds-lg border p-5 flex flex-col gap-3 transition-all duration-fast',
        colorVariants[color],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {icon && (
        <div className={cn('w-9 h-9 rounded-ds-md flex items-center justify-center bg-ds-bg/50', iconColors[color])}>
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <div className="font-semibold text-ds-fg text-sm">{title}</div>
        {description && (
          <div className="text-xs text-ds-comment leading-relaxed">{description}</div>
        )}
      </div>
      {cta && <div className="mt-auto pt-1">{cta}</div>}
    </div>
  )
}

// ─── Cards (collection) ───────────────────────────────────────────────────────

export interface CardsProps<T = unknown> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  columns?: 1 | 2 | 3 | 4
  loading?: boolean
  loadingCount?: number
  empty?: ReactNode
  className?: string
}

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
} as const

export function Cards<T = unknown>({
  items,
  renderItem,
  columns = 3,
  loading,
  loadingCount = 6,
  empty,
  className,
}: CardsProps<T>) {
  if (loading) {
    return (
      <div className={cn('grid gap-4', colsMap[columns], className)}>
        {Array.from({ length: loadingCount }).map((_, i) => (
          <ItemCard key={i} title="" loading />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center text-ds-comment text-sm">
        {empty ?? 'No items to display.'}
      </div>
    )
  }

  return (
    <div className={cn('grid gap-4', colsMap[columns], className)}>
      {items.map((item, i) => renderItem(item, i))}
    </div>
  )
}
