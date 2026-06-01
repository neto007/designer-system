import { RadioGroup } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { RadioGroup } from '@shieldai/ds'

// Vertical (default)
<RadioGroup
  defaultValue="llm"
  items={[
    { value: 'llm',        label: 'LLM Agent',      description: 'Direct model calls' },
    { value: 'sequential', label: 'Sequential',      description: 'Ordered chain of agents' },
    { value: 'parallel',   label: 'Parallel',        description: 'Concurrent execution' },
  ]}
/>

// Horizontal
<RadioGroup
  orientation="horizontal"
  defaultValue="sm"
  items={[
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ]}
/>`

const PROPS = [
  { name: 'items', type: 'RadioItem[]', required: true, description: 'Array of radio options' },
  { name: 'value', type: 'string', description: 'Controlled selected value' },
  { name: 'defaultValue', type: 'string', description: 'Initial selected value (uncontrolled)' },
  { name: 'onValueChange', type: '(value: string) => void', description: 'Called when selection changes' },
  { name: 'orientation', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Layout direction' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all items' },
]

const AGENT_ITEMS = [
  { value: 'llm',        label: 'LLM Agent',    description: 'Direct model call with tool use' },
  { value: 'sequential', label: 'Sequential',   description: 'Ordered chain of agent calls' },
  { value: 'parallel',   label: 'Parallel',     description: 'Concurrent execution, merged results' },
  { value: 'loop',       label: 'Loop',         description: 'Repeats until condition is met' },
]

const SIZE_ITEMS = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
]

export default function RadioGroupPage() {
  return (
    <ComponentBlock
      num="02.20"
      title="Radio Group"
      tag="Radix UI · vertical · horizontal"
      description="Accessible radio group built on Radix RadioGroup. Purple dot indicator when selected. Supports vertical and horizontal layouts."
      preview={
        <div className="space-y-6 w-full">
          <PreviewRow label="vertical · with descriptions">
            <RadioGroup defaultValue="llm" items={AGENT_ITEMS} />
          </PreviewRow>
          <PreviewRow label="horizontal">
            <RadioGroup defaultValue="md" orientation="horizontal" items={SIZE_ITEMS} />
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="RadioGroup.tsx"
      props={PROPS}
    />
  )
}
