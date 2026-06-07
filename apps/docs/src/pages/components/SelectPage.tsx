import { Select } from '@shieldai/ds'
import { ComponentBlock, DocSection, PlaygroundBlock } from '../../components/docs'
import type { ControlValues } from '../../components/docs'

const CODE = `import { Select } from '@shieldai/ds'

<Select
  placeholder="Choose agent type..."
  items={[
    { value: 'llm',        label: 'LLM Agent' },
    { value: 'a2a',        label: 'Agent-to-Agent' },
    { value: 'sequential', label: 'Sequential' },
    { value: 'parallel',   label: 'Parallel' },
    { value: 'loop',       label: 'Loop' },
  ]}
/>

// With groups
<Select
  placeholder="Select model..."
  groups={[
    {
      label: 'Anthropic',
      items: [
        { value: 'claude-3-5', label: 'Claude 3.5 Sonnet' },
        { value: 'claude-3',   label: 'Claude 3 Haiku' },
      ],
    },
    {
      label: 'OpenAI',
      items: [
        { value: 'gpt-4o',  label: 'GPT-4o' },
        { value: 'gpt-4',   label: 'GPT-4' },
      ],
    },
  ]}
/>`

const PROPS = [
  { name: 'items', type: '{ value: string; label: string; disabled?: boolean }[]', description: 'Flat list of options' },
  { name: 'groups', type: '{ label: string; items: SelectItem[] }[]', description: 'Grouped options (mutually exclusive with items)' },
  { name: 'placeholder', type: 'string', description: 'Placeholder shown when no value selected' },
  { name: 'value', type: 'string', description: 'Controlled selected value' },
  { name: 'onValueChange', type: '(value: string) => void', description: 'Called when selection changes' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select' },
]

const AGENT_ITEMS = [
  { value: 'llm', label: 'LLM Agent' },
  { value: 'a2a', label: 'Agent-to-Agent' },
  { value: 'sequential', label: 'Sequential' },
  { value: 'parallel', label: 'Parallel' },
  { value: 'loop', label: 'Loop' },
]

const PLAYGROUND_ITEMS = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

const PLAYGROUND_CONTROLS = [
  { type: 'text' as const, key: 'placeholder', label: 'placeholder', default: 'Select an option' },
  { type: 'boolean' as const, key: 'disabled', label: 'disabled', default: false },
]

function generateCode(v: ControlValues): string {
  const parts: string[] = []
  if (v.placeholder !== 'Select an option') parts.push(`placeholder="${v.placeholder}"`)
  if (v.disabled) parts.push('disabled')
  const attrs = parts.length ? ' ' + parts.join(' ') : ''
  return `<Select${attrs} />`
}

export default function SelectPage() {
  return (
    <ComponentBlock
      num="02.07"
      title="Select"
      tag="Radix UI · grouped items · animated"
      description="Accessible dropdown built on Radix Select. Supports flat item lists and labeled groups with a custom scrollable viewport and checkmark indicator."
      preview={
        <div className="flex flex-col gap-4 max-w-xs w-full">
          <Select placeholder="Choose agent type..." items={AGENT_ITEMS} />
          <Select
            placeholder="Select model..."
            groups={[
              {
                label: 'Anthropic',
                items: [
                  { value: 'claude-3-5', label: 'Claude 3.5 Sonnet' },
                  { value: 'claude-3', label: 'Claude 3 Haiku' },
                ],
              },
              {
                label: 'OpenAI',
                items: [
                  { value: 'gpt-4o', label: 'GPT-4o' },
                  { value: 'gpt-4', label: 'GPT-4' },
                ],
              },
            ]}
          />
        </div>
      }
      code={CODE}
      filename="Select.tsx"
      props={PROPS}
    >
      <DocSection title="Interactive Playground">
        <p className="text-ds-comment text-[13px] leading-relaxed mb-4">
          Tweak props on the right and see the result live. The generated code updates instantly.
        </p>
        <PlaygroundBlock
          controls={PLAYGROUND_CONTROLS}
          render={(v) => (
            <div className="w-full max-w-xs">
              <Select
                placeholder={v.placeholder as string}
                disabled={v.disabled as boolean}
                items={PLAYGROUND_ITEMS}
              />
            </div>
          )}
          generateCode={generateCode}
          filename="Select.tsx"
        />
      </DocSection>
    </ComponentBlock>
  )
}
