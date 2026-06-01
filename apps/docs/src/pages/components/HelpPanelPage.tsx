import { useState } from 'react'
import { HelpPanel, Button, Badge } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { HelpPanel } from '@shieldai/ds'

const [open, setOpen] = useState(false)

<div className="flex h-96">
  <main className="flex-1 p-6">
    <Button onClick={() => setOpen(true)}>Open help</Button>
  </main>

  <HelpPanel
    open={open}
    onClose={() => setOpen(false)}
    title="Agent Types"
    width={320}
  >
    <p>Contextual documentation goes here...</p>
  </HelpPanel>
</div>`

const PROPS = [
  { name: 'open', type: 'boolean', default: '—', description: 'Whether the panel is visible' },
  { name: 'onClose', type: '() => void', default: '—', description: 'Called when the × button is clicked' },
  { name: 'title', type: 'string', default: '"Help"', description: 'Panel heading' },
  { name: 'width', type: 'number | string', default: '320', description: 'Panel width — collapses to 0 when closed' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Documentation content' },
]

function LiveDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full border border-ds-current rounded-ds-xl overflow-hidden bg-ds-bg flex" style={{ height: 360 }}>
      <div className="flex-1 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ds-fg">Agent configuration</h2>
          <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
            {open ? 'Close help' : 'Open help'}
          </Button>
        </div>
        <div className="space-y-3 text-xs text-ds-comment">
          <p>Configure the agent type, execution mode, and resource limits.</p>
          <div className="flex gap-2">
            <Badge variant="purple">llm</Badge>
            <Badge variant="green">sequential</Badge>
            <Badge variant="cyan">workflow</Badge>
          </div>
        </div>
      </div>

      <HelpPanel
        open={open}
        onClose={() => setOpen(false)}
        title="Agent Types"
        width={260}
      >
        <div className="space-y-4 text-xs">
          <div>
            <div className="font-semibold text-ds-purple mb-1">LLM</div>
            <p className="text-ds-comment">Language model node. Routes natural-language inputs to a configured model and returns structured output.</p>
          </div>
          <div>
            <div className="font-semibold text-ds-yellow mb-1">Sequential</div>
            <p className="text-ds-comment">Runs steps one at a time in order. Each step receives the output of the previous step as its input.</p>
          </div>
          <div>
            <div className="font-semibold text-ds-cyan mb-1">Workflow</div>
            <p className="text-ds-comment">Orchestrates a full pipeline. Can contain any combination of other agent types as sub-nodes.</p>
          </div>
          <div>
            <div className="font-semibold text-ds-pink mb-1">Parallel</div>
            <p className="text-ds-comment">Forks execution into concurrent branches. Results are joined before the next node runs.</p>
          </div>
        </div>
      </HelpPanel>
    </div>
  )
}

export default function HelpPanelPage() {
  return (
    <ComponentBlock
      num="02.HP"
      title="Help Panel"
      tag="contextual docs · right-anchored · collapsible"
      description="Right-anchored contextual documentation sidecar. Slides open/closed by animating width. Use it alongside forms or configuration panels to surface inline help without leaving the page."
      preview={<LiveDemo />}
      code={CODE}
      filename="HelpPanel.tsx"
      props={PROPS}
    />
  )
}
