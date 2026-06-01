import { Button, Badge, Divider } from '@shieldai/ds'
import { cn } from '@shieldai/ds'

function TouchTarget({ size, label, passing }: { size: string; label: string; passing: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          'border-2 rounded flex items-center justify-center text-[10px] font-mono text-ds-comment',
          passing ? 'border-ds-green bg-ds-green/10' : 'border-ds-red bg-ds-red/10'
        )}
        style={{ width: parseInt(size), height: parseInt(size) }}
      >
        {size}
      </div>
      <span className="text-[10px] text-ds-comment text-center max-w-[80px] leading-tight">{label}</span>
      <Badge variant={passing ? 'solid-green' : 'solid-red'} className="text-[9px]">
        {passing ? 'Pass' : 'Fail'}
      </Badge>
    </div>
  )
}

const COMPONENT_SIZES = [
  { component: 'Button sm',           height: 32,  width: 'auto', note: 'Minimum — use for dense toolbars only' },
  { component: 'Button md (default)', height: 40,  width: 'auto', note: 'Standard for most actions' },
  { component: 'Button lg',           height: 48,  width: 'auto', note: 'Primary CTAs, touch-primary surfaces' },
  { component: 'Button icon (sm)',    height: 32,  width: 32,     note: 'Add 8px visual padding around icon' },
  { component: 'Button icon (md)',    height: 40,  width: 40,     note: 'Meets 44×44 with padding' },
  { component: 'Checkbox',           height: 16,  width: 16,     note: 'Visual 16px, touch area 44×44 via label' },
  { component: 'Toggle / Switch',    height: 24,  width: 44,     note: 'Touch area extended to full label row' },
  { component: 'Slider thumb',       height: 16,  width: 16,     note: 'Touch area 44×44 via invisible hit target' },
  { component: 'Nav link',           height: 32,  width: 'auto', note: 'Minimum 44px for mobile nav items' },
]

export default function TouchTargetsPage() {
  return (
    <div className="space-y-12 max-w-3xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">07.05</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Touch Targets</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          WCAG 2.5.5 requires interactive targets to be at least 44×44px. This prevents mis-taps on touch devices and helps motor-impaired users.
        </p>
      </div>

      {/* Visual guide */}
      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Visual size guide</h2>
        <div className="flex flex-wrap items-end gap-8 p-6 border border-ds-current rounded-ds-lg bg-ds-panel">
          <TouchTarget size="24" label="Too small" passing={false} />
          <TouchTarget size="32" label="Minimal (dense)" passing={false} />
          <TouchTarget size="44" label="WCAG minimum" passing={true} />
          <TouchTarget size="48" label="Comfortable" passing={true} />
          <TouchTarget size="56" label="Primary CTA" passing={true} />
        </div>
        <p className="text-xs text-ds-comment">
          The 44px minimum applies to the <em>touch area</em>, not necessarily the visual size. Invisible padding can extend small visual targets.
        </p>
      </section>

      <Divider />

      {/* DS component sizes */}
      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Component touch sizes</h2>
        <div className="overflow-x-auto rounded-ds-lg border border-ds-current bg-ds-panel">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ds-current bg-ds-bg">
                {['Component', 'Height', 'Width', 'Notes'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-ds-comment">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPONENT_SIZES.map((row) => (
                <tr key={row.component} className="border-b border-ds-current/30 last:border-0">
                  <td className="px-4 py-2.5 text-xs font-medium text-ds-fg">{row.component}</td>
                  <td className="px-4 py-2.5">
                    <span className={`font-mono text-[11px] ${row.height >= 44 ? 'text-ds-green' : row.height >= 32 ? 'text-ds-orange' : 'text-ds-red'}`}>
                      {row.height}px
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-ds-comment">
                    {typeof row.width === 'number' ? `${row.width}px` : row.width}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-ds-comment">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Divider />

      {/* Rules */}
      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Rules</h2>
        <div className="space-y-3">
          {[
            { rule: 'Icon buttons', body: 'Use size="icon" variant. If icon is visually 16px, the button wrapper must be ≥44px. Always add aria-label.' },
            { rule: 'Checkbox + label', body: 'The label click area extends the touch target. Never show a naked checkbox without a label.' },
            { rule: 'Density modes', body: 'For compact/dense tables use sm buttons. Never override padding on interactive elements below 32px height.' },
            { rule: 'Mobile breakpoints', body: 'At sm: and below, increase all control sizes by one step (sm → md, md → lg).' },
          ].map((r) => (
            <div key={r.rule} className="rounded-ds-md border border-ds-current bg-ds-panel p-3 space-y-1">
              <div className="text-xs font-semibold text-ds-fg">{r.rule}</div>
              <p className="text-xs text-ds-comment">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live demo */}
      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Button sizes live</h2>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <Button size="sm">Small (32px)</Button>
            <Badge variant="solid-orange" className="text-[9px]">32px</Badge>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button size="md">Medium (40px)</Button>
            <Badge variant="solid-green" className="text-[9px]">40px</Badge>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button size="lg">Large (48px)</Button>
            <Badge variant="solid-green" className="text-[9px]">48px ✓ WCAG</Badge>
          </div>
        </div>
      </section>
    </div>
  )
}
