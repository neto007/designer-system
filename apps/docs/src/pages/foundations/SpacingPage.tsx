import { CodeBlock } from '@shieldai/ds'

const SCALE = [
  { token: '--ds-s-1',  px: 4,  tw: 'p-1',  label: 'xs' },
  { token: '--ds-s-2',  px: 8,  tw: 'p-2',  label: 'sm' },
  { token: '--ds-s-3',  px: 12, tw: 'p-3',  label: 'md' },
  { token: '--ds-s-4',  px: 16, tw: 'p-4',  label: 'lg' },
  { token: '--ds-s-6',  px: 24, tw: 'p-6',  label: 'xl' },
  { token: '--ds-s-8',  px: 32, tw: 'p-8',  label: '2xl' },
  { token: '--ds-s-12', px: 48, tw: 'p-12', label: '3xl' },
  { token: '--ds-s-16', px: 64, tw: 'p-16', label: '4xl' },
  { token: '--ds-s-24', px: 96, tw: 'p-24', label: '5xl' },
]

const RADIUS = [
  { token: '--ds-r-none', px: 0,    tw: 'rounded-none',    label: 'none' },
  { token: '--ds-r-sm',   px: 2,    tw: 'rounded-ds-sm',   label: 'sm' },
  { token: '--ds-r-md',   px: 4,    tw: 'rounded-ds-md',   label: 'md' },
  { token: '--ds-r-lg',   px: 8,    tw: 'rounded-ds-lg',   label: 'lg' },
  { token: '--ds-r-xl',   px: 12,   tw: 'rounded-ds-xl',   label: 'xl' },
  { token: '--ds-r-2xl',  px: 16,   tw: 'rounded-ds-2xl',  label: '2xl' },
  { token: '--ds-r-pill', px: 9999, tw: 'rounded-ds-pill', label: 'pill' },
]

const USAGE = `/* CSS custom property */
padding: var(--ds-s-4);
border-radius: var(--ds-r-lg);

/* Tailwind */
<div className="p-4 gap-3 rounded-ds-lg" />`

export default function SpacingPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">01.03</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Spacing</h1>
        <p className="text-ds-comment text-sm max-w-2xl">
          4 px base grid. Tokens map to Tailwind spacing utilities and CSS custom properties.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Spacing Scale</h2>
        <div className="space-y-2">
          {SCALE.map(({ token, px, label }) => (
            <div key={token} className="flex items-center gap-4">
              <div className="w-12 text-right flex-shrink-0">
                <span className="font-mono text-[10px] text-ds-comment">{px}px</span>
              </div>
              <div
                className="bg-ds-purple rounded-sm flex-shrink-0"
                style={{ width: px, height: 20, boxShadow: '0 0 8px rgba(189,147,249,.4)' }}
              />
              <code className="font-mono text-[10px] text-ds-cyan">{token}</code>
              <span className="font-mono text-[9px] text-ds-current uppercase">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Border Radius</h2>
        <div className="flex flex-wrap gap-4">
          {RADIUS.map(({ token, px, label }) => (
            <div key={token} className="flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 bg-ds-panel border border-ds-purple"
                style={{ borderRadius: px > 9999 ? 9999 : px, boxShadow: '0 0 8px rgba(189,147,249,.3)' }}
              />
              <code className="font-mono text-[9px] text-ds-comment text-center">{label}</code>
              <code className="font-mono text-[9px] text-ds-current text-center">{px === 9999 ? '9999px' : `${px}px`}</code>
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
