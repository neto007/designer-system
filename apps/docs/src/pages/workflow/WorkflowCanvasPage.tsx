import { useState, useRef, useCallback, useEffect } from 'react'
import { AgentNode, NeuCard, Badge } from '@shieldai/ds'
import type { AgentType } from '@shieldai/ds'
import { DocSection } from '../../components/docs'
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react'

// ─── Canvas data ──────────────────────────────────────────────────────────────

interface CanvasNode {
  id: string
  type: AgentType
  label: string
  x: number
  y: number
  status: 'live' | 'idle' | 'pending' | 'error'
}

const NODES: CanvasNode[] = [
  { id: 'a', type: 'workflow',   label: 'Orchestrator',  x: 20,  y: 80,  status: 'live' },
  { id: 'b', type: 'llm',        label: 'Reasoning',     x: 240, y: 20,  status: 'live' },
  { id: 'c', type: 'sequential', label: 'Pipeline',      x: 240, y: 140, status: 'pending' },
  { id: 'd', type: 'a2a',        label: 'Scout Agent',   x: 460, y: 20,  status: 'live' },
  { id: 'e', type: 'task',       label: 'Write Report',  x: 460, y: 140, status: 'idle' },
]

const EDGES = [
  { from: 'a', to: 'b', color: '#8be9fd', live: true },
  { from: 'a', to: 'c', color: '#8be9fd', live: false },
  { from: 'b', to: 'd', color: '#50fa7b', live: true },
  { from: 'c', to: 'e', color: '#f1fa8c', live: false },
]

const NODE_W = 160
const NODE_H = 72

function nodeCenter(node: CanvasNode) {
  return { cx: node.x + NODE_W / 2, cy: node.y + NODE_H / 2 }
}

// ─── Animated edge ────────────────────────────────────────────────────────────

