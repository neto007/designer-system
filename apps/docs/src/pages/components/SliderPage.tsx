import { useState } from 'react'
import { Slider } from '@shieldai/ds'
import { ComponentBlock, DocSection, PreviewRow } from '../../components/docs'

const CODE = `import { Slider } from '@shieldai/ds'

// Basic
<Slider defaultValue={[40]} label="Volume" showValue />

// Range (dual thumb)
<Slider defaultValue={[20, 80]} label="Price Range" showValue />

// Colors
<Slider defaultValue={[60]} color="green" />
<Slider defaultValue={[60]} color="orange" />
<Slider defaultValue={[60]} color="cyan" />

// With marks
<Slider defaultValue={[50]} step={10} marks label="Quality" showValue />

// Controlled
const [val, setVal] = useState([50])
<Slider value={val} onValueChange={setVal} label="Threshold" showValue />`

const PROPS = [
  { name: 'value', type: 'number[]', default: '—', description: 'Controlled value(s). Two elements = range slider.' },
  { name: 'defaultValue', type: 'number[]', default: '[min]', description: 'Uncontrolled initial value(s)' },
  { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
  { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
  { name: 'step', type: 'number', default: '1', description: 'Increment between values' },
  { name: 'onValueChange', type: '(value: number[]) => void', default: '—', description: 'Fires on every thumb move' },
  { name: 'color', type: '"purple" | "green" | "orange" | "red" | "cyan"', default: '"purple"', description: 'Track and thumb color' },
  { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Track height' },
  { name: 'label', type: 'string', default: '—', description: 'Label shown above the track' },
  { name: 'showValue', type: 'boolean', default: 'false', description: 'Displays current value(s) above the track' },
  { name: 'marks', type: 'boolean', default: 'false', description: 'Renders tick marks at each step + min/max labels' },
  { name: 'formatValue', type: '(v: number) => string', default: 'String', description: 'Format displayed value(s)' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction' },
  { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Track orientation' },
]

function ControlledDemo() {
  const [val, setVal] = useState([42])
  const [range, setRange] = useState([20, 75])
  return (
    <div className="space-y-6 w-full max-w-md">
      <Slider value={val} onValueChange={setVal} label="Confidence threshold" showValue formatValue={(v) => `${v}%`} />
      <Slider value={range} onValueChange={setRange} label="Memory range" showValue formatValue={(v) => `${v} MB`} />
    </div>
  )
}

export default function SliderPage() {
  return (
    <ComponentBlock
      num="02.17"
      title="Slider"
      tag="single · range · marks · 5 colors"
      description="Numeric input via draggable thumbs. Supports single value, dual-thumb ranges, step marks, and five color variants. Built on Radix Slider for full keyboard accessibility."
      preview={
        <div className="space-y-6 w-full max-w-md">
          <Slider defaultValue={[40]} label="Volume" showValue formatValue={(v) => `${v}%`} />
          <Slider defaultValue={[20, 80]} label="Price range" showValue formatValue={(v) => `$${v}`} />
        </div>
      }
      code={CODE}
      props={PROPS}
    >
      <DocSection title="Controlled">
        <ControlledDemo />
      </DocSection>

      <DocSection title="Colors">
        <PreviewRow label="variants">
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {(['purple', 'green', 'orange', 'red', 'cyan'] as const).map((c) => (
              <Slider key={c} defaultValue={[60]} color={c} label={c} showValue />
            ))}
          </div>
        </PreviewRow>
      </DocSection>

      <DocSection title="With marks">
        <div className="w-full max-w-md">
          <Slider defaultValue={[50]} step={10} marks label="Quality" showValue />
        </div>
      </DocSection>

      <DocSection title="Sizes">
        <PreviewRow label="sm · md · lg">
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Slider defaultValue={[60]} size="sm" label="Small" />
            <Slider defaultValue={[60]} size="md" label="Medium" />
            <Slider defaultValue={[60]} size="lg" label="Large" />
          </div>
        </PreviewRow>
      </DocSection>

      <DocSection title="Disabled">
        <div className="w-full max-w-xs">
          <Slider defaultValue={[40]} disabled label="Disabled" showValue />
        </div>
      </DocSection>
    </ComponentBlock>
  )
}
