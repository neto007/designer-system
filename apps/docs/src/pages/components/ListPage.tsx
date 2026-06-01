import { useState } from 'react'
import { List } from '@shieldai/ds'
import { Bot, Shield, Network, Zap, BarChart2, Lock } from 'lucide-react'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { List } from '@shieldai/ds'

// Single select
const [selected, setSelected] = useState('llm')

<List
  items={[
    { value: 'llm',     label: 'LLM Agent',    description: 'Language model node', icon: <Bot /> },
    { value: 'scanner', label: 'Threat Scanner', icon: <Shield />, meta: 'live' },
    { value: 'monitor', label: 'Network Monitor', disabled: true },
  ]}
  selected={selected}
  onSelect={setSelected}
/>

// Multi-select
<List
  items={items}
  selected={['llm', 'scanner']}
  onSelect={toggle}
  multiSelect
  variant="divided"
/>`

const PROPS = [
  { name: 'items', type: 'ListItem[]', default: '—', description: 'Array of { value, label, description?, icon?, meta?, disabled? }' },
  { name: 'selected', type: 'string | string[]', default: '—', description: 'Selected value(s) — pass an array for multiSelect' },
  { name: 'onSelect', type: '(value: string) => void', default: '—', description: 'Called with the clicked item value' },
  { name: 'multiSelect', type: 'boolean', default: 'false', description: 'Allows multiple simultaneous selections' },
  { name: 'variant', type: '"default" | "compact" | "divided"', default: '"default"', description: 'Layout density — compact uses less vertical padding, divided adds separators' },
  { name: 'emptyState', type: 'ReactNode', default: '"No items"', description: 'Shown when items array is empty' },
]

const AGENTS = [
  { value: 'llm',     label: 'GPT-4o Router',    description: 'Language model reasoning', icon: <Bot className="h-4 w-4" />, meta: 'live' },
  { value: 'scanner', label: 'Threat Scanner',   description: 'CVE and SAST analysis',    icon: <Shield className="h-4 w-4" />, meta: 'live' },
  { value: 'monitor', label: 'Network Monitor',  description: 'Traffic anomaly detection', icon: <Network className="h-4 w-4" />, meta: 'idle' },
  { value: 'pipeline',label: 'Data Pipeline',    description: 'ETL workflow runner',       icon: <Zap className="h-4 w-4" />, meta: 'idle' },
  { value: 'metrics', label: 'Metrics Collector',description: 'Prometheus exporter',      icon: <BarChart2 className="h-4 w-4" /> },
  { value: 'auth',    label: 'Auth Guard',        description: 'Token validation layer',   icon: <Lock className="h-4 w-4" />, disabled: true },
]

function LiveDemo() {
  const [single, setSingle] = useState('llm')
  const [multi, setMulti] = useState<string[]>(['llm', 'scanner'])

  const toggleMulti = (value: string) => {
    setMulti((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
      <div>
        <div className="text-[10px] font-mono uppercase text-ds-comment mb-2">single select</div>
        <div className="border border-ds-current rounded-ds-md p-2 bg-ds-bg">
          <List items={AGENTS} selected={single} onSelect={setSingle} />
        </div>
        <p className="mt-1 text-xs text-ds-comment">Selected: <span className="text-ds-purple font-mono">{single}</span></p>
      </div>

      <div>
        <div className="text-[10px] font-mono uppercase text-ds-comment mb-2">multi select</div>
        <div className="border border-ds-current rounded-ds-md p-2 bg-ds-bg">
          <List items={AGENTS} selected={multi} onSelect={toggleMulti} multiSelect />
        </div>
        <p className="mt-1 text-xs text-ds-comment">{multi.length} selected</p>
      </div>

      <div>
        <div className="text-[10px] font-mono uppercase text-ds-comment mb-2">compact + divided</div>
        <div className="border border-ds-current rounded-ds-md overflow-hidden bg-ds-bg">
          <List
            items={AGENTS.slice(0, 4)}
            selected={single}
            onSelect={setSingle}
            variant="divided"
          />
        </div>
      </div>
    </div>
  )
}

export default function ListPage() {
  return (
    <ComponentBlock
      num="02.LS"
      title="List"
      tag="single · multi-select · divided · disabled"
      description="Vertical row collection with single or multi-select. Supports icons, meta text, disabled items, and three layout variants. Uses listbox ARIA role."
      preview={<LiveDemo />}
      code={CODE}
      filename="List.tsx"
      props={PROPS}
    />
  )
}