function AnimatedEdge({
  x1, y1, x2, y2, color, live, tick,
}: { x1: number; y1: number; x2: number; y2: number; color: string; live: boolean; tick: number }) {
  const mx = (x1 + x2) / 2
  const d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`

  // Compute path length approximation for dash animation
  const dashOffset = live ? -(tick % 40) * 3 : 0

  return (
    <g>
      {/* base edge */}
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" opacity={live ? 0.8 : 0.4} />
      {/* animated flow for live edges */}
      {live && (
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="8 24"
          strokeDashoffset={dashOffset}
          opacity="0.9"
        />
      )}
      {/* arrowhead */}
      <circle cx={x2} cy={y2} r={live ? 3.5 : 2.5} fill={color} opacity={live ? 1 : 0.5} />
    </g>
  )
}

// ─── Interactive canvas ────────────────────────────────────────────────────────

function MiniCanvas() {
  const [selected, setSelected] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [tick, setTick] = useState(0)
  const isPanning = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Animation loop for live edges
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 50)
    return () => clearInterval(id)
  }, [])

  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]))

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = -e.deltaY * 0.001
    setZoom((z) => Math.min(2, Math.max(0.4, z + delta)))
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-node]')) return
    isPanning.current = true
    lastMouse.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning.current) return
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    lastMouse.current = { x: e.clientX, y: e.clientY }
    setPan((p) => ({ x: p.x + dx, y: p.y + dy }))
  }, [])

  const handleMouseUp = useCallback(() => {
    isPanning.current = false
  }, [])

  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }) }
  const fitView = () => { setZoom(0.85); setPan({ x: 8, y: 8 }) }

  return (
    <div
      ref={containerRef}
      className="relative bg-ds-bg rounded-ds-xl border border-ds-current overflow-hidden select-none"
      style={{ height: 280, cursor: isPanning.current ? 'grabbing' : 'grab' }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden>
        <defs>
          <pattern id="canvas-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#6272a4" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#canvas-grid)" />
      </svg>

      {/* Zoom + pan transform container */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: '0 0' }}
      >
        {/* Edges SVG */}
        <svg
          className="absolute"
          style={{ left: 0, top: 0, width: 700, height: 300, overflow: 'visible', pointerEvents: 'none' }}
        >
          {EDGES.map((e) => {
            const from = nodeMap[e.from]
            const to = nodeMap[e.to]
            if (!from || !to) return null
            const { cx: x1, cy: y1 } = nodeCenter(from)
            const { cx: x2, cy: y2 } = nodeCenter(to)
            return (
              <AnimatedEdge
                key={`${e.from}-${e.to}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                color={e.color} live={e.live} tick={tick}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {NODES.map((node) => (
          <div
            key={node.id}
            data-node="1"
            className="absolute cursor-pointer transition-transform hover:scale-[1.02]"
            style={{ left: node.x, top: node.y, width: NODE_W }}
            onClick={() => setSelected(selected === node.id ? null : node.id)}
          >
            <AgentNode
              agentType={node.type}
              label={node.label}
              status={node.status}
              className={selected === node.id
                ? 'ring-2 ring-ds-purple ring-offset-1 ring-offset-ds-bg'
                : ''}
            />
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="absolute top-3 right-3 flex gap-1 z-10">
        {[
          { icon: ZoomIn,    action: () => setZoom((z) => Math.min(2, z + 0.2)),   label: 'Zoom in' },
          { icon: ZoomOut,   action: () => setZoom((z) => Math.max(0.4, z - 0.2)), label: 'Zoom out' },
          { icon: Maximize2, action: fitView,                                        label: 'Fit view' },
          { icon: RotateCcw, action: resetView,                                      label: 'Reset' },
        ].map(({ icon: Icon, action, label }) => (
          <button
            key={label}
            onClick={action}
            aria-label={label}
            className="w-7 h-7 flex items-center justify-center rounded-ds-sm bg-ds-panel border border-ds-current text-ds-comment hover:text-ds-fg hover:border-ds-purple transition-colors"
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>

      {/* Zoom level badge */}
      <div className="absolute bottom-3 left-3 z-10">
        <Badge variant="muted" className="font-mono text-[9px]">
          {Math.round(zoom * 100)}%
        </Badge>
      </div>

      {/* Selected info panel */}
      {selected && (() => {
        const n = nodeMap[selected]!
        return (
          <div className="absolute bottom-3 right-3 z-10 bg-ds-panel border border-ds-purple rounded-ds-md px-3 py-2 text-xs font-mono">
            <span className="text-ds-purple">{n.type}</span>
            <span className="text-ds-comment mx-1">·</span>
            <span className="text-ds-fg">{n.label}</span>
            <span className="text-ds-comment mx-1">·</span>
            <span className={n.status === 'live' ? 'text-ds-green' : n.status === 'error' ? 'text-ds-red' : 'text-ds-comment'}>
              {n.status}
            </span>
          </div>
        )
      })()}
    </div>
  )
}

// ─── Layout recipes ───────────────────────────────────────────────────────────

const LAYOUTS = [
  { name: 'Left → Right',  desc: 'Default pipeline layout. Works for sequential and parallel flows.',  code: 'direction: "LR"' },
  { name: 'Top → Bottom',  desc: 'Vertical hierarchy. Preferred for orchestrator → worker patterns.',  code: 'direction: "TB"' },
  { name: 'Radial',        desc: 'Hub-and-spoke for fan-out. Orchestrator at center.',                 code: 'layout: "radial"' },
  { name: 'Grid',          desc: 'Dense agent fleets. Use with AgentNode compact variant.',             code: 'layout: "grid"' },
]

const CODE = `// Canvas container with zoom/pan
function AgentCanvas({ nodes, edges }) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })

  return (
    <div
      className="relative bg-ds-bg rounded-ds-xl border border-ds-current overflow-hidden"
      style={{ height: 400 }}
      onWheel={(e) => {
        e.preventDefault()
        setZoom((z) => Math.min(2, Math.max(0.4, z - e.deltaY * 0.001)))
      }}
    >
      {/* dot-grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-10">...</svg>

      {/* transformed content */}
      <div style={{ transform: \`translate(\${pan.x}px, \${pan.y}px) scale(\${zoom})\`, transformOrigin: '0 0' }}>
        {/* SVG edges */}
        <svg className="absolute" style={{ overflow: 'visible', pointerEvents: 'none' }}>
          {edges.map(e => <AnimatedEdge key={e.id} {...e} />)}
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <div key={node.id} className="absolute" style={{ left: node.x, top: node.y }}>
            <AgentNode agentType={node.type} label={node.label} status={node.status} />
          </div>
        ))}
      </div>
    </div>
  )
}`

export default function WorkflowCanvasPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">06.03</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Full Canvas</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Composing a full workflow canvas: grid background, animated bezier edges, node positioning, zoom/pan, and toolbar. Live edges pulse with a flowing dash animation.
        </p>
      </div>

      <DocSection title="Live canvas demo">
        <MiniCanvas />
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-ds-comment">
          <span><kbd className="px-1.5 py-0.5 bg-ds-selection border border-ds-current rounded font-mono text-[10px] text-ds-fg">Scroll</kbd> zoom</span>
          <span><kbd className="px-1.5 py-0.5 bg-ds-selection border border-ds-current rounded font-mono text-[10px] text-ds-fg">Drag</kbd> pan</span>
          <span><kbd className="px-1.5 py-0.5 bg-ds-selection border border-ds-current rounded font-mono text-[10px] text-ds-fg">Click node</kbd> select</span>
          <span className="text-ds-green">● live</span> edges animate
        </div>
      </DocSection>

      <DocSection title="Layout recipes">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LAYOUTS.map((l) => (
            <NeuCard key={l.name} className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-bold text-ds-fg">{l.name}</span>
                <Badge variant="muted" className="font-mono text-[9px]">{l.code}</Badge>
              </div>
              <p className="text-xs text-ds-comment">{l.desc}</p>
            </NeuCard>
          ))}
        </div>
      </DocSection>

      <DocSection title="Canvas anatomy">
        <div className="space-y-2">
          {[
            { layer: '1 · Grid',        comp: 'SVG <pattern>',           desc: 'Dot or line grid — opacity 10%' },
            { layer: '2 · Edges',       comp: 'SVG absolute overlay',    desc: 'Bezier + animated dash for live edges' },
            { layer: '3 · Nodes',       comp: '<AgentNode> abs-pos div', desc: 'Left + Top from layout engine' },
            { layer: '4 · Toolbar',     comp: '<button> icon row',        desc: 'Zoom in/out, fit, reset — top-right' },
            { layer: '5 · Zoom badge',  comp: '<Badge> muted',           desc: 'Current zoom % — bottom-left' },
            { layer: '6 · Selection',   comp: '<div> absolute',          desc: 'Selected node props — bottom-right' },
          ].map((row) => (
            <div key={row.layer} className="grid grid-cols-3 gap-3 py-2.5 border-b border-ds-current/20 text-sm">
              <span className="font-mono text-[10px] text-ds-cyan">{row.layer}</span>
              <code className="text-[11px] text-ds-purple">{row.comp}</code>
              <span className="text-[12px] text-ds-comment">{row.desc}</span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Implementation">
        <pre className="bg-ds-panel border border-ds-current rounded-ds-md p-4 text-[11px] text-ds-comment font-mono leading-relaxed overflow-x-auto whitespace-pre">
          {CODE}
        </pre>
      </DocSection>
    </div>
  )
}
