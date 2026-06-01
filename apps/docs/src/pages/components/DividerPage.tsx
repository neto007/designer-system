import { Divider } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { Divider } from '@shieldai/ds'

// Horizontal (default)
<Divider />

// With label
<Divider label="OR" />
<Divider label="Neobrutalism" />

// Vertical (in a flex container)
<div className="flex items-center h-8 gap-4">
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`

const PROPS = [
  { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Divider direction' },
  { name: 'label', type: 'string', description: 'Text label centered on a horizontal divider' },
  { name: 'className', type: 'string', description: 'Additional classes' },
]

export default function DividerPage() {
  return (
    <ComponentBlock
      num="02.18"
      title="Divider"
      tag="horizontal · vertical · label"
      description="Visual separator. Horizontal variant supports an optional centered label using the monospace uppercase label pattern."
      preview={
        <div className="space-y-6 w-full max-w-sm">
          <Divider />
          <Divider label="OR" />
          <Divider label="Configuration" />
          <div className="flex items-center h-8 gap-4">
            <span className="text-ds-comment text-sm">Left</span>
            <Divider orientation="vertical" />
            <span className="text-ds-comment text-sm">Right</span>
          </div>
        </div>
      }
      code={CODE}
      filename="Divider.tsx"
      props={PROPS}
    />
  )
}
