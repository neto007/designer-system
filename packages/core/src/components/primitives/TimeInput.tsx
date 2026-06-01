import { useRef, useState, type KeyboardEvent } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface TimeInputValue {
  hours: string
  minutes: string
  seconds?: string
  period?: 'AM' | 'PM'
}

export interface TimeInputProps {
  value?: TimeInputValue
  onChange?: (value: TimeInputValue) => void
  showSeconds?: boolean
  use12h?: boolean
  disabled?: boolean
  className?: string
}

function clampPad(raw: string, min: number, max: number) {
  const n = parseInt(raw, 10)
  if (isNaN(n)) return ''
  return String(Math.max(min, Math.min(max, n))).padStart(2, '0')
}

export function TimeInput({
  value: controlled,
  onChange,
  showSeconds = false,
  use12h = false,
  disabled,
  className,
}: TimeInputProps) {
  const [internal, setInternal] = useState<TimeInputValue>({
    hours: '',
    minutes: '',
    seconds: '',
    period: 'AM',
  })
  const value = controlled ?? internal
  const minRef = useRef<HTMLInputElement>(null)
  const secRef = useRef<HTMLInputElement>(null)
  const hrMax = use12h ? 12 : 23

  const set = (field: keyof TimeInputValue, raw: string) => {
    const next = { ...value, [field]: raw }
    if (!controlled) setInternal(next)
    onChange?.(next)
  }

  const handleKey = (
    e: KeyboardEvent<HTMLInputElement>,
    field: 'hours' | 'minutes' | 'seconds',
    nextRef?: React.RefObject<HTMLInputElement | null>
  ) => {
    const limits = {
      hours:   { min: use12h ? 1 : 0, max: hrMax },
      minutes: { min: 0, max: 59 },
      seconds: { min: 0, max: 59 },
    }
    const { min, max } = limits[field]

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const cur = parseInt(value[field] as string || String(min - 1), 10)
      set(field, String(Math.min(cur + 1, max)).padStart(2, '0'))
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const cur = parseInt(value[field] as string || String(max + 1), 10)
      set(field, String(Math.max(cur - 1, min)).padStart(2, '0'))
    } else if ((e.key === ':' || e.key === 'Tab') && nextRef) {
      if (e.key === ':') e.preventDefault()
      nextRef.current?.focus()
      nextRef.current?.select()
    }
  }

  const seg = (
    ref: React.RefObject<HTMLInputElement | null>,
    field: 'hours' | 'minutes' | 'seconds',
    placeholder: string,
    maxVal: number,
    minVal: number,
    nextRef?: React.RefObject<HTMLInputElement | null>
  ) => (
    <input
      ref={ref}
      type="text"
      inputMode="numeric"
      value={value[field] ?? ''}
      placeholder={placeholder}
      maxLength={2}
      disabled={disabled}
      onChange={(e) => {
        const raw = e.target.value.replace(/\D/g, '').slice(0, 2)
        set(field, raw)
        if (raw.length === 2 && nextRef) {
          setTimeout(() => { nextRef.current?.focus(); nextRef.current?.select() }, 0)
        }
      }}
      onKeyDown={(e) => handleKey(e, field, nextRef)}
      onFocus={(e) => e.target.select()}
      onBlur={() => {
        const raw = value[field] as string
        if (raw) set(field, clampPad(raw, minVal, maxVal))
      }}
      className={cn(
        'w-8 bg-transparent border-none outline-none text-center font-mono text-sm text-ds-fg',
        'placeholder:text-ds-comment/60 focus:text-ds-purple caret-ds-purple'
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
      <Clock className="h-4 w-4 text-ds-comment flex-shrink-0 mr-1" />
      {seg(useRef(null), 'hours', use12h ? 'hh' : 'HH', hrMax, use12h ? 1 : 0, minRef)}
      <span className="text-ds-comment text-sm select-none">:</span>
      {seg(minRef, 'minutes', 'mm', 59, 0, showSeconds ? secRef : undefined)}
      {showSeconds && (
        <>
          <span className="text-ds-comment text-sm select-none">:</span>
          {seg(secRef, 'seconds', 'ss', 59, 0)}
        </>
      )}
      {use12h && (
        <button
          type="button"
          onClick={() => set('period', value.period === 'AM' ? 'PM' : 'AM')}
          disabled={disabled}
          className="ml-1 text-xs font-mono text-ds-purple hover:text-ds-pink transition-colors"
        >
          {value.period ?? 'AM'}
        </button>
      )}
    </div>
  )
}
