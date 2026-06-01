import { useState } from 'react'
import { AGENT_TYPES, NeuCard, Badge, StatusIndicator, Button, KeyValuePairs, Divider } from '@shieldai/ds'
import type { AgentType } from '@shieldai/ds'
import { Settings, Play, Square, MoreHorizontal } from 'lucide-react'
import { DocSection } from '../../components/docs'

// ─── Agent Card component (pattern, not in core) ──────────────────────────────

interface AgentCardData {
  id: string
  name: string
  type: AgentType
  status: 'success' | 'running' | 'warning' | 'error' | 'disabled'
  description: string
  tasks: number
  uptime: string
  lastRun: string
  model: string
}

function AgentCard({ agent, compact = false }: { agent: AgentCardData; compact?: boolean }) {
  const cfg = AGENT_TYPES[agent.type]
  const Icon = cfg.icon

  return (
    <NeuCard className={`border-2 ${cfg.borderColor} ${cfg.shadowClass} overflow-hidden`}>
      {/* Header */}
      <div className="flex items-start gap-3 p-4 pb-3">
        <div className={`flex-shrink-0 w-9 h-9 rounded-ds-md border-2 ${cfg.borderColor} flex items-center justify-center bg-ds-bg`}>
          <Icon className={`h-4 w-4 ${cfg.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-ds-fg text-sm truncate">{agent.name}</span>
            <Badge variant="muted" className={`text-[9px] font-mono ${cfg.color} border-current`}>{agent.type}</Badge>
          </div>
          <p className="text-xs text-ds-comment mt-0.5 line-clamp-2">{agent.description}</p>
        </div>
        <div className="flex-shrink-0">
          <StatusIndicator status={agent.status} />
        </div>
      </div>

      {!compact && (
        <>
          <Divider />

          {/* Stats */}
          <div className="px-4 py-3">
            <KeyValuePairs
              items={[
                { key: 'Tasks',    value: <span className="font-mono text-ds-cyan">{agent.tasks}</span> },
                { key: 'Uptime',   value: <span className="font-mono text-ds-green">{agent.uptime}</span> },
                { key: 'Last run', value: <span className="text-ds-comment">{agent.lastRun}</span> },
                { key: 'Model',    value: <code className="text-[11px] text-ds-orange">{agent.model}</code> },
              ]}
              columns={2}
            />
          </div>

          <Divider />

          {/* Actions */}
          <div className="flex items-center gap-2 px-4 py-3">
            <Button
              size="sm"
              variant={agent.status === 'running' ? 'destructive' : 'default'}
              leftIcon={agent.status === 'running' ? <Square className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            >
              {agent.status === 'running' ? 'Stop' : 'Run'}
            </Button>
            <Button size="sm" variant="outline" leftIcon={<Settings className="h-3.5 w-3.5" />}>Configure</Button>
            <Button size="icon" variant="ghost" aria-label="More actions" className="ml-auto">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </NeuCard>
  )
}

const AGENTS: AgentCardData[] = [
  {
    id: '1', name: 'Orchestrator Prime', type: 'workflow', status: 'running',
    description: 'Routes tasks across the agent fleet based on capability matching and load.',
    tasks: 142, uptime: '99.9%', lastRun: '2 min ago', model: 'claude-opus-4-7',
  },
  {
    id: '2', name: 'CodeGen Alpha', type: 'llm', status: 'success',
    description: 'Generates, reviews, and refactors code using structured prompting.',
    tasks: 87, uptime: '98.2%', lastRun: '5 min ago', model: 'claude-sonnet-4-6',
  },
  {
    id: '3', name: 'Data Pipeline', type: 'sequential', status: 'success',
    description: 'Executes data transformation steps in strict sequence with validation.',
    tasks: 203, uptime: '99.5%', lastRun: '1 min ago', model: 'claude-haiku-4-5',
  },
  {
    id: '4', name: 'Fan-out Executor', type: 'parallel', status: 'warning',
    description: 'Dispatches subtasks concurrently and aggregates results.',
    tasks: 56, uptime: '94.1%', lastRun: '12 min ago', model: 'claude-sonnet-4-6',
  },
]

const CODE = `import { AGENT_TYPES, NeuCard, Badge, StatusIndicator, Button, KeyValuePairs } from '@shieldai/ds'
import type { AgentType } from '@shieldai/ds'

function AgentCard({ agent }: { agent: Agent }) {
  const cfg = AGENT_TYPES[agent.type]
  const Icon = cfg.icon

  return (
    <NeuCard className={\`border-2 \${cfg.borderColor} \${cfg.shadowClass}\`}>
      <div className="flex items-start gap-3 p-4">
        <div className={\`w-9 h-9 rounded-ds-md border-2 \${cfg.borderColor} flex items-center justify-center bg-ds-bg\`}>
          <Icon className={\`h-4 w-4 \${cfg.color}\`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">{agent.name}</span>
            <Badge variant="outline" className={\`\${cfg.color}\`}>{agent.type}</Badge>
          </div>
          <p className="text-xs text-ds-comment">{agent.description}</p>
        </div>
        <StatusIndicator status={agent.status} />
      </div>
      {/* stats + actions … */}
    </NeuCard>
  )
}`

export default function AgentCardPage() {
  const [compact, setCompact] = useState(false)

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">04.03</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Agent Card</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Anatomy of a full agent card — type-coded border + shadow, status dot, stats grid, and action bar. Built from NeuCard, Badge, StatusIndicator, KeyValuePairs, and Button.
        </p>
      </div>

      <DocSection title="Full agent cards">
        <div className="flex items-center gap-3 mb-4">
          <Button
            size="sm"
            variant={compact ? 'outline' : 'default'}
            onClick={() => setCompact(false)}
          >Full</Button>
          <Button
            size="sm"
            variant={compact ? 'default' : 'outline'}
            onClick={() => setCompact(true)}
          >Compact</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {AGENTS.map((agent) => (
            <AgentCard key={agent.id} agent={agent} compact={compact} />
          ))}
        </div>
      </DocSection>

      <DocSection title="Anatomy">
        <div className="space-y-3 text-sm text-ds-comment">
          {[
            { part: 'Type icon',       token: 'AGENT_TYPES[type].icon',        desc: 'Lucide icon specific to the agent type' },
            { part: 'Type border',     token: 'AGENT_TYPES[type].borderColor', desc: 'border-2 on NeuCard — unique per type' },
            { part: 'Type shadow',     token: 'AGENT_TYPES[type].shadowClass', desc: 'Glow shadow matching the type color' },
            { part: 'Status dot',      token: '<StatusIndicator status="…" />', desc: 'Live runtime status in top-right' },
            { part: 'Stats grid',      token: '<KeyValuePairs columns={2} />',  desc: 'tasks · uptime · last run · model' },
            { part: 'Action bar',      token: '<Button> Run / Stop / Config',   desc: 'Context-aware primary action + configure' },
          ].map((row) => (
            <div key={row.part} className="grid grid-cols-3 gap-3 py-2 border-b border-ds-current/20">
              <span className="text-ds-fg font-medium text-xs">{row.part}</span>
              <code className="text-ds-purple text-[11px]">{row.token}</code>
              <span className="text-[12px]">{row.desc}</span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Implementation">
        <div className="overflow-x-auto">
          <pre className="text-[12px] text-ds-comment font-mono leading-relaxed whitespace-pre">{CODE}</pre>
        </div>
      </DocSection>
    </div>
  )
}
