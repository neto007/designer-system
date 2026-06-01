import { useRef, useState, type KeyboardEvent } from 'react'
import { Calendar } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface DateInputValue {
  year: string
  month: string
  day: string
}

export interface DateInputProps {
  value?: DateInputValue
  onChange?: (value: DateInputValue) => void
  disabled?: boolean
  min?: string
  max?: string
  className?: string
}

function pad(v: string, max: number) {
  const n = parseInt(v, 10)
  if (isNaN(n)) return v
  return String(Math.min(n, max)).padStart(2, '0')
}

function clamp(raw: string, min: number, max: number) {
  const n = parseInt(raw, 10)
  if (isNaN(n)) return ''
  return String(Math.max(min, Math.min(max, n)))
}

export function DateInput({
  value: controlled,
  onChange,
  disabled,
  className,
}: DateInputProps) {
  const [internal, setInternal] = useState<DateInputValue>({ year: '', month: '', day: '' })
  const value = controlled ?? internal

  const monthRef = useRef<HTMLInputElement>(null)
  const dayRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)

  const set = (field: keyof DateInputValue, raw: string) => {
    const next = { ...value, [field]: raw }
    if (!controlled) setInternal(next)
    onChange?.(next)
  }

  const handleKey = (
    e: KeyboardEvent<HTMLInputElement>,
    field: keyof DateInputValue,
    nextRef?: React.RefObject<HTMLInputElement | null>
  ) => {
    const input = e.currentTarget
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const limits = { month: { min: 1, max: 12 }, day: { min: 1, max: 31 }, year: { min: 1900, max: 2099 } }
      const { min, max } = limits[field]
      const cur = parseInt(value[field] || String(min - 1), 10)
      set(field, String(Math.min(cur + 1, max)).padStart(field === 'year' ? 4 : 2, '0'))
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const limits = { month: { min: 1, max: 12 }, day: { min: 1, max: 31 }, year: { min: 1900, max: 2099 } }
      const { min, max } = limits[field]
      const cur = parseInt(value[field] || String(max + 1), 10)
      set(field, String(Math.max(cur - 1, min)).padStart(field === 'year' ? 4 : 2, '0'))
    } else if (e.key === 'Tab' || e.key === '/') {
      if (e.key === '/') e.preventDefault()
      nextRef?.current?.focus()
      nextRef?.current?.select()
    } else if (e.key === 'Backspace' && input.value === '') {
      if (field === 'day') { monthRef.current?.focus(); monthRef.current?.select() }
      if (field === 'year') { dayRef.current?.focus(); dayRef.current?.select() }
    }
  }

  const handleBlur = (field: keyof DateInputValue) => {
    if (!value[field]) return
    if (field === 'month') set('month', pad(clamp(value.month, 1, 12), 12))
    if (field === 'day') set('day', pad(clamp(value.day, 1, 31), 31))
    if (field === 'year' && value.year.length < 4) set('year', '')
  }

  const seg = (
    ref: React.RefObject<HTMLInputElement | null>,
    field: keyof DateInputValue,
    placeholder: string,
    maxLen: number,
    nextRef?: React.RefObject<HTMLInputElement | null>
  ) => (
    <input
      ref={ref}
      type="text"
      inputMode="numeric"
      value={value[field]}
      placeholder={placeholder}
      maxLength={maxLen}
      disabled={disabled}
      onChange={(e) => {
        const raw = e.target.value.replace(/\D/g, '').slice(0, maxLen)
        set(field, raw)
        if (raw.length === maxLen && nextRef) {
          setTimeout(() => { nextRef.current?.focus(); nextRef.current?.select() }, 0)
        }
      }}
      onKeyDown={(e) => handleKey(e, field, nextRef)}
      onFocus={(e) => e.target.select()}
      onBlur={() => handleBlur(field)}
      className={cn(
        'bg-transparent border-none outline-none text-center font-mono text-sm text-ds-fg',
        'placeholder:text-ds-comment/60 focus:text-ds-purple caret-ds-purple',
        field === 'year' ? 'w-12' : 'w-8'
      )}
    />
  )

  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 h-9 px-3 rounded-ds-md border border-ds-current bg-ds-panel',
        'focus-within:ring-2 focus-within:ring-ds-purple focus-within:border-transparent transition-all',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <Calendar className="h-4 w-4 text-ds-comment flex-shrink-0 mr-1" />
      {seg(monthRef, 'month', 'MM', 2, dayRef)}
      <span className="text-ds-comment text-sm select-none">/</span>
      {seg(dayRef, 'day', 'DD', 2, yearRef)}
      <span className="text-ds-comment text-sm select-none">/</span>
      {seg(yearRef, 'year', 'YYYY', 4)}
    </div>
  )
}
