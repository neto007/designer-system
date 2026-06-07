import { Divider } from '@shieldai/ds'
import { ComponentBlock, DocSection, PlaygroundBlock } from '../../components/docs'
import type { ControlValues } from '../../components/docs'

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

const PLAYGROUND_CONTROLS = [
  { type: 'select' as const, key: 'orientation', label: 'orientation', default: 'horizontal', options: ['horizontal', 'vertical'] },
  { type: 'text' as const, key: 'label', label: 'label', default: '' },
]

function generateCode(v: ControlValues): string {
  const parts: string[] = []
  if (v.label) parts.push(`label="${v.label}"`)
  if (v.orientation !== 'horizontal') parts.push(`orientation="${v.orientation}"`)
  const attrs = parts.length ? ` ${parts.join(' ')}` : ''
  const code = `<Divider${attrs} />`
  if (v.orientation === 'vertical') {
    return `<div className="flex items-center h-24">\n  ${code}\n</div>`
  }
  return code
}

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
    >
      <DocSection title="Interactive Playground">
        <p className="text-ds-comment text-[13px] leading-relaxed mb-4">
          Tweak props on the right and see the result live. The generated code updates instantly.
        </p>
        <PlaygroundBlock
          controls={PLAYGROUND_CONTROLS}
          render={(v) => (
            <div className={v.orientation === 'vertical' ? 'h-24' : ''}>
              <Divider
                orientation={v.orientation as 'horizontal' | 'vertical'}
                label={v.label as string}
              />
            </div>
          )}
          generateCode={generateCode}
          filename="Divider.tsx"
        />
      </DocSection>
    </ComponentBlock>
  )
}
