import { useState } from 'react'
import { Flashbar, Button } from '@shieldai/ds'
import type { FlashbarItem } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

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
    />
  )
}
