import { useState } from 'react'
import { RadioGroup } from '@shieldai/ds'
import { ComponentBlock, DocSection, PreviewRow, PlaygroundBlock } from '../../components/docs'
import type { ControlValues } from '../../components/docs'

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

const PLAYGROUND_CONTROLS = [
  { type: 'select' as const, key: 'orientation', label: 'orientation', default: 'vertical', options: ['vertical', 'horizontal'] },
  { type: 'boolean' as const, key: 'disabled', label: 'disabled', default: false },
]

function generateCode(v: ControlValues): string {
  const parts: string[] = []
  if (v.orientation !== 'vertical') parts.push(`orientation="${v.orientation}"`)
  if (v.disabled) parts.push('disabled')
  const attrs = parts.length ? ' ' + parts.join(' ') : ''
  return `<RadioGroup${attrs} />`
}

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
    >
      <DocSection title="Interactive Playground">
        <p className="text-ds-comment text-[13px] leading-relaxed mb-4">
          Tweak props on the right and see the result live. The generated code updates instantly.
        </p>
        <PlaygroundBlock
          controls={PLAYGROUND_CONTROLS}
          render={(v) => {
            const [val, setVal] = useState('option1')
            const items = [
              { value: 'option1', label: 'Option One', description: 'The first option' },
              { value: 'option2', label: 'Option Two', description: 'The second option' },
              { value: 'option3', label: 'Option Three', description: 'The third option' },
            ]
            return (
              <RadioGroup
                items={items}
                value={val}
                onValueChange={setVal}
                orientation={v.orientation as 'vertical' | 'horizontal'}
                disabled={v.disabled as boolean}
              />
            )
          }}
          generateCode={generateCode}
          filename="RadioGroup.tsx"
        />
      </DocSection>
    </ComponentBlock>
  )
}
