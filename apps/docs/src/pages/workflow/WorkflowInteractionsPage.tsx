import { useState } from 'react'
import { AgentNode, NeuCard, Badge, Button } from '@shieldai/ds'
import { DocSection, PreviewRow } from '../../components/docs'
import { MousePointer, Hand, ZoomIn, Move } from 'lucide-react'

// ─── Interaction state demos ──────────────────────────────────────────────────

type InteractionState = 'default' | 'hover' | 'selected' | 'connecting' | 'error' | 'running'

const STATE_CONFIG: Record<InteractionState, { ring: string; label: string; desc: string }> = {
  default:    { ring: '',                                               label: 'Default',    desc: 'Idle, no interaction' },
  hover:      { ring: 'ring-1 ring-ds-current ring-offset-1 ring-offset-ds-bg',              label: 'Hover',      desc: 'Mouse over — subtle outline' },
  selected:   { ring: 'ring-2 ring-ds-purple ring-offset-1 ring-offset-ds-bg',               label: 'Selected',   desc: 'Click to select — purple ring' },
  connecting: { ring: 'ring-2 ring-ds-cyan ring-offset-1 ring-offset-ds-bg animate-pulse',   label: 'Connecting', desc: 'Drag from handle — cyan pulse' },
  error:      { ring: 'ring-2 ring-ds-red ring-offset-1 ring-offset-ds-bg',                  label: 'Error',      desc: 'Runtime failure — red border' },
  running:    { ring: 'ring-2 ring-ds-green ring-offset-1 ring-offset-ds-bg animate-pulse',  label: 'Running',    desc: 'Active execution — green pulse' },
}

function InteractiveNode() {
  const [state, setState] = useState<InteractionState>('default')
  const cfg = STATE_CONFIG[state]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(STATE_CONFIG) as InteractionState[]).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={state === s ? 'default' : 'outline'}
            onClick={() => setState(s)}
          >
            {STATE_CONFIG[s].label}
          </Button>
        ))}
      </div>
      <div className="bg-ds-bg rounded-ds-xl border border-ds-current p-8 flex items-center justify-center">
        <div className="transition-all duration-200">
          <AgentNode
            agentType="llm"
            label="GPT-4o Router"
            status={state === 'running' ? 'live' : state === 'error' ? 'error' : 'idle'}
            description="Routes queries to downstream agents"
            className={cfg.ring}
          />
        </div>
      </div>
      <p className="text-xs text-ds-comment">
        <span className="text-ds-fg font-medium">{cfg.label}</span> — {cfg.desc}
      </p>
    </div>
  )
}

// ─── Keyboard shortcuts table ─────────────────────────────────────────────────

const SHORTCUTS = [
  { keys: ['Click'],          action: 'Select node' },
  { keys: ['⌘', 'Click'],    action: 'Multi-select nodes' },
  { keys: ['Drag'],           action: 'Move node' },
  { keys: ['Handle drag'],    action: 'Create edge' },
  { keys: ['Delete'],         action: 'Remove selected' },
  { keys: ['⌘', 'A'],         action: 'Select all' },
  { keys: ['⌘', 'Z'],         action: 'Undo' },
  { keys: ['⌘', 'Shift', 'Z'],action: 'Redo' },
  { keys: ['Scroll'],         action: 'Zoom in/out' },
  { keys: ['Space', 'drag'],  action: 'Pan canvas' },
  { keys: ['F'],              action: 'Fit view' },
]

// ─── Interaction modes ────────────────────────────────────────────────────────

const MODES = [
  { icon: MousePointer, name: 'Select',  desc: 'Click to select, drag to move. Default mode.',       key: 'V' },
  { icon: Hand,         name: 'Pan',     desc: 'Drag to pan the canvas. Hold Space to activate.',    key: 'Space' },
  { icon: ZoomIn,       name: 'Zoom',    desc: 'Scroll wheel or pinch gesture.',                     key: '+/−' },
  { icon: Move,         name: 'Connect', desc: 'Drag from a handle to create a new edge.',           key: 'C' },
]

// ─── Selection patterns ───────────────────────────────────────────────────────

