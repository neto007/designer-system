import { AgentBadge, AgentNode, StatusDot } from '@shieldai/ds'
import type { AgentType } from '@shieldai/ds'
import { DocSection, PreviewRow } from '../../components/docs'

const ALL_TYPES: AgentType[] = ['llm', 'a2a', 'sequential', 'parallel', 'loop', 'workflow', 'task']

const AGENT_NODE_CODE = `import { AgentNode, AgentBadge, StatusDot } from '@shieldai/ds'

// AgentNode — card with type-colored border, icon, and status
<AgentNode
  agentType="llm"
  label="GPT-4o Router"
  status="live"
  description="Routes queries to downstream agents"
/>

// AgentBadge — compact inline badge per agent type
<AgentBadge agentType="sequential" />
<AgentBadge agentType="parallel" size="sm" />
<AgentBadge agentType="workflow" showLabel={false} />

// StatusDot — animated status indicator
<StatusDot status="live"    label="Live" />
<StatusDot status="idle"    label="Idle" />
<StatusDot status="pending" label="Pending" />
<StatusDot status="error"   label="Error" />`

const PIPELINE = [
  { agentType: 'workflow' as AgentType, label: 'Orchestrator',   status: 'live'    as const, description: 'Top-level pipeline coordinator' },
  { agentType: 'parallel' as AgentType, label: 'Fork Gate',      status: 'live'    as const, description: 'Splits into concurrent branches' },
  { agentType: 'llm'      as AgentType, label: 'GPT-4o Router',  status: 'live'    as const, description: 'Natural language reasoning' },
  { agentType: 'a2a'      as AgentType, label: 'Threat Scout',   status: 'pending' as const, description: 'External agent API call' },
  { agentType: 'sequential' as AgentType, label: 'Post-Process', status: 'idle'    as const, description: 'Sequential cleanup steps' },
  { agentType: 'loop'     as AgentType, label: 'Retry Loop',     status: 'idle'    as const, description: 'Retries until threshold met' },
  { agentType: 'task'     as AgentType, label: 'Write Report',   status: 'idle'    as const, description: 'Discrete output task' },
]

function Arrow() {
  return (
    <div className="flex items-center self-center flex-shrink-0 px-1">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
        <line x1="0" y1="8" x2="24" y2="8" stroke="#6272a4" strokeWidth="1.5" strokeDasharray="4 2" />
        <polygon points="24,4 32,8 24,12" fill="#6272a4" opacity="0.6" />
      </svg>
    </div>
  )
}

