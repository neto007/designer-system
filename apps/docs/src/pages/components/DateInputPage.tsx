import { useState } from 'react'
import { DateInput, TimeInput } from '@shieldai/ds'
import type { DateInputValue, TimeInputValue } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { DateInput, TimeInput } from '@shieldai/ds'

// DateInput — segmented MM/DD/YYYY, keyboard-first
const [date, setDate] = useState<DateInputValue>({ year: '', month: '', day: '' })

<DateInput value={date} onChange={setDate} />

// TimeInput — segmented HH:MM
const [time, setTime] = useState<TimeInputValue>({ hours: '', minutes: '' })

<TimeInput value={time} onChange={setTime} />

// With seconds
<TimeInput showSeconds onChange={setTime} />

// 12-hour format
<TimeInput use12h onChange={setTime} />

// Arrow keys increment/decrement each segment
// Tab or / moves to next segment`

const PROPS_DATE = [
  { name: 'value', type: 'DateInputValue', default: '—', description: '{ year, month, day } — all strings for partial input support' },
  { name: 'onChange', type: '(value: DateInputValue) => void', default: '—', description: 'Called on every segment change' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all segments' },
]

const PROPS_TIME = [
  { name: 'value', type: 'TimeInputValue', default: '—', description: '{ hours, minutes, seconds?, period? }' },
  { name: 'onChange', type: '(value: TimeInputValue) => void', default: '—', description: 'Called on every segment change' },
  { name: 'showSeconds', type: 'boolean', default: 'false', description: 'Shows a third seconds segment' },
  { name: 'use12h', type: 'boolean', default: 'false', description: 'Switches to 12-hour mode with AM/PM toggle' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all segments' },
]

function LiveDemo() {
  const [date, setDate] = useState<DateInputValue>({ year: '', month: '', day: '' })
  const [time24, setTime24] = useState<TimeInputValue>({ hours: '', minutes: '' })
  const [time12, setTime12] = useState<TimeInputValue>({ hours: '', minutes: '', period: 'AM' })
  const [timeSec, setTimeSec] = useState<TimeInputValue>({ hours: '', minutes: '', seconds: '' })

  const dateStr = [date.month, date.day, date.year].filter(Boolean).join('/')

  return (
    <div className="space-y-5 w-full">
      <PreviewRow label="date input (MM/DD/YYYY)">
        <div className="space-y-1">
          <DateInput value={date} onChange={setDate} />
          {dateStr && <p className="text-xs text-ds-green font-mono">{dateStr}</p>}
        </div>
      </PreviewRow>

      <PreviewRow label="time — 24h">
        <TimeInput value={time24} onChange={setTime24} />
      </PreviewRow>

      <PreviewRow label="time — 12h with AM/PM">
        <TimeInput value={time12} onChange={setTime12} use12h />
      </PreviewRow>

      <PreviewRow label="time — with seconds">
        <TimeInput value={timeSec} onChange={setTimeSec} showSeconds />
      </PreviewRow>

      <PreviewRow label="disabled">
        <DateInput value={{ year: '2026', month: '05', day: '30' }} disabled />
        <TimeInput value={{ hours: '09', minutes: '41' }} disabled />
      </PreviewRow>
    </div>
  )
}

export default function DateInputPage() {
  return (
    <ComponentBlock
      num="02.DI"
      title="Date Input / Time Input"
      tag="segmented · keyboard-first · arrow increment"
      description="Keyboard-driven segmented inputs for dates and times. Arrow keys increment/decrement each segment, Tab or / advances to the next field. No calendar popover — use DatePicker for that."
      preview={<LiveDemo />}
      code={CODE}
      filename="DateInput.tsx"
      props={[...PROPS_DATE, ...PROPS_TIME]}
    />
  )
}
