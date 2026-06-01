import { Textarea } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

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
    />
  )
}
