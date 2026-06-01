import { useState, useCallback, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface TextFilterProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  debounceMs?: number
  matchCount?: number
  disabled?: boolean
  className?: string
}

export function TextFilter({
  value: controlledValue,
  onChange,
  placeholder = 'Filter…',
  debounceMs = 200,
  matchCount,
  disabled,
  className,
}: TextFilterProps) {
  const [internalValue, setInternalValue] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const value = controlledValue ?? internalValue
  const isControlled = controlledValue !== undefined

  const handleChange = useCallback(
    (raw: string) => {
      if (!isControlled) setInternalValue(raw)

      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        onChange?.(raw)
      }, debounceMs)
    },
    [isControlled, onChange, debounceMs]
  )

  const clear = useCallback(() => {
    if (!isControlled) setInternalValue('')
    onChange?.('')
  }, [isControlled, onChange])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div className={cn('relative flex items-center', className)}>
      <Search className="absolute left-3 h-4 w-4 text-ds-comment pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'w-full h-9 pl-9 pr-9 text-sm rounded-ds-md border border-ds-current bg-ds-panel',
          'text-ds-fg placeholder:text-ds-comment',
          'focus:outline-none focus:ring-2 focus:ring-ds-purple focus:border-transparent',
          'transition-colors duration-fast',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      />
      {value ? (
        <button
          type="button"
          onClick={clear}
          className="absolute right-3 h-4 w-4 text-ds-comment hover:text-ds-fg transition-colors"
          aria-label="Clear filter"
        >
          <X className="h-4 w-4" />
        </button>
      ) : matchCount !== undefined ? (
        <span className="absolute right-3 text-[10px] font-mono text-ds-comment">
          {matchCount}
        </span>
      ) : null}
    </div>
  )
}
