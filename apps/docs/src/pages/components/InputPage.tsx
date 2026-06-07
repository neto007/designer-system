import { Input } from '@shieldai/ds'
import { Shield, Search } from 'lucide-react'
import { ComponentBlock, DocSection, PlaygroundBlock } from '../../components/docs'
import type { ControlValues } from '../../components/docs'

const CODE = `import { Input } from '@shieldai/ds'

<Input placeholder="default" />
<Input variant="focus"     placeholder="focus ring" />
<Input variant="error"     placeholder="error state" />
<Input variant="neu"       placeholder="neobrutalism" />
<Input variant="neu-purple" placeholder="neu purple" />

// Icon slots
<Input leftElement={<Search />} placeholder="search agents..." />
<Input rightElement={<Shield />} placeholder="with right icon" />`

const PROPS = [
  { name: 'variant', type: '"default" | "focus" | "error" | "neu" | "neu-purple"', default: '"default"', description: 'Visual style variant' },
  { name: 'leftElement', type: 'ReactNode', description: 'Element rendered inside the left side of the input' },
  { name: 'rightElement', type: 'ReactNode', description: 'Element rendered inside the right side of the input' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input' },
]

const CONTROLS = [
  { type: 'select' as const, key: 'variant', label: 'variant', default: 'default', options: ['default', 'focus', 'error', 'neu', 'neu-purple'] },
  { type: 'text' as const, key: 'placeholder', label: 'placeholder', default: 'Type something...' },
  { type: 'boolean' as const, key: 'disabled', label: 'disabled', default: false },
]

function genCode(v: ControlValues): string {
  const parts: string[] = []
  if (v.variant !== 'default') parts.push(`variant="${v.variant}"`)
  parts.push(`placeholder="${v.placeholder}"`)
  if (v.disabled) parts.push('disabled')
  return `<Input ${parts.join(' ')} />`
}

export default function InputPage() {
  return (
    <ComponentBlock
      num="02.05"
      title="Input"
      tag="5 variants · icon slots"
      description="Single-line text input with left and right element slots for icons, labels, and actions. Supports neobrutalism styling for modal and form contexts."
      preview={
        <div className="space-y-3 max-w-sm w-full">
          <Input placeholder="default input" />
          <Input variant="error" placeholder="error state" />
          <Input variant="neu" placeholder="neobrutalism" />
          <Input variant="neu-purple" placeholder="neu purple" />
          <Input leftElement={<Search className="h-4 w-4" />} placeholder="search agents..." />
          <Input rightElement={<Shield className="h-4 w-4" />} placeholder="with right icon" />
        </div>
      }
      code={CODE}
      filename="Input.tsx"
      props={PROPS}
    >
      <DocSection title="Interactive Playground">
        <PlaygroundBlock
          controls={CONTROLS}
          render={(v) => (
            <div className="w-64">
              <Input
                variant={v.variant as Parameters<typeof Input>[0]['variant']}
                placeholder={v.placeholder as string}
                disabled={v.disabled as boolean}
              />
            </div>
          )}
          generateCode={genCode}
          filename="Input.tsx"
        />
      </DocSection>
    </ComponentBlock>
  )
}
