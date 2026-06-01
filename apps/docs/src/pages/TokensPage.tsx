import { CodeBlock } from '@shieldai/ds'

const CSS_TOKENS = `/* Install — tokens are auto-injected via the package barrel */
import '@shieldai/ds'

/* Or reference individually in CSS */
:root {
  /* Surfaces */
  --ds-bg:        #050101;
  --ds-panel:     #0b0b11;
  --ds-current:   #1a1b26;
  --ds-selection: #282a36;

  /* Text */
  --ds-fg:      #f8f8f2;
  --ds-comment: #6272a4;

  /* Signal palette */
  --ds-purple: #bd93f9;
  --ds-green:  #50fa7b;
  --ds-cyan:   #8be9fd;
  --ds-pink:   #ff79c6;
  --ds-orange: #ffb86c;
  --ds-yellow: #f1fa8c;
  --ds-red:    #ff5555;

  /* Spacing (4px base) */
  --ds-s-1: 4px;   --ds-s-2: 8px;
  --ds-s-3: 12px;  --ds-s-4: 16px;
  --ds-s-6: 24px;  --ds-s-8: 32px;
  --ds-s-12: 48px; --ds-s-16: 64px;

  /* Radius */
  --ds-r-sm: 2px; --ds-r-md: 4px;
  --ds-r-lg: 8px; --ds-r-xl: 12px;
  --ds-r-pill: 9999px;

  /* Motion */
  --ds-dur-fast: 150ms;
  --ds-dur-default: 200ms;
  --ds-dur-slow: 300ms;
  --ds-ease-out:    cubic-bezier(.4,0,.2,1);
  --ds-ease-spring: cubic-bezier(.34,1.56,.64,1);

  /* Z-index */
  --ds-z-dropdown: 50; --ds-z-sticky: 60;
  --ds-z-overlay:  70; --ds-z-modal:  80;
  --ds-z-toast:    90; --ds-z-tooltip: 100;
}`

const TAILWIND_CONFIG = `// tailwind.config.ts
import { shieldaiPreset } from '@shieldai/ds/tokens/tailwind-preset'

export default {
  presets: [shieldaiPreset],
  content: ['./src/**/*.{ts,tsx}'],
}

/* Available classes:
   bg-ds-bg        text-ds-fg       border-ds-current
   bg-ds-panel     text-ds-comment  border-ds-purple
   text-ds-purple  text-ds-green    text-ds-cyan
   rounded-ds-sm   rounded-ds-md    rounded-ds-lg
   shadow-glow     shadow-neu       shadow-neu-purple
   z-modal         z-toast          z-tooltip
   duration-fast   duration-slow    animate-shimmer
*/`

const TS_TOKENS = `import { ds } from '@shieldai/ds'

// Typed token object — use in style= props or JS logic
const style = {
  color: ds.purple,
  background: ds.panel,
  borderRadius: ds.r.lg,
}

// Agent type config
import { AGENT_TYPES } from '@shieldai/ds'

const config = AGENT_TYPES.llm
// { color: 'text-ds-green', hex: '#50fa7b', label: 'LLM', icon: Code, ... }`

const GROUPS = [
  {
    label: 'Surface scale',
    tokens: [
      { name: 'ds-bg', val: '#050101', role: 'Page canvas' },
      { name: 'ds-panel', val: '#0b0b11', role: 'Cards · Dialogs' },
      { name: 'ds-current', val: '#1a1b26', role: 'Borders · Hover' },
      { name: 'ds-selection', val: '#282a36', role: 'Selection · Raised' },
    ],
  },
  {
    label: 'Text',
    tokens: [
      { name: 'ds-fg', val: '#f8f8f2', role: 'Primary' },
      { name: 'ds-comment', val: '#6272a4', role: 'Muted' },
    ],
  },
  {
    label: 'Signal palette',
    tokens: [
      { name: 'ds-purple', val: '#bd93f9', role: 'Brand · LLM' },
      { name: 'ds-green',  val: '#50fa7b', role: 'Success · User' },
      { name: 'ds-cyan',   val: '#8be9fd', role: 'Info · Workflow' },
      { name: 'ds-pink',   val: '#ff79c6', role: 'Parallel' },
      { name: 'ds-orange', val: '#ffb86c', role: 'Loop · Tool' },
      { name: 'ds-yellow', val: '#f1fa8c', role: 'Sequential' },
      { name: 'ds-red',    val: '#ff5555', role: 'Error · Task' },
    ],
  },
]

export default function TokensPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">00.03</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Tokens</h1>
        <p className="text-ds-comment text-sm max-w-2xl">
          Single source of truth — CSS custom properties consumed by both Tailwind and vanilla CSS. Auto-injected when you import <code className="font-mono text-ds-cyan text-xs">@shieldai/ds</code>.
        </p>
      </div>

      {/* Token table */}
      <section className="space-y-6">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Reference</h2>
        {GROUPS.map(({ label, tokens }) => (
          <div key={label}>
            <p className="font-mono text-[9px] uppercase tracking-widest text-ds-current mb-2">{label}</p>
            <div className="rounded-ds-md border border-ds-current overflow-hidden">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-ds-current bg-ds-panel">
                    <th className="text-left px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-ds-comment">Token</th>
                    <th className="text-left px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-ds-comment">Value</th>
                    <th className="text-left px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-ds-comment">Swatch</th>
                    <th className="text-left px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-ds-comment">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map(({ name, val, role }, i) => (
                    <tr key={name} className={i % 2 === 0 ? 'bg-ds-bg' : 'bg-ds-panel'}>
                      <td className="px-4 py-2">
                        <code className="font-mono text-[11px] text-ds-purple">--{name}</code>
                      </td>
                      <td className="px-4 py-2">
                        <code className="font-mono text-[11px] text-ds-comment">{val}</code>
                      </td>
                      <td className="px-4 py-2">
                        <div className="w-5 h-5 rounded border border-ds-current" style={{ backgroundColor: val }} />
                      </td>
                      <td className="px-4 py-2 text-ds-comment text-[12px]">{role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">CSS Custom Properties</h2>
        <CodeBlock code={CSS_TOKENS} lang="css" filename="tokens.css" showLineNumbers />
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Tailwind Config</h2>
        <CodeBlock code={TAILWIND_CONFIG} lang="ts" filename="tailwind.config.ts" />
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">TypeScript Tokens</h2>
        <CodeBlock code={TS_TOKENS} lang="ts" filename="usage.ts" />
      </section>
    </div>
  )
}
