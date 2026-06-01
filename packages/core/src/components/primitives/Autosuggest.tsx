import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react'
import { Search } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Input } from './Input'

export interface AutosuggestProps {
  value?: string
  onChange?: (value: string) => void
  onSelect?: (value: string) => void
  options?: string[]
  placeholder?: string
  disabled?: boolean
  debounceMs?: number
  maxSuggestions?: number
  className?: string
}

export function Autosuggest({
  value: controlledValue,
  onChange,
  onSelect,
  options = [],
  placeholder = 'Search…',
  disabled,
  debounceMs = 300,
  maxSuggestions = 6,
  className,
}: AutosuggestProps) {
  const [internalValue, setInternalValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [filtered, setFiltered] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const value = controlledValue ?? internalValue
  const setValue = onChange ?? setInternalValue

  // Debounced filter
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      if (!value.trim()) {
        setFiltered([])
        setIsOpen(false)
        return
      }

      const lower = value.toLowerCase()
      const matches = options
        .filter((opt) => opt.toLowerCase().includes(lower))
        .slice(0, maxSuggestions)

      setFiltered(matches)
      setIsOpen(matches.length > 0)
      setActiveIndex(-1)
    }, debounceMs)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [value, options, debounceMs, maxSuggestions])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = useCallback(
    (suggestion: string) => {
      onSelect?.(suggestion)
      setValue(suggestion)
      setIsOpen(false)
      setActiveIndex(-1)
    },
    [onSelect, setValue]
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && activeIndex < filtered.length) {
          handleSelect(filtered[activeIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setActiveIndex(-1)
        break
    }
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <Input
        ref={inputRef}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          // Re-wrap since Input's onKeyDown type may differ
          handleKeyDown(e as unknown as KeyboardEvent<HTMLDivElement>)
        }}
        placeholder={placeholder}
        disabled={disabled}
        leftElement={<Search className="h-4 w-4 text-ds-comment" />}
        aria-autocomplete="list"
        aria-expanded={isOpen}
        role="combobox"
      />

      {/* Suggestions dropdown */}
      {isOpen && filtered.length > 0 && (
        <ul
          className={cn(
            'absolute z-dropdown mt-1 w-full min-w-[200px]',
            'bg-ds-panel border border-ds-current rounded-ds-md shadow-lg',
            'overflow-hidden'
          )}
          role="listbox"
        >
          {filtered.map((suggestion, i) => (
            <li
              key={suggestion}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={() => handleSelect(suggestion)}
              className={cn(
                'px-3 py-2 text-sm cursor-pointer transition-colors',
                'text-ds-fg hover:bg-ds-purple/15',
                i === activeIndex && 'bg-ds-purple/20 text-ds-purple'
              )}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {isOpen && value.trim() && filtered.length === 0 && (
        <div
          className={cn(
            'absolute z-dropdown mt-1 w-full min-w-[200px]',
            'bg-ds-panel border border-ds-current rounded-ds-md shadow-lg',
            'px-3 py-2 text-sm text-ds-comment'
          )}
        >
          No matches
        </div>
      )}
    </div>
  )
}