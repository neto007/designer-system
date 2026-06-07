import { Textarea } from '@shieldai/ds'
import { ComponentBlock, DocSection, PlaygroundBlock } from '../../components/docs'
import type { ControlValues } from '../../components/docs'

const CODE = `import { Textarea } from '@shieldai/ds'

<Textarea placeholder="default textarea" rows={3} />
<Textarea variant="error"      placeholder="error state" rows={3} />
<Textarea variant="neu"        placeholder="neobrutalism" rows={3} />
<Textarea variant="neu-purple" placeholder="neu purple" rows={3} />

// Resize control
<Textarea resize="none"       placeholder="no resize" />
<Textarea resize="horizontal" placeholder="horizontal only" />
<Textarea resize="both"       placeholder="both axes" />`

const PROPS = [
  { name: 'variant', type: '"default" | "focus" | "error" | "neu" | "neu-purple"', default: '"default"', description: 'Visual style variant' },
  { name: 'resize', type: '"none" | "vertical" | "horizontal" | "both"', default: '"vertical"', description: 'Resize handle direction' },
  { name: 'rows', type: 'number', description: 'Initial visible row count' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea' },
]

const PLAYGROUND_CONTROLS = [
  { type: 'select' as const, key: 'variant', label: 'variant', default: 'default', options: ['default', 'error', 'neu', 'neu-purple'] },
  { type: 'select' as const, key: 'resize', label: 'resize', default: 'vertical', options: ['none', 'vertical', 'horizontal', 'both'] },
  { type: 'text' as const, key: 'placeholder', label: 'placeholder', default: 'Enter your text here…' },
  { type: 'boolean' as const, key: 'disabled', label: 'disabled', default: false },
]

function generateCode(v: ControlValues): string {
  const parts: string[] = []
  if (v.variant !== 'default') parts.push(`variant="${v.variant}"`)
  if (v.resize !== 'vertical') parts.push(`resize="${v.resize}"`)
  if (v.placeholder !== 'Enter your text here…') parts.push(`placeholder="${v.placeholder}"`)
  if (v.disabled) parts.push('disabled')
  const attrs = parts.length ? ' ' + parts.join(' ') : ''
  return `<Textarea${attrs} rows={3} />`
}

export default function TextareaPage() {
  return (
    <ComponentBlock
      num="02.06"
      title="Textarea"
      tag="5 variants · resize control"
      description="Multi-line text input that mirrors Input variants. Adds a resize axis prop to control user resizability."
      preview={
        <div className="space-y-3 max-w-sm w-full">
          <Textarea placeholder="default textarea" rows={3} />
          <Textarea variant="error" placeholder="error state" rows={3} />
          <Textarea variant="neu" placeholder="neobrutalism" rows={3} />
          <Textarea variant="neu-purple" placeholder="neu purple" rows={3} />
        </div>
      }
      code={CODE}
      filename="Textarea.tsx"
      props={PROPS}
    >
      <DocSection title="Interactive Playground">
        <p className="text-ds-comment text-[13px] leading-relaxed mb-4">
          Tweak props on the right and see the result live. The generated code updates instantly.
        </p>
        <PlaygroundBlock
          controls={PLAYGROUND_CONTROLS}
          render={(v) => (
            <Textarea
              variant={v.variant as 'default' | 'error' | 'neu' | 'neu-purple'}
              resize={v.resize as 'none' | 'vertical' | 'horizontal' | 'both'}
              placeholder={v.placeholder as string}
              disabled={v.disabled as boolean}
              rows={3}
            />
          )}
          generateCode={generateCode}
          filename="Textarea.tsx"
        />
      </DocSection>
    </ComponentBlock>
  )
}