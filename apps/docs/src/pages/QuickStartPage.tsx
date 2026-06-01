import { CodeBlock } from '@shieldai/ds'

const INSTALL = `pnpm add @shieldai/ds`

const SETUP = `// tailwind.config.ts
import { shieldaiPreset } from '@shieldai/ds/tokens/tailwind-preset'

export default {
  presets: [shieldaiPreset],
  content: ['./src/**/*.{ts,tsx}'],
}`

const PROVIDERS = `// main.tsx
import '@shieldai/ds'                         // injects CSS tokens
import { ToastProvider, TooltipProvider } from '@shieldai/ds'

createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <TooltipProvider delayDuration={300}>
      <App />
    </TooltipProvider>
  </ToastProvider>
)`

const USAGE = `import { Button, Badge, Avatar } from '@shieldai/ds'

export function AgentCard({ name, type }: Props) {
  return (
    <div className="flex items-center gap-3 p-4 bg-ds-panel rounded-ds-xl border border-ds-current">
      <Avatar variant="bot" initials={name[0]} />
      <div className="flex-1">
        <p className="font-semibold text-ds-fg text-sm">{name}</p>
        <Badge variant="purple" dot className="mt-1">{type}</Badge>
      </div>
      <Button variant="neu-purple" size="sm">Run</Button>
    </div>
  )
}`

export default function QuickStartPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">00.02</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Quick Start</h1>
        <p className="text-ds-comment text-sm max-w-2xl">
          Get up and running with the ShieldAI Design System in under 5 minutes.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">1. Install</h2>
        <CodeBlock code={INSTALL} lang="bash" />
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">2. Configure Tailwind</h2>
        <CodeBlock code={SETUP} lang="ts" filename="tailwind.config.ts" />
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">3. Add Providers</h2>
        <p className="text-ds-comment text-sm">Wrap your app once with the required providers.</p>
        <CodeBlock code={PROVIDERS} lang="tsx" filename="main.tsx" />
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">4. Use Components</h2>
        <CodeBlock code={USAGE} lang="tsx" filename="AgentCard.tsx" showLineNumbers />
      </section>
    </div>
  )
}
