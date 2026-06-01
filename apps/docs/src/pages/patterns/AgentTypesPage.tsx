import { AGENT_TYPES } from '@shieldai/ds'
import type { AgentType } from '@shieldai/ds'
import { NeuCard, Badge, CodeBlock, StatusIndicator } from '@shieldai/ds'
import { DocSection } from '../../components/docs'

const CODE_USAGE = `import { AGENT_TYPES } from '@shieldai/ds'
import type { AgentType } from '@shieldai/ds'

// Access config for a specific type
const cfg = AGENT_TYPES['llm']
const Icon = cfg.icon

<div className={cfg.color}>
  <Icon className="h-5 w-5" />
  <span>{cfg.label}</span>
</div>

// Border + shadow (for nodes/cards)
<div className={\`border-2 \${cfg.borderColor} \${cfg.shadowClass}\`}>
  Agent node
</div>`

export default function AgentTypesPage() {
  const types = Object.entries(AGENT_TYPES) as [AgentType, typeof AGENT_TYPES[AgentType]][]

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">04.02</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Agent Type Coding</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          ShieldAI uses 7 agent types, each with a dedicated color, icon, and shadow. Apply consistently across nodes, badges, borders, and status indicators.
        </p>
      </div>

      {/* Showcase grid */}
      <DocSection title="All 7 types">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {types.map(([key, cfg]) => {
            const Icon = cfg.icon
            return (
              <NeuCard
                key={key}
                className={`p-4 border-2 ${cfg.borderColor} ${cfg.shadowClass} transition-all hover:scale-[1.02]`}
              >
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 ${cfg.color}`}>
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-black uppercase tracking-widest text-sm">{cfg.label}</span>
                  </div>
                  <p className="text-xs text-ds-comment">{cfg.description}</p>
                  <div className="flex items-center justify-between">
                    <code
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-ds-current"
                      style={{ color: cfg.hex }}
                    >
                      {cfg.hex}
                    </code>
                    <Badge
                      variant={
                        key === 'llm' ? 'green' :
                        key === 'a2a' ? 'purple' :
                        key === 'parallel' ? 'pink' :
                        key === 'workflow' ? 'cyan' :
                        key === 'loop' ? 'solid-orange' :
                        key === 'task' ? 'solid-red' : 'muted'
                      }
                      className="text-[9px] font-mono"
                    >
                      {key}
                    </Badge>
                  </div>
                </div>
              </NeuCard>
            )
          })}
        </div>
      </DocSection>

      {/* Usage */}
      <DocSection title="Usage">
        <CodeBlock code={CODE_USAGE} lang="tsx" />
      </DocSection>

      {/* Token table */}
      <DocSection title="Token reference">
        <div className="overflow-x-auto rounded-ds-lg border border-ds-current bg-ds-panel">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ds-current bg-ds-bg">
                {['Type', 'Color token', 'Hex', 'Icon', 'Use case'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[11px] font-black uppercase tracking-widest text-ds-comment">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {types.map(([key, cfg]) => {
                const Icon = cfg.icon
                return (
                  <tr key={key} className="border-b border-ds-current/30 last:border-0 hover:bg-ds-current/10 transition-colors">
                    <td className="px-4 py-2.5">
                      <div className={`flex items-center gap-1.5 ${cfg.color} font-mono text-[12px]`}>
                        <Icon className="h-3.5 w-3.5" />
                        {key}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-ds-comment">--{cfg.color.replace('text-', '')}</td>
                    <td className="px-4 py-2.5">
                      <span className="font-mono text-[11px]" style={{ color: cfg.hex }}>{cfg.hex}</span>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-ds-comment">{Icon.displayName ?? Icon.name}</td>
                    <td className="px-4 py-2.5 text-xs text-ds-comment">{cfg.description}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </DocSection>

      {/* Status integration */}
      <DocSection title="With StatusIndicator">
        <div className="flex flex-wrap gap-4">
          {(['success', 'running', 'warning', 'error', 'disabled', 'pending', 'live', 'idle'] as const).map((s) => (
            <div key={s} className="flex items-center gap-2 text-sm">
              <StatusIndicator status={s} />
              <code className="text-xs text-ds-comment">{s}</code>
            </div>
          ))}
        </div>
        <p className="text-xs text-ds-comment mt-3">
          Pair agent type colors with StatusIndicator for live runtime dashboards. Use <code className="text-ds-green">success</code> for healthy, <code className="text-ds-orange">running</code> for in-progress, <code className="text-ds-red">error</code> for failed.
        </p>
      </DocSection>
    </div>
  )
}
