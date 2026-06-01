import { NeuCard, Badge, StatusDot } from '@shieldai/ds'
import type { AgentType } from '@shieldai/ds'
import { DocSection } from '../../components/docs'

// ─── SVG edge types ───────────────────────────────────────────────────────────

function StraightEdge({ color = '#6272a4', dashed = false, label }: { color?: string; dashed?: boolean; label?: string }) {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40">
      <line
        x1="0" y1="20" x2="100" y2="20"
        stroke={color} strokeWidth="1.5"
        strokeDasharray={dashed ? '5 3' : undefined}
      />
      <polygon points="100,16 112,20 100,24" fill={color} opacity="0.8" />
      {label && (
        <text x="50" y="14" textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">{label}</text>
      )}
    </svg>
  )
}

function CurvedEdge({ color = '#6272a4', label }: { color?: string; label?: string }) {
  return (
    <svg width="120" height="60" viewBox="0 0 120 60">
      <path
        d="M0,30 C40,10 80,50 112,30"
        fill="none" stroke={color} strokeWidth="1.5"
      />
      <polygon points="108,26 120,30 108,34" fill={color} opacity="0.8" />
      {label && (
        <text x="60" y="18" textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace">{label}</text>
      )}
    </svg>
  )
}

function BidirectionalEdge({ color = '#6272a4' }: { color?: string }) {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40">
      <line x1="12" y1="20" x2="108" y2="20" stroke={color} strokeWidth="1.5" />
      <polygon points="12,16 0,20 12,24" fill={color} opacity="0.8" />
      <polygon points="108,16 120,20 108,24" fill={color} opacity="0.8" />
    </svg>
  )
}

// ─── Connection table ─────────────────────────────────────────────────────────

const CONNECTIONS: { from: AgentType; to: AgentType; edge: string; color: string }[] = [
  { from: 'workflow', to: 'llm',        edge: 'direct',       color: '#8be9fd' },
  { from: 'workflow', to: 'parallel',   edge: 'fork',         color: '#ff79c6' },
  { from: 'parallel', to: 'sequential', edge: 'branch',       color: '#f1fa8c' },
  { from: 'llm',      to: 'a2a',        edge: 'delegate',     color: '#bd93f9' },
  { from: 'a2a',      to: 'task',       edge: 'assign',       color: '#ff5555' },
  { from: 'loop',     to: 'loop',       edge: 'self-loop',    color: '#ffb86c' },
]

const CODE = `// SVG edge between two nodes — use with absolute-positioned canvas
function WorkflowEdge({ x1, y1, x2, y2, type = 'straight', color }) {
  if (type === 'curved') {
    const mx = (x1 + x2) / 2
    return (
      <svg style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none' }}>
        <path d={\`M\${x1},\${y1} C\${mx},\${y1} \${mx},\${y2} \${x2},\${y2}\`}
          fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
    )
  }
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none' }}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" />
    </svg>
  )
}`

