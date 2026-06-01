import { useState } from 'react'
import { Checkbox } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Checkbox } from '@shieldai/ds'

// Basic
<Checkbox label="Enable feature" />

// With description
<Checkbox
  label="Auto-retry on failure"
  description="Retry LLM calls up to 3 times before reporting error."
/>

// Indeterminate
<Checkbox checked="indeterminate" label="Select all" />

// Disabled
<Checkbox label="Read-only option" disabled />

// Controlled
const [checked, setChecked] = useState(false)
<Checkbox
  label="Enable telemetry"
  checked={checked}
  onCheckedChange={(v) => setChecked(v === true)}
/>`

const PROPS = [
  { name: 'label', type: 'string', description: 'Label text rendered next to the checkbox' },
  { name: 'description', type: 'string', description: 'Secondary text below the label' },
  { name: 'checked', type: 'boolean | "indeterminate"', description: 'Controlled checked state' },
  { name: 'defaultChecked', type: 'boolean', description: 'Initial checked state (uncontrolled)' },
  { name: 'onCheckedChange', type: '(checked: boolean | "indeterminate") => void', description: 'Called on state change' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the checkbox' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Shows red asterisk on label' },
]

export default function CheckboxPage() {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate')

  return (
    <ComponentBlock
      num="02.19"
      title="Checkbox"
      tag="Radix UI · indeterminate · accessible"
      description="Accessible checkbox built on Radix Checkbox. Supports indeterminate state for 'select all' patterns. Purple glow when checked."
      preview={
        <div className="space-y-4 w-full">
          <PreviewRow label="states">
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox checked={checked} onCheckedChange={setChecked} label="Indeterminate (click to cycle)" />
          </PreviewRow>
          <PreviewRow label="with description">
            <Checkbox
              label="Auto-retry on failure"
              description="Retry LLM calls up to 3 times before reporting error."
              defaultChecked
            />
          </PreviewRow>
          <PreviewRow label="disabled">
            <Checkbox label="Disabled unchecked" disabled />
            <Checkbox label="Disabled checked" disabled defaultChecked />
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="Checkbox.tsx"
      props={PROPS}
    />
  )
}
