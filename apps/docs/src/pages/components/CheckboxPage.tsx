import { useState } from 'react'
import { Checkbox } from '@shieldai/ds'
import { ComponentBlock, DocSection, PreviewRow, PlaygroundBlock } from '../../components/docs'
import type { ControlValues } from '../../components/docs'

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

const PLAYGROUND_CONTROLS = [
  { type: 'text' as const, key: 'label', label: 'label', default: 'Accept terms and conditions' },
  { type: 'text' as const, key: 'description', label: 'description', default: 'You must agree to continue' },
  { type: 'boolean' as const, key: 'disabled', label: 'disabled', default: false },
  { type: 'boolean' as const, key: 'checked', label: 'checked', default: true },
]

function generateCode(v: ControlValues): string {
  const parts: string[] = []
  parts.push(`label="${v.label}"`)
  if (v.description) parts.push(`description="${v.description}"`)
  if (v.disabled) parts.push('disabled')
  if (v.checked) parts.push('defaultChecked')
  const attrs = parts.length ? ' ' + parts.join(' ') : ''
  return `<Checkbox${attrs} />`
}

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
    >
      <DocSection title="Interactive Playground">
        <p className="text-ds-comment text-[13px] leading-relaxed mb-4">
          Tweak props on the right and see the result live. The generated code updates instantly.
        </p>
        <PlaygroundBlock
          controls={PLAYGROUND_CONTROLS}
          render={(v) => (
            <Checkbox
              label={v.label as string}
              description={v.description as string}
              disabled={v.disabled as boolean}
              defaultChecked={v.checked as boolean}
            />
          )}
          generateCode={generateCode}
          filename="Checkbox.tsx"
        />
      </DocSection>
    </ComponentBlock>
  )
}