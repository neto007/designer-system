import { useState } from 'react'
import { Cards, ItemCard, ActionCard, Button, StatusIndicator } from '@shieldai/ds'
import { Bot, Cpu, Database, Zap, BarChart2, GitBranch, Plus } from 'lucide-react'
import { ComponentBlock, DocSection, PreviewRow } from '../../components/docs'

const CODE_ITEM = `import { Cards, ItemCard, Badge, Button } from '@shieldai/ds'

<Cards
  items={agents}
  columns={3}
  renderItem={(agent) => (
    <ItemCard
      title={agent.name}
      description={agent.description}
      badge={<Badge>{agent.type}</Badge>}
      meta={[
        { label: 'Tasks', value: agent.tasks },
        { label: 'Uptime', value: agent.uptime },
      ]}
      actions={
        <Button size="sm" variant="outline">Configure</Button>
      }
      selectable
      selected={selected.includes(agent.id)}
      onSelect={() => toggleSelect(agent.id)}
    />
  )}
/>`

const CODE_ACTION = `import { ActionCard } from '@shieldai/ds'
import { Bot, Cpu } from 'lucide-react'

<ActionCard
  title="Deploy New Agent"
  description="Spin up a new agent with custom configuration."
  icon={<Bot className="h-5 w-5" />}
  color="purple"
  cta={<Button size="sm">Deploy →</Button>}
  onClick={() => router.push('/agents/new')}
/>`

const PROPS_ITEM = [
  { name: 'title', type: 'ReactNode', default: '—', description: 'Card heading' },
  { name: 'description', type: 'ReactNode', default: '—', description: 'Supporting text below title' },
  { name: 'media', type: 'ReactNode', default: '—', description: 'Image or visual at the top of the card' },
  { name: 'meta', type: '{ label: string; value: ReactNode }[]', default: '—', description: 'Key-value grid at the card footer' },
  { name: 'badge', type: 'ReactNode', default: '—', description: 'Slot in top-right corner' },
  { name: 'actions', type: 'ReactNode', default: '—', description: 'Buttons shown in the card footer bar' },
  { name: 'selectable', type: 'boolean', default: 'false', description: 'Shows checkbox for multi-select' },
  { name: 'selected', type: 'boolean', default: 'false', description: 'Controlled selection state' },
  { name: 'onSelect', type: '(selected: boolean) => void', default: '—', description: 'Fires when checkbox toggled' },
  { name: 'onClick', type: '() => void', default: '—', description: 'Makes the card clickable' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Replaces content with skeleton' },
]

interface AgentCard { id: string; name: string; type: string; tasks: number; uptime: string; status: 'success' | 'running' | 'warning' }

const AGENTS: AgentCard[] = [
  { id: '1', name: 'Orchestrator Prime', type: 'Orchestrator', tasks: 142, uptime: '99.9%', status: 'success' },
  { id: '2', name: 'CodeGen Alpha',      type: 'Coder',        tasks: 87,  uptime: '98.2%', status: 'running' },
  { id: '3', name: 'Data Wrangler',      type: 'Executor',     tasks: 203, uptime: '99.5%', status: 'success' },
  { id: '4', name: 'Retrieval Bot',      type: 'Retriever',    tasks: 56,  uptime: '94.1%', status: 'warning' },
  { id: '5', name: 'DocBot 3000',        type: 'Researcher',   tasks: 12,  uptime: '87.3%', status: 'warning' },
  { id: '6', name: 'Safety Guard',       type: 'Evaluator',    tasks: 341, uptime: '100%',  status: 'success' },
]

function ItemCardDemo() {
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (id: string) =>
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])

  return (
    <div className="w-full space-y-2">
      {selected.length > 0 && (
        <p className="text-xs text-ds-comment font-mono">{selected.length} selected</p>
      )}
      <Cards
        items={AGENTS}
        columns={3}
        renderItem={(agent) => (
          <ItemCard
            key={agent.id}
            title={agent.name}
            description={`${agent.type} · ${agent.tasks} tasks executed`}
            badge={<StatusIndicator status={agent.status} />}
            meta={[
              { label: 'Tasks', value: <span className="font-mono text-ds-cyan">{agent.tasks}</span> },
              { label: 'Uptime', value: <span className="font-mono text-ds-green">{agent.uptime}</span> },
            ]}
            actions={<Button size="sm" variant="outline">Configure</Button>}
            selectable
            selected={selected.includes(agent.id)}
            onSelect={() => toggle(agent.id)}
          />
        )}
      />
    </div>
  )
}

export default function CardsPage() {
  return (
    <ComponentBlock
      num="03.02"
      title="Cards"
      tag="ItemCard · ActionCard · collection · selectable"
      description="Two card types: ItemCard for data records (with media, meta, selection) and ActionCard for CTA surfaces. The Cards container handles responsive grid, loading skeletons, and empty state."
      preview={<ItemCardDemo />}
      code={CODE_ITEM}
      props={PROPS_ITEM}
    >
      <DocSection title="ActionCard">
        <PreviewRow label="5 color variants">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            {([
              { color: 'purple' as const, icon: <Bot className="h-5 w-5" />,      title: 'Deploy Agent',    desc: 'Launch a new AI agent' },
              { color: 'green'  as const, icon: <Cpu className="h-5 w-5" />,      title: 'Scale Cluster',   desc: 'Add capacity to your fleet' },
              { color: 'cyan'   as const, icon: <Database className="h-5 w-5" />, title: 'Connect Storage', desc: 'Link a data source' },
              { color: 'orange' as const, icon: <Zap className="h-5 w-5" />,      title: 'Run Workflow',    desc: 'Execute a multi-agent pipeline' },
              { color: 'red'    as const, icon: <BarChart2 className="h-5 w-5" />,title: 'View Metrics',    desc: 'Inspect agent telemetry' },
              { color: 'purple' as const, icon: <GitBranch className="h-5 w-5" />,title: 'Fork Template',   desc: 'Start from a proven pattern' },
            ]).map((c) => (
              <ActionCard
                key={c.title}
                title={c.title}
                description={c.desc}
                icon={c.icon}
                color={c.color}
                cta={<Button size="sm" variant="ghost" rightIcon={<Plus className="h-3.5 w-3.5" />}>Add</Button>}
              />
            ))}
          </div>
        </PreviewRow>
        <div className="mt-3 font-mono text-xs text-ds-comment whitespace-pre">{CODE_ACTION}</div>
      </DocSection>

      <DocSection title="Loading state">
        <Cards items={[]} columns={3} loading loadingCount={3} renderItem={() => null} />
      </DocSection>

      <DocSection title="Empty state">
        <Cards
          items={[]}
          columns={3}
          renderItem={() => null}
          empty={
            <div className="space-y-2">
              <p>No agents deployed yet.</p>
              <Button size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Deploy your first agent</Button>
            </div>
          }
        />
      </DocSection>
    </ComponentBlock>
  )
}