export default function WorkflowDemoPage() {
  return (
    <div className="space-y-12 max-w-4xl">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-ds-purple mb-1">06 · Workflow</div>
        <h1 className="text-3xl font-bold text-ds-fg mb-3">Workflow Components</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Visual building blocks for agent workflow canvases. Each of the 7 agent types has a distinct color, icon, and glow shadow for instant recognition in complex pipelines.
        </p>
      </div>

      {/* Pipeline canvas demo */}
      <DocSection title="Node Types — Live Pipeline">
        <div className="bg-ds-bg border border-ds-current rounded-ds-xl p-6 overflow-x-auto">
          <div className="flex items-start gap-0 min-w-[700px]">
            {PIPELINE.map((node, i) => (
              <div key={node.label} className="flex items-center">
                <AgentNode
                  agentType={node.agentType}
                  label={node.label}
                  status={node.status}
                  description={node.description}
                  className="flex-shrink-0"
                />
                {i < PIPELINE.length - 1 && <Arrow />}
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-ds-comment mt-2">
          Each AgentNode renders a NeuCard with type-colored border, icon, status dot, and description.
        </p>
      </DocSection>

      {/* All 7 types grid */}
      <DocSection title="All 7 Agent Types">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {ALL_TYPES.map((type) => (
            <AgentNode
              key={type}
              agentType={type}
              label={type.charAt(0).toUpperCase() + type.slice(1)}
              status="idle"
            />
          ))}
        </div>
      </DocSection>

      {/* AgentBadge */}
      <DocSection title="AgentBadge">
        <div className="space-y-4">
          <PreviewRow label="md (default)">
            {ALL_TYPES.map((t) => (
              <AgentBadge key={t} agentType={t} />
            ))}
          </PreviewRow>
          <PreviewRow label="sm">
            {ALL_TYPES.map((t) => (
              <AgentBadge key={t} agentType={t} size="sm" />
            ))}
          </PreviewRow>
          <PreviewRow label="icon only">
            {ALL_TYPES.map((t) => (
              <AgentBadge key={t} agentType={t} showLabel={false} />
            ))}
          </PreviewRow>
        </div>
      </DocSection>

      {/* Status dots */}
      <DocSection title="StatusDot">
        <div className="space-y-4">
          <PreviewRow label="states">
            <StatusDot status="live"    label="Live"    size="md" />
            <StatusDot status="pending" label="Pending" size="md" />
            <StatusDot status="idle"    label="Idle"    size="md" />
            <StatusDot status="error"   label="Error"   size="md" />
          </PreviewRow>
          <PreviewRow label="sizes">
            <StatusDot status="live" size="sm" label="sm" />
            <StatusDot status="live" size="md" label="md" />
            <StatusDot status="live" size="lg" label="lg" />
          </PreviewRow>
        </div>
      </DocSection>

      {/* Code */}
      <DocSection title="Usage">
        <pre className="bg-ds-panel border border-ds-current rounded-ds-md p-4 text-xs text-ds-fg font-mono overflow-x-auto whitespace-pre">
          {AGENT_NODE_CODE}
        </pre>
      </DocSection>

      {/* Props */}
      <DocSection title="AgentNode Props">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-ds-current text-ds-comment">
                <th className="text-left py-2 pr-4 font-mono">prop</th>
                <th className="text-left py-2 pr-4 font-mono">type</th>
                <th className="text-left py-2 pr-4 font-mono">default</th>
                <th className="text-left py-2 font-mono">description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ds-current/50">
              {[
                { name: 'agentType', type: 'AgentType', def: '—', desc: 'One of the 7 types — determines border color, icon, and glow' },
                { name: 'label', type: 'string', def: '—', desc: 'Node title' },
                { name: 'status', type: '"live" | "idle" | "error" | "pending"', def: '"idle"', desc: 'Drives the StatusDot in the header' },
                { name: 'description', type: 'string', def: '—', desc: 'Optional subtitle text' },
                { name: 'actions', type: 'ReactNode', def: '—', desc: 'Footer action buttons' },
              ].map((r) => (
                <tr key={r.name}>
                  <td className="py-2 pr-4 font-mono text-ds-purple">{r.name}</td>
                  <td className="py-2 pr-4 text-ds-green font-mono">{r.type}</td>
                  <td className="py-2 pr-4 text-ds-comment font-mono">{r.def}</td>
                  <td className="py-2 text-ds-fg/80">{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="AgentType values">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-ds-current text-ds-comment">
                <th className="text-left py-2 pr-4 font-mono">type</th>
                <th className="text-left py-2 pr-4 font-mono">color</th>
                <th className="text-left py-2 font-mono">use case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ds-current/50">
              {[
                { type: 'llm',        color: 'Green',  use: 'Language model reasoning node' },
                { type: 'a2a',        color: 'Purple', use: 'Agent-to-agent external call' },
                { type: 'sequential', color: 'Yellow', use: 'Step-by-step ordered execution' },
                { type: 'parallel',   color: 'Pink',   use: 'Concurrent branch fork' },
                { type: 'loop',       color: 'Orange', use: 'Iterative retry or map loop' },
                { type: 'workflow',   color: 'Cyan',   use: 'Orchestrated sub-pipeline' },
                { type: 'task',       color: 'Red',    use: 'Discrete unit of work / leaf node' },
              ].map((r) => (
                <tr key={r.type}>
                  <td className="py-2 pr-4 font-mono text-ds-fg">{r.type}</td>
                  <td className="py-2 pr-4 text-ds-comment">{r.color}</td>
                  <td className="py-2 text-ds-fg/80">{r.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>
    </div>
  )
}
