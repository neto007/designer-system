import { useState } from 'react'
import { Autosuggest } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Autosuggest } from '@shieldai/ds'

const AGENTS = [
  'ml-training-agent', 'threat-scanner', 'log-analyzer',
  'network-monitor', 'data-pipeline', 'auth-guard',
]

// Uncontrolled — internal state
<Autosuggest
  options={AGENTS}
  placeholder="Search agents…"
  onSelect={(value) => console.log('selected', value)}
/>

// Controlled
const [query, setQuery] = useState('')

<Autosuggest
  value={query}
  onChange={setQuery}
  onSelect={setQuery}
  options={AGENTS}
  maxSuggestions={4}
  debounceMs={200}
/>`

const PROPS = [
  { name: 'options', type: 'string[]', default: '[]', description: 'Full list of suggestions to filter against' },
  { name: 'value', type: 'string', default: '—', description: 'Controlled input value' },
  { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Called on every keystroke when controlled' },
  { name: 'onSelect', type: '(value: string) => void', default: '—', description: 'Called when a suggestion is confirmed (click or Enter)' },
  { name: 'placeholder', type: 'string', default: '"Search…"', description: 'Input placeholder text' },
  { name: 'debounceMs', type: 'number', default: '300', description: 'Milliseconds to debounce filtering after keystroke' },
  { name: 'maxSuggestions', type: 'number', default: '6', description: 'Maximum rows shown in the dropdown' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables input and dropdown' },
]

const AGENT_OPTIONS = [
  'ml-training-agent', 'threat-scanner', 'log-analyzer',
  'network-monitor', 'data-pipeline', 'auth-guard',
  'backup-controller', 'metrics-collector', 'alert-dispatcher',
  'policy-enforcer', 'secret-rotator', 'canary-deployer',
]

const COUNTRY_OPTIONS = [
  'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil',
  'Canada', 'Chile', 'China', 'Colombia', 'Denmark',
  'Finland', 'France', 'Germany', 'India', 'Ireland',
]

function LiveDemo() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase text-ds-comment">agent search — type "a", "m", or "s"</div>
        <Autosuggest
          options={AGENT_OPTIONS}
          placeholder="Search agents…"
          onSelect={(v) => setSelected(v)}
          className="max-w-sm"
        />
        {selected && (
          <div className="text-xs text-ds-green">Selected: {selected}</div>
        )}
      </div>

      <PreviewRow label="country search — 4 max">
        <Autosuggest
          options={COUNTRY_OPTIONS}
          placeholder="Search countries…"
          maxSuggestions={4}
          debounceMs={150}
          className="w-48"
        />
      </PreviewRow>

      <PreviewRow label="disabled">
        <Autosuggest
          options={AGENT_OPTIONS}
          placeholder="Disabled"
          disabled
          className="w-48"
        />
      </PreviewRow>
    </div>
  )
}

export default function AutosuggestPage() {
  return (
    <ComponentBlock
      num="02.P8"
      title="Autosuggest"
      tag="debounced · keyboard nav · controlled · ARIA"
      description="Free-text input with a filtered suggestion dropdown. Supports keyboard navigation (↑↓ Enter Escape), debounced filtering, and both controlled and uncontrolled usage. Implements combobox ARIA pattern."
      preview={<LiveDemo />}
      code={CODE}
      filename="Autosuggest.tsx"
      props={PROPS}
    />
  )
}
