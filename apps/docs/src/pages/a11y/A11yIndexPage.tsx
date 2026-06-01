import { Badge, CodeBlock, Divider } from '@shieldai/ds'
import { CheckCircle, XCircle } from 'lucide-react'

// ─── Shared primitives ────────────────────────────────────────────────────────

function DoBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-ds-md border border-ds-green/30 bg-ds-green/5 p-4 space-y-2">
      <div className="flex items-center gap-1.5 text-ds-green text-[10px] font-black uppercase tracking-widest">
        <CheckCircle className="h-3.5 w-3.5" /> DO
      </div>
      {children}
    </div>
  )
}

function DontBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-ds-md border border-ds-red/30 bg-ds-red/5 p-4 space-y-2">
      <div className="flex items-center gap-1.5 text-ds-red text-[10px] font-black uppercase tracking-widest">
        <XCircle className="h-3.5 w-3.5" /> DON'T
      </div>
      {children}
    </div>
  )
}

const CONTRAST = [
  { fg: 'ds-fg (#f8f8f2)',      bg: 'ds-bg (#050101)',    ratio: '17.5:1', wcag: 'AAA' },
  { fg: 'ds-purple (#bd93f9)',  bg: 'ds-bg (#050101)',    ratio: '9.8:1',  wcag: 'AAA' },
  { fg: 'ds-green (#50fa7b)',   bg: 'ds-bg (#050101)',    ratio: '14.2:1', wcag: 'AAA' },
  { fg: 'ds-comment (#6272a4)', bg: 'ds-bg (#050101)',    ratio: '4.7:1',  wcag: 'AA' },
  { fg: 'ds-comment (#6272a4)', bg: 'ds-panel (#0b0b11)', ratio: '4.3:1',  wcag: 'AA' },
  { fg: 'ds-red (#ff5555)',     bg: 'ds-bg (#050101)',    ratio: '5.6:1',  wcag: 'AA' },
]

const KEYBOARD_MAP = [
  { component: 'Button',          keys: ['Enter', 'Space'],           action: 'Activate' },
  { component: 'Dialog',          keys: ['Esc'],                      action: 'Close' },
  { component: 'Select / Popover',keys: ['↑ ↓', 'Enter', 'Esc'],    action: 'Navigate / Select / Close' },
  { component: 'Tabs',            keys: ['← →', 'Home', 'End'],      action: 'Switch tab' },
  { component: 'Checkbox',        keys: ['Space'],                    action: 'Toggle' },
  { component: 'Slider',          keys: ['← → ↑ ↓', 'Home', 'End'], action: 'Move thumb' },
  { component: 'Table (rows)',    keys: ['Space'],                    action: 'Select / deselect row' },
]

export default function A11yIndexPage() {
  return (
    <div className="space-y-12 max-w-3xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">07.04</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Accessibility</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          WCAG 2.1 AA baseline. All interactive components use Radix UI primitives for correct ARIA roles, keyboard navigation, and focus management.
        </p>
      </div>

      {/* Focus management */}
      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Focus management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DoBlock>
            <p className="text-xs text-ds-fg">Always use <code className="text-ds-purple">focus-visible:ring-2 focus-visible:ring-ds-purple</code> on interactive elements.</p>
          </DoBlock>
          <DontBlock>
            <p className="text-xs text-ds-fg">Never use <code className="text-ds-red">outline: none</code> without a visible replacement focus style.</p>
          </DontBlock>
        </div>
        <CodeBlock
          code={`// Focus ring — built into every DS component
className="focus-visible:ring-2 focus-visible:ring-ds-purple focus-visible:ring-offset-2 focus-visible:ring-offset-ds-bg"`}
          lang="tsx"
          showLineNumbers={false}
        />
      </section>

      <Divider />

      {/* ARIA */}
      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">ARIA requirements</h2>
        <div className="space-y-2">
          {[
            { rule: 'Icon-only buttons', req: 'Always add aria-label', code: '<Button size="icon" aria-label="Close dialog"><X /></Button>' },
            { rule: 'Form fields',       req: 'Wire id to htmlFor via FormField', code: '<FormField id="name" label="Name"><Input id="name" /></FormField>' },
            { rule: 'Live regions',      req: 'Wrap dynamic content in aria-live', code: '<div aria-live="polite" aria-atomic="true">{status}</div>' },
            { rule: 'Images',            req: 'alt="" for decorative, descriptive for informative', code: '<img alt="Agent status diagram" />' },
          ].map((row) => (
            <div key={row.rule} className="rounded-ds-md border border-ds-current bg-ds-panel p-3 space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="solid-purple" className="text-[9px]">{row.rule}</Badge>
                <span className="text-xs text-ds-comment">{row.req}</span>
              </div>
              <code className="text-[10px] text-ds-green font-mono">{row.code}</code>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Keyboard map */}
      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Keyboard map</h2>
        <div className="overflow-x-auto rounded-ds-lg border border-ds-current bg-ds-panel">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ds-current bg-ds-bg">
                {['Component', 'Keys', 'Action'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-ds-comment">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {KEYBOARD_MAP.map((row) => (
                <tr key={row.component} className="border-b border-ds-current/30 last:border-0">
                  <td className="px-4 py-2.5 text-ds-fg font-medium text-xs">{row.component}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {row.keys.map((k) => (
                        <kbd key={k} className="font-mono text-[10px] border border-ds-current rounded px-1.5 py-0.5 text-ds-comment">{k}</kbd>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-ds-comment">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Divider />

      {/* Contrast table */}
      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Color contrast — WCAG 2.1</h2>
        <div className="overflow-x-auto rounded-ds-lg border border-ds-current bg-ds-panel">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ds-current bg-ds-bg">
                {['Foreground', 'Background', 'Ratio', 'WCAG'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-ds-comment">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CONTRAST.map((row) => (
                <tr key={row.fg + row.bg} className="border-b border-ds-current/30 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-[11px] text-ds-fg">{row.fg}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-ds-comment">{row.bg}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-ds-cyan">{row.ratio}</td>
                  <td className="px-4 py-2.5">
                    <Badge
                      variant={row.wcag === 'AAA' ? 'solid-green' : 'cyan'}
                      className="text-[9px] font-mono"
                    >
                      {row.wcag}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
