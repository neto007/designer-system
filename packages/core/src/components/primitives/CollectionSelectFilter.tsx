import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface SelectFilterItem {
  value: string
  label: string
  count?: number
}

export interface CollectionSelectFilterProps {
  label?: string
  items: SelectFilterItem[]
  value?: string | null
  onChange?: (value: string | null) => void
  placeholder?: string
  clearLabel?: string
  className?: string
}

export function CollectionSelectFilter({
  label,
  items,
  value: controlled,
  onChange,
  placeholder = 'All',
  clearLabel = 'All',
  className,
}: CollectionSelectFilterProps) {
  const [internal, setInternal] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const value = controlled !== undefined ? controlled : internal
  const selected = items.find((i) => i.value === value)

  const set = (v: string | null) => {
    if (controlled === undefined) setInternal(v)
    onChange?.(v)
    setOpen(false)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      {label && (
        <span className="mr-2 text-xs text-ds-comment">{label}:</span>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-1.5 h-8 px-3 rounded-ds-md border text-xs font-medium transition-all',
          open || value
            ? 'border-ds-purple bg-ds-purple/10 text-ds-purple'
            : 'border-ds-current bg-ds-panel text-ds-fg/80 hover:border-ds-purple/40'
        )}
      >
        <span>{selected?.label ?? placeholder}</span>
        {selected?.count !== undefined && (
          <span className="rounded-full bg-ds-purple/20 text-ds-purple text-[10px] px-1 font-mono">
            {selected.count}
          </span>
        )}
        <ChevronDown className={cn('h-3 w-3 text-ds-comment flex-shrink-0 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className={cn(
          'absolute z-dropdown top-full mt-1 left-0 min-w-[160px]',
          'bg-ds-panel border border-ds-current rounded-ds-md shadow-lg overflow-hidden'
        )}>
          {/* Clear option */}
          <button
            type="button"
            onClick={() => set(null)}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors',
              !value ? 'text-ds-purple bg-ds-purple/10' : 'text-ds-comment hover:bg-ds-panel hover:text-ds-fg'
            )}
          >
            {!value && <Check className="h-3 w-3 flex-shrink-0" />}
            <span className={!value ? 'ml-0' : 'ml-5'}>{clearLabel}</span>
          </button>

          <div className="border-t border-ds-current/50" />

          {items.map((item) => {
            const isActive = item.value === value
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => set(item.value)}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors',
                  isActive ? 'text-ds-purple bg-ds-purple/10' : 'text-ds-fg hover:bg-ds-current/40'
                )}
              >
                {isActive ? <Check className="h-3 w-3 flex-shrink-0" /> : <span className="w-3 flex-shrink-0" />}
                <span className="flex-1 truncate">{item.label}</span>
                {item.count !== undefined && (
                  <span className="text-[10px] text-ds-comment font-mono">{item.count}</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
