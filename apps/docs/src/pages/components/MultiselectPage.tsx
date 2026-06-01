import { useState } from 'react'
import { Multiselect } from '@shieldai/ds'
import type { MultiselectOption } from '@shieldai/ds'
import { ComponentBlock, DocSection, PreviewRow } from '../../components/docs'

const AGENT_TYPES: MultiselectOption[] = [
  { value: 'orchestrator', label: 'Orchestrator', description: 'Coordinates multi-agent flows' },
  { value: 'coder',        label: 'Coder',        description: 'Generates and reviews code' },
  { value: 'executor',     label: 'Executor',     description: 'Runs tool calls and scripts' },
  { value: 'retriever',    label: 'Retriever',    description: 'Fetches documents and context' },
  { value: 'researcher',   label: 'Researcher',   description: 'Queries knowledge sources' },
  { value: 'evaluator',    label: 'Evaluator',    description: 'Scores and validates outputs' },
  { value: 'communicator', label: 'Communicator', description: 'Formats and delivers results' },
]

const REGIONS: MultiselectOption[] = [
  { value: 'us-east-1', label: 'US East (N. Virginia)' },
  { value: 'us-west-2', label: 'US West (Oregon)' },
  { value: 'eu-west-1', label: 'Europe (Ireland)' },
  { value: 'eu-central-1', label: 'Europe (Frankfurt)' },
  { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
  { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)' },
]

const CODE = `import { Multiselect } from '@shieldai/ds'
import type { MultiselectOption } from '@shieldai/ds'

const options: MultiselectOption[] = [
  { value: 'orchestrator', label: 'Orchestrator', description: 'Coordinates multi-agent flows' },
  { value: 'coder',        label: 'Coder' },
  { value: 'executor',     label: 'Executor' },
]

const [selected, setSelected] = useState<string[]>([])

<Multiselect
  options={options}
  value={selected}
  onChange={setSelected}
  label="Agent types"
  placeholder="Select agent types…"
/>

// With max tokens
<Multiselect options={options} value={selected} onChange={setSelected} maxTokens={3} />

// With error
<Multiselect options={options} error="At least one agent type required" />`

const PROPS = [
  { name: 'options', type: 'MultiselectOption[]', default: '—', description: 'Available options to pick from' },
  { name: 'value', type: 'string[]', default: '—', description: 'Controlled selected values' },
  { name: 'onChange', type: '(values: string[]) => void', default: '—', description: 'Fires when selection changes' },
  { name: 'placeholder', type: 'string', default: '"Select options…"', description: 'Text shown when nothing is selected' },
  { name: 'searchPlaceholder', type: 'string', default: '"Search…"', description: 'Placeholder inside the search input' },
  { name: 'label', type: 'string', default: '—', description: 'Field label above the trigger' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction' },
  { name: 'error', type: 'string', default: '—', description: 'Error message shown below the trigger' },
  { name: 'maxTokens', type: 'number', default: '—', description: 'Maximum number of selectable items' },
  { name: 'filterType', type: '"includes" | "startsWith"', default: '"includes"', description: 'Search filter strategy' },
]

function Demo() {
  const [types, setTypes] = useState<string[]>(['orchestrator'])
  const [regions, setRegions] = useState<string[]>([])
  return (
    <div className="space-y-4 w-full max-w-sm">
      <Multiselect
        options={AGENT_TYPES}
        value={types}
        onChange={setTypes}
        label="Agent types"
        placeholder="Select agent types…"
      />
      <Multiselect
        options={REGIONS}
        value={regions}
        onChange={setRegions}
        label="Deploy regions"
        placeholder="Select regions…"
        maxTokens={3}
      />
    </div>
  )
}

export default function MultiselectPage() {
  return (
    <ComponentBlock
      num="02.18"
      title="Multiselect"
      tag="tokens · search · maxTokens"
      description="Pick multiple values from a finite list. Selected items appear as dismissible tokens in the trigger. Includes fuzzy search, max selection cap, and keyboard navigation."
      preview={<Demo />}
      code={CODE}
      props={PROPS}
    >
      <DocSection title="States">
        <PreviewRow label="error">
          <div className="w-full max-w-xs">
            <Multiselect
              options={AGENT_TYPES}
              value={[]}
              onChange={() => {}}
              label="Agent types"
              error="At least one agent type is required"
            />
          </div>
        </PreviewRow>
        <PreviewRow label="disabled">
          <div className="w-full max-w-xs">
            <Multiselect
              options={AGENT_TYPES}
              value={['orchestrator', 'coder']}
              onChange={() => {}}
              disabled
            />
          </div>
        </PreviewRow>
      </DocSection>
    </ComponentBlock>
  )
}
