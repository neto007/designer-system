import { useState } from 'react'
import { Calendar } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { Calendar } from '@shieldai/ds'

// Single date
const [date, setDate] = useState<Date | null>(null)
<Calendar value={date} onChange={setDate} />

// Date range
const [range, setRange] = useState<Date[]>([])
<Calendar mode="range" value={range} onChange={setRange} />

// Multi-select
const [dates, setDates] = useState<Date[]>([])
<Calendar mode="multi" value={dates} onChange={setDates} />

// With constraints
<Calendar
  mode="single"
  minDate={new Date()}
  maxDate={new Date(Date.now() + 30 * 864e5)}
  onChange={setDate}
/>`

const PROPS = [
  { name: 'mode', type: '"single" | "range" | "multi"', default: '"single"', description: 'Selection behavior' },
  { name: 'value', type: 'Date | Date[] | null', default: '—', description: 'Controlled selection — single Date, array of two for range, array of many for multi' },
  { name: 'onChange', type: '(value: Date | Date[] | null) => void', default: '—', description: 'Called when selection changes' },
  { name: 'minDate', type: 'Date', default: '—', description: 'Earliest selectable date' },
  { name: 'maxDate', type: 'Date', default: '—', description: 'Latest selectable date' },
  { name: 'disabledDates', type: 'Date[]', default: '—', description: 'Specific dates to disable' },
]

function fmt(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function LiveDemo() {
  const [single, setSingle] = useState<Date | null>(null)
  const [range, setRange] = useState<Date[] | null>(null)
  const [multi, setMulti] = useState<Date[] | null>(null)

  return (
    <div className="flex flex-wrap gap-6 w-full">
      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase text-ds-comment">single</div>
        <Calendar value={single} onChange={(v) => setSingle(v as Date | null)} />
        {single && <p className="text-xs text-ds-green font-mono">{fmt(single)}</p>}
      </div>

      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase text-ds-comment">range</div>
        <Calendar mode="range" value={range ?? []} onChange={(v) => setRange(v as Date[])} />
        {Array.isArray(range) && range.length > 0 && (
          <p className="text-xs text-ds-cyan font-mono">
            {fmt(range[0])}{range[1] ? ` → ${fmt(range[1])}` : ' →…'}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase text-ds-comment">multi</div>
        <Calendar mode="multi" value={multi ?? []} onChange={(v) => setMulti(v as Date[])} />
        {Array.isArray(multi) && multi.length > 0 && (
          <p className="text-xs text-ds-purple font-mono">{multi.length} selected</p>
        )}
      </div>
    </div>
  )
}

export default function CalendarPage() {
  return (
    <ComponentBlock
      num="02.CA"
      title="Calendar"
      tag="single · range · multi · keyboard nav · min/max"
      description="Month-grid calendar for date selection. Supports single, range (hover preview included), and multi-select modes. Arrow keys navigate days, min/max dates disable out-of-range cells."
      preview={<LiveDemo />}
      code={CODE}
      filename="Calendar.tsx"
      props={PROPS}
    />
  )
}