const CODE = `// Track selection state externally
const [selectedNodes, setSelectedNodes] = useState<string[]>([])

function handleNodeClick(id: string, evt: React.MouseEvent) {
  if (evt.metaKey || evt.ctrlKey) {
    // Multi-select: toggle
    setSelectedNodes((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    )
  } else {
    // Single select
    setSelectedNodes([id])
  }
}

// Apply ring to selected nodes
<AgentNode
  className={selectedNodes.includes(node.id)
    ? 'ring-2 ring-ds-purple ring-offset-1 ring-offset-ds-bg'
    : ''}
  onClick={(e) => handleNodeClick(node.id, e)}
/>`

export default function WorkflowInteractionsPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">06.04</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Interactions</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Node selection, hover, connection, and error states. Keyboard shortcuts and multi-select patterns.
        </p>
      </div>

      <DocSection title="Node interaction states">
        <InteractiveNode />
      </DocSection>

      <DocSection title="Canvas modes">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MODES.map(({ icon: Icon, name, desc, key }) => (
            <NeuCard key={name} className="p-4 text-center space-y-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-ds-md border border-ds-current mx-auto bg-ds-bg">
                <Icon className="h-4 w-4 text-ds-purple" />
              </div>
              <p className="text-sm font-bold text-ds-fg">{name}</p>
              <p className="text-[11px] text-ds-comment">{desc}</p>
              <Badge variant="muted" className="font-mono text-[9px]">{key}</Badge>
            </NeuCard>
          ))}
        </div>
      </DocSection>

      <DocSection title="Keyboard shortcuts">
        <div className="rounded-ds-lg border border-ds-current overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-ds-current/30">
              {SHORTCUTS.map((s, i) => (
                <tr key={i} className="hover:bg-ds-current/10 transition-colors">
                  <td className="px-4 py-2.5 w-44">
                    <div className="flex items-center gap-1 flex-wrap">
                      {s.keys.map((k) => (
                        <kbd key={k} className="px-1.5 py-0.5 text-[10px] font-mono bg-ds-selection border border-ds-current rounded text-ds-fg">
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-sm text-ds-comment">{s.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Multi-select pattern">
        <PreviewRow label="single selected">
          <div className="flex gap-4">
            <AgentNode agentType="llm" label="Router" status="idle" className="ring-2 ring-ds-purple ring-offset-1 ring-offset-ds-bg" />
            <AgentNode agentType="sequential" label="Pipeline" status="idle" />
          </div>
        </PreviewRow>
        <PreviewRow label="multi selected">
          <div className="flex gap-4">
            <AgentNode agentType="llm" label="Router" status="idle" className="ring-2 ring-ds-purple ring-offset-1 ring-offset-ds-bg" />
            <AgentNode agentType="sequential" label="Pipeline" status="idle" className="ring-2 ring-ds-purple ring-offset-1 ring-offset-ds-bg" />
            <AgentNode agentType="task" label="Output" status="idle" />
          </div>
        </PreviewRow>
      </DocSection>

      <DocSection title="Connection flow">
        <div className="space-y-3">
          {[
            { step: '1', text: 'Hover a node — source handles appear at edges', color: 'text-ds-cyan' },
            { step: '2', text: 'Click and drag from a handle — edge starts drawing', color: 'text-ds-purple' },
            { step: '3', text: 'Hover a target node — valid handles highlight in green', color: 'text-ds-green' },
            { step: '4', text: 'Release on a target handle — edge is committed', color: 'text-ds-orange' },
            { step: '5', text: 'Invalid drop (same node, incompatible type) — edge cancelled', color: 'text-ds-red' },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3 py-2 border-b border-ds-current/20">
              <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-ds-current/30 text-[10px] font-black flex items-center justify-center ${s.color}`}>
                {s.step}
              </span>
              <span className="text-sm text-ds-comment">{s.text}</span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Selection state implementation">
        <pre className="bg-ds-panel border border-ds-current rounded-ds-md p-4 text-[11px] text-ds-comment font-mono leading-relaxed overflow-x-auto whitespace-pre">
          {CODE}
        </pre>
      </DocSection>
    </div>
  )
}
