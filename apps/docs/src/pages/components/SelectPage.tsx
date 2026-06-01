import { Select } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

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
    />
  )
}
