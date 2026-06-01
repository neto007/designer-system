import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import { ChevronDown, X, Check, Search } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface MultiselectOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface MultiselectProps {
  options: MultiselectOption[]
  value?: string[]
  onChange?: (values: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  label?: string
  disabled?: boolean
  error?: string
  maxTokens?: number
  filterType?: 'includes' | 'startsWith'
  className?: string
  'aria-label'?: string
}

export function Multiselect({
  options,
  value = [],
  onChange,
  placeholder = 'Select options…',
  searchPlaceholder = 'Search…',
  label,
  disabled,
  error,
  maxTokens,
  filterType = 'includes',
  className,
  'aria-label': ariaLabel,
}: MultiselectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 0)
    } else {
      setSearch('')
    }
  }, [open])

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const filtered = options.filter((o) => {
    const q = search.toLowerCase()
    if (!q) return true
    return filterType === 'startsWith'
      ? o.label.toLowerCase().startsWith(q)
      : o.label.toLowerCase().includes(q)
  })

  const toggle = (optValue: string) => {
    if (!onChange) return
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue))
    } else {
      if (maxTokens && value.length >= maxTokens) return
      onChange([...value, optValue])
    }
  }

  const remove = (optValue: string) => {
    onChange?.(value.filter((v) => v !== optValue))
  }

  const selectedOptions = value
    .map((v) => options.find((o) => o.value === v))
    .filter(Boolean) as MultiselectOption[]

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') setOpen(false)
    if ((e.key === 'Enter' || e.key === ' ') && !open) {
      e.preventDefault()
      setOpen(true)
    }
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label className="text-sm font-medium text-ds-fg">{label}</label>
      )}

      <div ref={containerRef} className="relative">
        {/* Trigger */}
        <div
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={ariaLabel}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          onClick={() => !disabled && setOpen((o) => !o)}
          className={cn(
            'min-h-10 flex flex-wrap gap-1.5 items-center px-3 py-2 rounded-ds-md border',
            'bg-ds-panel cursor-pointer transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-ds-purple focus:ring-offset-1 focus:ring-offset-ds-bg',
            open ? 'border-ds-purple ring-2 ring-ds-purple/30' : 'border-ds-current hover:border-ds-fg/30',
            error && 'border-ds-red',
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
        >
          {/* Selected tokens */}
          {selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-ds-sm text-xs font-medium bg-ds-purple/20 text-ds-purple border border-ds-purple/30"
              >
                {opt.label}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); remove(opt.value) }}
                  className="text-ds-purple/70 hover:text-ds-purple transition-colors -mr-0.5"
                  aria-label={`Remove ${opt.label}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-sm text-ds-comment">{placeholder}</span>
          )}

          <ChevronDown
            className={cn(
              'h-4 w-4 text-ds-comment ml-auto flex-shrink-0 transition-transform duration-fast',
              open && 'rotate-180'
            )}
          />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-dropdown top-full mt-1 left-0 right-0 rounded-ds-md border border-ds-current bg-ds-panel shadow-neu-sm overflow-hidden">
            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-ds-current">
              <Search className="h-3.5 w-3.5 text-ds-comment flex-shrink-0" />
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1 bg-transparent text-sm text-ds-fg placeholder:text-ds-comment outline-none"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-ds-comment hover:text-ds-fg">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Options list */}
            <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <li className="px-3 py-4 text-center text-sm text-ds-comment">No results found</li>
              ) : (
                filtered.map((opt) => {
                  const isSelected = value.includes(opt.value)
                  const isDisabled = opt.disabled || (!isSelected && maxTokens != null && value.length >= maxTokens)

                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => !isDisabled && toggle(opt.value)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 text-sm cursor-pointer transition-colors',
                        isDisabled
                          ? 'opacity-40 cursor-not-allowed text-ds-comment'
                          : isSelected
                            ? 'text-ds-purple bg-ds-purple/10 hover:bg-ds-purple/15'
                            : 'text-ds-fg hover:bg-ds-current/50'
                      )}
                    >
                      <span
                        className={cn(
                          'flex-shrink-0 w-4 h-4 rounded-sm border transition-all',
                          isSelected
                            ? 'bg-ds-purple border-ds-purple flex items-center justify-center'
                            : 'border-ds-comment/50'
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3 text-black stroke-[3]" />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="truncate">{opt.label}</div>
                        {opt.description && (
                          <div className="text-xs text-ds-comment truncate">{opt.description}</div>
                        )}
                      </div>
                    </li>
                  )
                })
              )}
            </ul>

            {/* Footer count */}
            {maxTokens && (
              <div className="px-3 py-1.5 border-t border-ds-current text-xs text-ds-comment text-right">
                {value.length} / {maxTokens} selected
              </div>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-ds-red">{error}</p>}
    </div>
  )
}
