import { CodeBlock } from '@shieldai/ds'

const SCALES = [
  { size: '72px', cls: 'text-[72px]', label: 'Display', weight: 'font-black', sample: 'ShieldAI' },
  { size: '56px', cls: 'text-[56px]', label: 'H1',      weight: 'font-black', sample: 'Agent System' },
  { size: '40px', cls: 'text-[40px]', label: 'H2',      weight: 'font-black', sample: 'Workflow Canvas' },
  { size: '32px', cls: 'text-[32px]', label: 'H3',      weight: 'font-bold',  sample: 'Component Library' },
  { size: '24px', cls: 'text-[24px]', label: 'H4',      weight: 'font-bold',  sample: 'Design Tokens' },
  { size: '20px', cls: 'text-[20px]', label: 'H5',      weight: 'font-semibold', sample: 'Props Table' },
  { size: '16px', cls: 'text-[16px]', label: 'Body',    weight: 'font-normal', sample: 'The quick brown fox jumps over the lazy dog.' },
  { size: '14px', cls: 'text-[14px]', label: 'Small',   weight: 'font-normal', sample: 'Secondary text and captions.' },
  { size: '12px', cls: 'text-[12px]', label: 'XS',      weight: 'font-normal', sample: 'Code labels and metadata' },
]

const MONO_SCALES = [
  { size: '12px', label: 'Code body',    sample: 'const agent = new LLMAgent({ model: "claude-3-5" })' },
  { size: '10px', label: 'Labels / caps', sample: 'PROP · TYPE · DEFAULT · DESCRIPTION' },
  { size: '9px',  label: 'Micro',        sample: '01 · COMPONENTS · STATUS DONE' },
]

const USAGE = `/* Sans */
font-family: var(--ds-font-sans);
className="font-sans text-[16px] font-normal"

/* Mono */
font-family: var(--ds-font-mono);   /* JetBrains Mono */
className="font-mono text-[12px]"

/* Uppercase label pattern */
className="font-mono text-[10px] uppercase tracking-widest text-ds-comment"`

export default function TypographyPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">01.02</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Typography</h1>
        <p className="text-ds-comment text-sm max-w-2xl">
          Two typefaces — <strong className="text-ds-fg">system sans</strong> for body and headings,{' '}
          <strong className="text-ds-fg">JetBrains Mono</strong> for code, labels, and metadata.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Sans Scale</h2>
        <div className="space-y-1 divide-y divide-ds-current">
          {SCALES.map(({ size, cls, label, weight, sample }) => (
            <div key={size} className="flex items-baseline gap-6 py-3 overflow-hidden">
              <div className="w-16 flex-shrink-0">
                <span className="font-mono text-[10px] text-ds-comment">{label}</span>
                <span className="font-mono text-[9px] text-ds-current block">{size}</span>
              </div>
              <span className={`${cls} ${weight} text-ds-fg leading-none truncate`}>{sample}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Mono Scale · JetBrains Mono</h2>
        <div className="space-y-1 divide-y divide-ds-current">
          {MONO_SCALES.map(({ size, label, sample }) => (
            <div key={size} className="flex items-baseline gap-6 py-3 overflow-hidden">
              <div className="w-24 flex-shrink-0">
                <span className="font-mono text-[10px] text-ds-comment">{label}</span>
                <span className="font-mono text-[9px] text-ds-current block">{size}</span>
              </div>
              <code className="font-mono text-ds-cyan truncate" style={{ fontSize: size }}>{sample}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Label Pattern</h2>
        <div className="border border-ds-current rounded-ds-lg p-6 bg-ds-panel space-y-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ds-comment mb-2">Section heading</p>
            <p className="text-ds-fg text-sm">Used throughout the docs, sidebar, and component headers.</p>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-ds-comment mb-2">Micro label · 9px</p>
            <p className="text-ds-fg text-sm">Code num badges, nav group numbers, status dots.</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Usage</h2>
        <CodeBlock code={USAGE} lang="css" />
      </section>
    </div>
  )
}