export default function WorkflowEdgesPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">06.02</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Handles & Edges</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Edge types and connection patterns for agent workflow graphs. Each edge variant communicates a different execution relationship between nodes.
        </p>
      </div>

      {/* Edge type catalogue */}
      <DocSection title="Edge types">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Direct',         el: <StraightEdge color="#8be9fd" />,                          desc: 'Single unidirectional data flow' },
            { label: 'Dashed',         el: <StraightEdge color="#6272a4" dashed />,                    desc: 'Async / conditional path' },
            { label: 'Labelled',       el: <StraightEdge color="#bd93f9" label="onSuccess" />,         desc: 'Named transition (guards, events)' },
            { label: 'Curved',         el: <CurvedEdge  color="#ff79c6" />,                            desc: 'Long-distance or crossing connections' },
            { label: 'Bidirectional',  el: <BidirectionalEdge color="#ffb86c" />,                      desc: 'A2A back-and-forth delegation' },
            { label: 'Fork',           el: <StraightEdge color="#f1fa8c" label="×N branches" />,       desc: 'Parallel fan-out from one source' },
          ].map((e) => (
            <NeuCard key={e.label} className="flex items-center gap-4 p-4">
              <div className="flex-shrink-0">{e.el}</div>
              <div>
                <p className="text-xs font-bold text-ds-fg font-mono">{e.label}</p>
                <p className="text-[11px] text-ds-comment mt-0.5">{e.desc}</p>
              </div>
            </NeuCard>
          ))}
        </div>
      </DocSection>

      {/* Connection rules */}
      <DocSection title="Connection rules by agent type">
        <div className="rounded-ds-lg border border-ds-current overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-ds-panel border-b border-ds-current">
                {['From', 'To', 'Edge', 'Color token'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-widest text-ds-comment">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ds-current/30">
              {CONNECTIONS.map((c) => (
                <tr key={`${c.from}-${c.to}`} className="hover:bg-ds-current/10 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-ds-fg">{c.from}</td>
                  <td className="px-4 py-2.5 font-mono text-ds-fg">{c.to}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant="muted" className="font-mono text-[10px]">{c.edge}</Badge>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="font-mono text-[11px]" style={{ color: c.color }}>{c.color}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      {/* Edge states */}
      <DocSection title="Edge states">
        <div className="flex flex-wrap gap-6 items-center">
          {[
            { label: 'default',    color: '#6272a4' },
            { label: 'active',     color: '#bd93f9' },
            { label: 'success',    color: '#50fa7b' },
            { label: 'error',      color: '#ff5555' },
            { label: 'processing', color: '#ffb86c' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <StraightEdge color={s.color} />
              <span className="font-mono text-[10px] text-ds-comment">{s.label}</span>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Handle positions */}
      <DocSection title="Handle positions">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {['top', 'right', 'bottom', 'left'].map((pos) => (
            <div key={pos} className="border border-ds-current rounded-ds-md p-4 bg-ds-panel flex flex-col items-center gap-2">
              <div className="relative w-12 h-12 border-2 border-ds-purple rounded-ds-sm flex items-center justify-center">
                <span className="text-[9px] font-mono text-ds-comment">node</span>
                <div
                  className="absolute w-2.5 h-2.5 rounded-full bg-ds-purple border-2 border-ds-bg shadow-[0_0_6px_rgba(189,147,249,.8)]"
                  style={{
                    top:    pos === 'top'    ? '-6px' : pos === 'bottom' ? 'auto' : '50%',
                    bottom: pos === 'bottom' ? '-6px' : undefined,
                    left:   pos === 'left'   ? '-6px' : pos === 'right'  ? 'auto' : '50%',
                    right:  pos === 'right'  ? '-6px' : undefined,
                    transform: pos === 'top' || pos === 'bottom' ? 'translateX(-50%)' : pos === 'left' || pos === 'right' ? 'translateY(-50%)' : undefined,
                  }}
                />
              </div>
              <span className="font-mono text-[10px] text-ds-comment">{pos}</span>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Status on edges */}
      <DocSection title="Live status on edges">
        <div className="flex flex-wrap gap-4">
          {(['live', 'idle', 'pending', 'error'] as const).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <StatusDot status={s} size="sm" />
              <StraightEdge color={s === 'live' ? '#50fa7b' : s === 'error' ? '#ff5555' : s === 'pending' ? '#ffb86c' : '#6272a4'} />
              <span className="font-mono text-[10px] text-ds-comment">{s}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-ds-comment mt-3">
          Pair edge color with StatusDot on the target handle to show live execution state.
        </p>
      </DocSection>

      {/* Code */}
      <DocSection title="Implementation">
        <pre className="bg-ds-panel border border-ds-current rounded-ds-md p-4 text-[11px] text-ds-comment font-mono leading-relaxed overflow-x-auto whitespace-pre">
          {CODE}
        </pre>
      </DocSection>
    </div>
  )
}
