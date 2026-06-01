import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/cn'

export type CalendarMode = 'single' | 'range' | 'multi'

export interface CalendarProps {
  value?: Date | Date[] | null
  onChange?: (value: Date | Date[] | null) => void
  mode?: CalendarMode
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  className?: string
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isInRange(d: Date, start: Date, end: Date) {
  const t = d.getTime()
  return t >= Math.min(start.getTime(), end.getTime()) && t <= Math.max(start.getTime(), end.getTime())
}

function isDisabled(d: Date, min?: Date, max?: Date, disabled?: Date[]) {
  if (min && d < min) return true
  if (max && d > max) return true
  if (disabled?.some((dd) => isSameDay(dd, d))) return true
  return false
}

export function Calendar({
  value,
  onChange,
  mode = 'single',
  minDate,
  maxDate,
  disabledDates,
  className,
}: CalendarProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [hovered, setHovered] = useState<Date | null>(null)

  // Normalize value
  const selected: Date[] = !value
    ? []
    : Array.isArray(value)
    ? value
    : [value]

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11) }
    else setViewMonth((m) => m - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0) }
    else setViewMonth((m) => m + 1)
  }

  const handleDay = (day: Date) => {
    if (isDisabled(day, minDate, maxDate, disabledDates)) return

    if (mode === 'single') {
      onChange?.(isSameDay(day, selected[0] ?? new Date(0)) ? null : day)
    } else if (mode === 'multi') {
      const idx = selected.findIndex((d) => isSameDay(d, day))
      onChange?.(idx >= 0 ? selected.filter((_, i) => i !== idx) : [...selected, day])
    } else {
      // range
      if (selected.length !== 1) {
        onChange?.([day])
      } else {
        const sorted = [selected[0], day].sort((a, b) => a.getTime() - b.getTime())
        onChange?.(sorted)
      }
    }
  }

  // Build grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ]
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null)

  const rangeStart = mode === 'range' && selected.length >= 1 ? selected[0] : null
  const rangeEnd   = mode === 'range' && selected.length >= 2 ? selected[1] : hovered

  return (
    <div className={cn('select-none w-64 bg-ds-panel border border-ds-current rounded-ds-xl p-3', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          className="p-1 rounded hover:bg-ds-current transition-colors text-ds-comment hover:text-ds-fg"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold text-ds-fg">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="p-1 rounded hover:bg-ds-current transition-colors text-ds-comment hover:text-ds-fg"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-mono text-ds-comment py-1">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />

          const isToday = isSameDay(day, today)
          const isSel = selected.some((d) => isSameDay(d, day))
          const disabled = isDisabled(day, minDate, maxDate, disabledDates)
          const inRange = mode === 'range' && rangeStart && rangeEnd
            ? isInRange(day, rangeStart, rangeEnd) && !isSel
            : false

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => handleDay(day)}
              onMouseEnter={() => mode === 'range' && selected.length === 1 && setHovered(day)}
              onMouseLeave={() => mode === 'range' && setHovered(null)}
              aria-label={day.toLocaleDateString()}
              aria-pressed={isSel}
              className={cn(
                'h-8 w-full rounded-ds-md text-xs font-mono transition-all',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ds-purple',
                isSel && 'bg-ds-purple text-ds-bg font-bold shadow-glow',
                !isSel && inRange && 'bg-ds-purple/20 text-ds-purple rounded-none',
                !isSel && !inRange && isToday && 'border border-ds-purple/40 text-ds-purple',
                !isSel && !inRange && !isToday && 'text-ds-fg hover:bg-ds-current',
                disabled && 'opacity-30 cursor-not-allowed hover:bg-transparent'
              )}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
