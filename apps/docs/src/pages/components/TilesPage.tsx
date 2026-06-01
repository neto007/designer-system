import { useState } from 'react'
import { Tiles } from '@shieldai/ds'
import { Cpu, GitBranch, RefreshCw, Workflow, Code, ExternalLink, BookOpenCheck } from 'lucide-react'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { Tiles } from '@shieldai/ds'

const AGENT_TYPES = [
  { value: 'llm',        label: 'LLM',        description: 'Language model node',    icon: <Code /> },
  { value: 'parallel',   label: 'Parallel',   description: 'Concurrent branches',    icon: <GitBranch /> },
  { value: 'sequential', label: 'Sequential', description: 'Step-by-step execution', icon: <ArrowRight /> },
]

const [selected, setSelected] = useState('llm')

<Tiles
  items={AGENT_TYPES}
  value={selected}
  onChange={setSelected}
  columns={3}
/>`

const PROPS = [
  { name: 'items', type: 'TileItem[]', default: '—', description: 'Array of { value, label, description?, icon?, disabled? }' },
  { name: 'value', type: 'string', default: '—', description: 'Controlled selected value' },
  { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Called when a tile is clicked' },
  { name: 'columns', type: '2 | 3 | 4', default: '3', description: 'Grid column count — collapses to 2 on sm breakpoint' },
  { name: 'className', type: 'string', default: '—', description: 'Additional classes on the grid container' },
]

const AGENT_TILES = [
  { value: 'llm',        label: 'LLM',        description: 'Language model reasoning',  icon: <Code className="h-5 w-5" /> },
  { value: 'a2a',        label: 'A2A',         description: 'Agent-to-agent call',       icon: <ExternalLink className="h-5 w-5" /> },
  { value: 'sequential', label: 'Sequential',  description: 'Step-by-step execution',   icon: <Cpu className="h-5 w-5" /> },
  { value: 'parallel',   label: 'Parallel',    description: 'Concurrent branches',      icon: <GitBranch className="h-5 w-5" /> },
  { value: 'loop',       label: 'Loop',        description: 'Iterative retry loop',      icon: <RefreshCw className="h-5 w-5" /> },
  { value: 'workflow',   label: 'Workflow',    description: 'Orchestrated pipeline',    icon: <Workflow className="h-5 w-5" /> },
  { value: 'task',       label: 'Task',        description: 'Discrete unit of work',    icon: <BookOpenCheck className="h-5 w-5" />, disabled: false },
]

const PLAN_TILES = [
  { value: 'free',    label: 'Free',       description: 'Up to 5 agents · 1 workspace' },
  { value: 'pro',     label: 'Pro',        description: 'Unlimited agents · 10 workspaces' },
  { value: 'team',    label: 'Team',       description: 'RBAC · SSO · audit logs', disabled: true },
]

function LiveDemo() {
  const [agentType, setAgentType] = useState('llm')
  const [plan, setPlan] = useState('pro')

  return (
    <div className="space-y-8 w-full">
      <div>
        <div className="text-[10px] font-mono uppercase text-ds-comment mb-3">agent type picker (3 cols)</div>
        <Tiles items={AGENT_TILES} value={agentType} onChange={setAgentType} columns={3} />
        <p className="mt-2 text-xs text-ds-comment">Selected: <span className="text-ds-purple font-mono">{agentType}</span></p>
      </div>

      <div>
        <div className="text-[10px] font-mono uppercase text-ds-comment mb-3">plan picker (2 cols) — one disabled</div>
        <Tiles items={PLAN_TILES} value={plan} onChange={setPlan} columns={2} />
      </div>
    </div>
  )
}

export default function TilesPage() {
  return (
    <ComponentBlock
      num="02.TL"
      title="Tiles"
      tag="radio group · icon · description · disabled"
      description="Large radio card grid for picking one option from a visual set. Each tile shows an icon, label, and optional description. Uses role=radiogroup and aria-checked for accessibility. Ideal for agent type selection, plan pickers, and configuration wizards."
      preview={<LiveDemo />}
      code={CODE}
      filename="Tiles.tsx"
      props={PROPS}
    />
  )
}
