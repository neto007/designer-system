import { CodeBlock } from '@shieldai/ds'

const GLOWS = [
  { name: 'glow-sm-purple', css: 'var(--ds-glow-sm-purple)', desc: 'Subtle hover state', color: '#bd93f9' },
  { name: 'glow-md-purple', css: 'var(--ds-glow-md-purple)', desc: 'Active / focused',   color: '#bd93f9' },
  { name: 'glow-lg-purple', css: 'var(--ds-glow-lg-purple)', desc: 'Brand highlight',    color: '#bd93f9' },
  { name: 'glow-md-green',  css: 'var(--ds-glow-md-green)',  desc: 'Success / live',     color: '#50fa7b' },
  { name: 'glow-md-cyan',   css: 'var(--ds-glow-md-cyan)',   desc: 'Info / workflow',    color: '#8be9fd' },
  { name: 'glow-md-orange', css: 'var(--ds-glow-md-orange)', desc: 'Warning / loop',     color: '#ffb86c' },
  { name: 'glow-md-red',    css: 'var(--ds-glow-md-red)',    desc: 'Error / destructive', color: '#ff5555' },
  { name: 'glow-md-pink',   css: 'var(--ds-glow-md-pink)',   desc: 'Hover / parallel',   color: '#ff79c6' },
]

const NEU = [
  { name: 'neu-sm',     tw: 'shadow-neu-sm',     desc: 'Input / small card',  sample: '2px 2px 0 black' },
  { name: 'neu',        tw: 'shadow-neu',         desc: 'Default neobrutalism', sample: '4px 4px 0 black' },
  { name: 'neu-lg',     tw: 'shadow-neu-lg',      desc: 'Large card / dialog', sample: '6px 6px 0 black' },
  { name: 'neu-purple', tw: 'shadow-neu-purple',  desc: 'Brand accent',        sample: '4px 4px 0 #bd93f9' },
  { name: 'neu-green',  tw: 'shadow-neu-green',   desc: 'Success action',      sample: '4px 4px 0 #50fa7b' },
  { name: 'neu-red',    tw: 'shadow-neu-red',     desc: 'Destructive action',  sample: '4px 4px 0 #ff5555' },
]

const USAGE = `/* Glow — neon axis */
box-shadow: var(--ds-glow-md-purple);
className="shadow-glow"           /* Tailwind preset alias */
className="shadow-glow-green"

/* Neobrutalism — offset hard shadow */
box-shadow: var(--ds-neu);
className="shadow-neu"
className="shadow-neu-purple"

/* Z-index tokens */
z-index: var(--ds-z-modal);      /* 80 */
className="z-modal"`

export default function ElevationPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">01.04</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Elevation</h1>
        <p className="text-ds-comment text-sm max-w-2xl">
          Two shadow systems — <strong className="text-ds-fg">glow</strong> for the Dracula-neon axis and{' '}
          <strong className="text-ds-fg">neu</strong> for the Neobrutalism axis.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Glow Shadows · Dracula Neon</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {GLOWS.map(({ name, desc, color }) => (
            <div key={name} className="rounded-ds-lg bg-ds-panel border border-ds-current p-4 space-y-3">
              <div
                className="h-10 rounded-ds-md"
                style={{ backgroundColor: color + '22', boxShadow: `0 0 15px ${color}55` }}
              />
              <div>
                <code className="font-mono text-[10px] text-ds-cyan block">{name}</code>
                <p className="text-[11px] text-ds-comment mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Neu Shadows · Neobrutalism</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {NEU.map(({ name, tw, desc, sample }) => (
            <div key={name} className="rounded-ds-lg bg-ds-panel border border-ds-current p-4 space-y-3">
              <div
                className={`h-10 rounded-ds-sm bg-ds-selection border border-ds-current ${tw}`}
              />
              <div>
                <code className="font-mono text-[10px] text-ds-cyan block">{name}</code>
                <code className="font-mono text-[9px] text-ds-comment block mt-0.5">{sample}</code>
                <p className="text-[11px] text-ds-comment mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Z-Index Scale</h2>
        <div className="flex flex-wrap gap-2">
          {[
            ['base', '1'], ['dropdown', '50'], ['sticky', '60'],
            ['overlay', '70'], ['modal', '80'], ['toast', '90'], ['tooltip', '100'],
          ].map(([name, val]) => (
            <div key={name} className="border border-ds-current rounded px-3 py-1.5 bg-ds-panel">
              <span className="font-mono text-[10px] text-ds-purple">z-{name}</span>
              <span className="font-mono text-[10px] text-ds-comment ml-2">{val}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Usage</h2>
        <CodeBlock code={USAGE} lang="css" />
      </section>
    </div>
  )
}
