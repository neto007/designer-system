import { useState } from 'react'
import { Button, CodeBlock } from '@shieldai/ds'

const DURATIONS = [
  { name: 'fast',    var: '--ds-dur-fast',    val: '150ms', desc: 'Micro-interactions, hover states' },
  { name: 'default', var: '--ds-dur-default', val: '200ms', desc: 'Standard transitions' },
  { name: 'slow',    var: '--ds-dur-slow',    val: '300ms', desc: 'Overlays, slide-ins, modals' },
]

const EASINGS = [
  { name: 'ease-out',   var: '--ds-ease-out',    val: 'cubic-bezier(.4,0,.2,1)',      desc: 'Standard UI easing' },
  { name: 'ease-spring', var: '--ds-ease-spring', val: 'cubic-bezier(.34,1.56,.64,1)', desc: 'Elastic overshoot for buttons' },
]

const KEYFRAMES = [
  { name: 'shimmer',     tw: 'animate-shimmer',     desc: 'Skeleton loading wave' },
  { name: 'pulse-glow',  tw: 'animate-pulse-glow',  desc: 'Status dot alive indicator' },
  { name: 'blink',       tw: 'animate-blink',       desc: 'Cursor / live indicator' },
  { name: 'wiggle',      tw: 'animate-wiggle',      desc: 'Error shake feedback' },
  { name: 'spin-slow',   tw: 'animate-spin-slow',   desc: '3s rotation for loading states' },
]

const USAGE = `/* Duration tokens */
transition-duration: var(--ds-dur-fast);    /* 150ms */
transition-duration: var(--ds-dur-default); /* 200ms */

/* Easing tokens */
transition-timing-function: var(--ds-ease-out);
transition-timing-function: var(--ds-ease-spring);

/* Tailwind shorthands */
className="transition-colors duration-fast"
className="transition-transform duration-slow ease-spring"

/* Keyframe animations */
className="animate-shimmer"
className="animate-pulse-glow"
className="animate-wiggle"`

export default function MotionPage() {
  const [demo, setDemo] = useState<string | null>(null)

  const trigger = (name: string) => {
    setDemo(null)
    setTimeout(() => setDemo(name), 10)
    setTimeout(() => setDemo(null), 1000)
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">01.05</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Motion</h1>
        <p className="text-ds-comment text-sm max-w-2xl">
          Duration and easing tokens keep transitions consistent. All values are CSS custom properties exposed as Tailwind utilities.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Durations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {DURATIONS.map(({ name, var: cssVar, val, desc }) => (
            <div key={name} className="border border-ds-current rounded-ds-lg p-4 bg-ds-panel space-y-2">
              <div className="flex items-baseline justify-between">
                <code className="font-mono text-sm text-ds-purple font-bold">{val}</code>
                <code className="font-mono text-[9px] text-ds-comment">duration-{name}</code>
              </div>
              <code className="font-mono text-[10px] text-ds-cyan block">{cssVar}</code>
              <p className="text-[11px] text-ds-comment">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Easings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EASINGS.map(({ name, var: cssVar, val, desc }) => (
            <div key={name} className="border border-ds-current rounded-ds-lg p-4 bg-ds-panel space-y-2">
              <code className="font-mono text-sm text-ds-purple font-bold">ease-{name.replace('ease-', '')}</code>
              <code className="font-mono text-[9px] text-ds-comment block">{val}</code>
              <code className="font-mono text-[10px] text-ds-cyan block">{cssVar}</code>
              <p className="text-[11px] text-ds-comment">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Keyframe Animations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {KEYFRAMES.map(({ name, tw, desc }) => (
            <div key={name} className="border border-ds-current rounded-ds-lg p-4 bg-ds-panel flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-ds-md bg-ds-purple flex-shrink-0 ${demo === name ? tw : ''}`}
                style={{ boxShadow: '0 0 10px rgba(189,147,249,.4)' }}
              />
              <div className="flex-1 min-w-0">
                <code className="font-mono text-[11px] text-ds-cyan">{tw}</code>
                <p className="text-[11px] text-ds-comment mt-0.5">{desc}</p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => trigger(name)}>Play</Button>
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
