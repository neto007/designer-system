import { Toggle } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Toggle } from '@shieldai/ds'

// Basic
<Toggle label="Enable feature" />

// With description
<Toggle
  label="Streaming mode"
  description="Stream tokens as they arrive from the model."
  defaultChecked
/>

// Sizes
<Toggle size="sm" label="Small" />
<Toggle size="md" label="Medium" />

// Disabled
<Toggle label="Read-only" disabled />

// Controlled
const [on, setOn] = useState(false)
<Toggle
  label="Live updates"
  checked={on}
  onCheckedChange={setOn}
/>`

const PROPS = [
  { name: 'label', type: 'string', description: 'Label text' },
  { name: 'description', type: 'string', description: 'Secondary text below the label' },
  { name: 'checked', type: 'boolean', description: 'Controlled on/off state' },
  { name: 'defaultChecked', type: 'boolean', description: 'Initial state (uncontrolled)' },
  { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Called on state change' },
  { name: 'size', type: '"sm" | "md"', default: '"md"', description: 'Toggle size' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the toggle' },
]

export default function TogglePage() {
  return (
    <ComponentBlock
      num="02.21"
      title="Toggle"
      tag="Radix Switch · 2 sizes · purple glow"
      description="On/off switch built on Radix Switch. Purple track glow when enabled. Supports label and description slots."
      preview={
        <div className="space-y-4 w-full">
          <PreviewRow label="basic">
            <Toggle label="Disabled feature" />
            <Toggle label="Enabled feature" defaultChecked />
          </PreviewRow>
          <PreviewRow label="with description">
            <Toggle
              label="Streaming mode"
              description="Stream tokens as they arrive from the model."
              defaultChecked
            />
          </PreviewRow>
          <PreviewRow label="sizes">
            <Toggle size="sm" label="Small" defaultChecked />
            <Toggle size="md" label="Medium" defaultChecked />
          </PreviewRow>
          <PreviewRow label="disabled">
            <Toggle label="Read-only on" disabled defaultChecked />
            <Toggle label="Read-only off" disabled />
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="Toggle.tsx"
      props={PROPS}
    />
  )
}
