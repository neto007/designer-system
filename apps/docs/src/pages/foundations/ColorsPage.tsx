import { CodeBlock } from '@shieldai/ds'

const SIGNALS = [
  { name: 'purple', hex: '#bd93f9', var: '--ds-purple', desc: 'Primary · Brand · LLM' },
  { name: 'green',  hex: '#50fa7b', var: '--ds-green',  desc: 'Success · Live · User' },
  { name: 'cyan',   hex: '#8be9fd', var: '--ds-cyan',   desc: 'Info · Workflow' },
  { name: 'pink',   hex: '#ff79c6', var: '--ds-pink',   desc: 'Hover · Parallel' },
  { name: 'orange', hex: '#ffb86c', var: '--ds-orange', desc: 'Warning · Loop · Tool' },
  { name: 'yellow', hex: '#f1fa8c', var: '--ds-yellow', desc: 'Attention · Sequential' },
  { name: 'red',    hex: '#ff5555', var: '--ds-red',    desc: 'Destructive · Task · Alert' },
]

const SURFACES = [
  { name: 'bg',        hex: '#050101', var: '--ds-bg',        desc: 'Page canvas' },
  { name: 'panel',     hex: '#0b0b11', var: '--ds-panel',     desc: 'Cards · Dialogs' },
  { name: 'current',   hex: '#1a1b26', var: '--ds-current',   desc: 'Borders · Hover' },
  { name: 'selection', hex: '#282a36', var: '--ds-selection', desc: 'Selection · Raised' },
]

const TEXT = [
  { name: 'fg',      hex: '#f8f8f2', var: '--ds-fg',      desc: 'Primary text' },
  { name: 'comment', hex: '#6272a4', var: '--ds-comment', desc: 'Muted / secondary text' },
]

const USAGE = `/* CSS custom property */
color: var(--ds-purple);
background: var(--ds-panel);
border-color: var(--ds-current);

/* Tailwind utility class */
<div className="text-ds-purple bg-ds-panel border-ds-current" />`

export default function ColorsPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">01.01</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Colors</h1>
        <p className="text-ds-comment text-sm max-w-2xl">
          Dracula-derived palette with two roles — <strong className="text-ds-fg">signal colors</strong> for neon accents and status, and <strong className="text-ds-fg">surface scale</strong> for depth.
        </p>
      </div>

      {/* Signal palette */}
      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Signal Palette</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SIGNALS.map(({ name, hex, var: cssVar, desc }) => (
            <div key={name} className="border border-ds-current rounded-ds-lg overflow-hidden">
              <div
                className="h-16"
                style={{ backgroundColor: hex, boxShadow: `0 0 20px ${hex}55` }}
              />
              <div className="p-3 bg-ds-panel space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="font-black text-ds-fg text-sm">{name}</span>
                  <code className="font-mono text-[10px] text-ds-comment">{hex}</code>
                </div>
                <code className="font-mono text-[10px] text-ds-purple block">{cssVar}</code>
                <p className="text-[11px] text-ds-comment">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Surface scale */}
      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Surface Scale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SURFACES.map(({ name, hex, var: cssVar, desc }) => (
            <div key={name} className="border border-ds-current rounded-ds-lg overflow-hidden">
              <div className="h-12 border-b border-ds-current" style={{ backgroundColor: hex }} />
              <div className="p-3 bg-ds-panel space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="font-black text-ds-fg text-sm">{name}</span>
                  <code className="font-mono text-[10px] text-ds-comment">{hex}</code>
                </div>
                <code className="font-mono text-[10px] text-ds-purple block">{cssVar}</code>
                <p className="text-[11px] text-ds-comment">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Text */}
      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Text</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TEXT.map(({ name, hex, var: cssVar, desc }) => (
            <div key={name} className="border border-ds-current rounded-ds-lg p-4 bg-ds-panel flex items-center gap-4">
              <span className="text-2xl font-black" style={{ color: hex }}>Aa</span>
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="font-black text-ds-fg text-sm">{name}</span>
                  <code className="font-mono text-[10px] text-ds-comment">{hex}</code>
                </div>
                <code className="font-mono text-[10px] text-ds-purple block">{cssVar}</code>
                <p className="text-[11px] text-ds-comment">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage */}
      <section className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Usage</h2>
        <CodeBlock code={USAGE} lang="css" />
      </section>
    </div>
  )
}
