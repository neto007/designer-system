import { useState } from 'react'
import { Flashbar, Button } from '@shieldai/ds'
import type { FlashbarItem } from '@shieldai/ds'
import { ComponentBlock, DocSection, PlaygroundBlock } from '../../components/docs'
import type { ControlValues } from '../../components/docs'

const CODE = `import { Flashbar } from '@shieldai/ds'
import type { FlashbarItem } from '@shieldai/ds'

const [items, setItems] = useState<FlashbarItem[]>([
  {
    id: '1',
    type: 'info',
    header: 'New agent version available',
    content: 'Update to v2.4.1 for improved tool routing.',
    dismissible: true,
    onDismiss: () => setItems(prev => prev.filter(i => i.id !== '1')),
  },
  {
    id: '2',
    type: 'loading',
    header: 'Deploying agent fleet...',
    content: '3 of 8 agents initialized.',
  },
  {
    id: '3',
    type: 'success',
    header: 'Workflow complete',
    content: 'All 12 tasks finished in 4.2s.',
    dismissible: true,
    onDismiss: () => setItems(prev => prev.filter(i => i.id !== '3')),
  },
  {
    id: '4',
    type: 'error',
    header: 'API key invalid',
    content: 'Rotate your key and redeploy.',
    dismissible: true,
    onDismiss: () => setItems(prev => prev.filter(i => i.id !== '4')),
  },
])

<Flashbar items={items} />`

const PROPS = [
  { name: 'items', type: 'FlashbarItem[]', required: true, description: 'List of flash messages to display' },
]

const PLAYGROUND_CONTROLS = [
  { type: 'select' as const, key: 'type', label: 'type', default: 'info', options: ['info', 'success', 'warning', 'error', 'loading'] },
  { type: 'text' as const, key: 'header', label: 'header', default: 'System Update' },
  { type: 'text' as const, key: 'content', label: 'content', default: 'The system will be updated in 5 minutes.' },
  { type: 'boolean' as const, key: 'dismissible', label: 'dismissible', default: true },
]

function generateCode(v: ControlValues): string {
  const parts: string[] = []
  if (v.type !== 'info') parts.push(`type="${v.type}"`)
  if (v.header !== 'System Update') parts.push(`header="${v.header}"`)
  if (v.content !== 'The system will be updated in 5 minutes.') parts.push(`content="${v.content}"`)
  if (!v.dismissible) parts.push('dismissible={false}')
  const attrs = parts.length ? `\n    ${parts.join('\n    ')}` : ''
  const dismissLine = v.dismissible && !parts.includes('dismissible={false}') ? '\n    dismissible: true,' : ''
  return `<Flashbar\n  items={[{\n    id: 'pg',${dismissLine}${attrs}\n  }]}\n/>`
}

const INITIAL: FlashbarItem[] = [
  { id: '1', type: 'info',    header: 'New agent version available', content: 'Update to v2.4.1 for improved tool routing.', dismissible: true },
  { id: '2', type: 'loading', header: 'Deploying agent fleet...', content: '3 of 8 agents initialized.' },
  { id: '3', type: 'success', header: 'Workflow complete', content: 'All 12 tasks finished in 4.2s.', dismissible: true },
  { id: '4', type: 'warning', header: 'Rate limit at 80%', content: 'Slow down requests to avoid throttling.', dismissible: true },
  { id: '5', type: 'error',   header: 'API key invalid', content: 'Rotate your key and redeploy.', dismissible: true },
]

function Demo() {
  const [items, setItems] = useState<FlashbarItem[]>(INITIAL)
  const dismiss = (id: string) => setItems((p) => p.filter((i) => i.id !== id))

  const mapped = items.map((item) =>
    item.dismissible ? { ...item, onDismiss: () => dismiss(item.id) } : item
  )

  return (
    <div className="w-full space-y-4">
      <Flashbar items={mapped} />
      {items.length === 0 && (
        <Button size="sm" variant="outline" onClick={() => setItems(INITIAL)}>Reset</Button>
      )}
    </div>
  )
}

export default function FlashbarPage() {
  return (
    <ComponentBlock
      num="02.29"
      title="Flashbar"
      tag="5 types · dismissible · loading spinner"
      description="Stacked notification bar for page-level system messages. Unlike Toast (ephemeral), Flashbar items persist until dismissed. Loading type spins the icon."
      preview={<Demo />}
      code={CODE}
      filename="Flashbar.tsx"
      props={PROPS}
    >
      <DocSection title="Interactive Playground">
        <p className="text-ds-comment text-[13px] leading-relaxed mb-4">
          Tweak props on the right and see the result live. The generated code updates instantly.
        </p>
        <PlaygroundBlock
          controls={PLAYGROUND_CONTROLS}
          render={(v) => (
            <Flashbar
              items={[{
                id: 'playground-flash',
                type: v.type as 'info' | 'success' | 'warning' | 'error' | 'loading',
                header: v.header as string,
                content: v.content as string,
                dismissible: v.dismissible as boolean,
              }]}
            />
          )}
          generateCode={generateCode}
          filename="Flashbar.tsx"
        />
      </DocSection>
    </ComponentBlock>
  )
}
