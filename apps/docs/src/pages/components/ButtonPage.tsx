import { Button } from '@shieldai/ds'
import { Terminal, Zap } from 'lucide-react'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Button } from '@shieldai/ds'

// Dracula-neon axis
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Neobrutalism axis
<Button variant="neu">Neu</Button>
<Button variant="neu-purple">Run Agent</Button>
<Button variant="neu-green">Save</Button>
<Button variant="neu-pink">Cancel</Button>
<Button variant="neu-red">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="terminal"><Terminal /></Button>

// States
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>
<Button leftIcon={<Zap />}>With Icon</Button>`

const PROPS = [
  { name: 'variant', type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "neu" | "neu-purple" | "neu-green" | "neu-pink" | "neu-red"', default: '"default"', description: 'Visual style variant' },
  { name: 'size', type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: 'Button size' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows spinner and disables interaction' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button' },
  { name: 'leftIcon', type: 'ReactNode', description: 'Icon rendered before label' },
  { name: 'rightIcon', type: 'ReactNode', description: 'Icon rendered after label' },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Delegates rendering to child (Radix Slot)' },
]

export default function ButtonPage() {
  return (
    <ComponentBlock
      num="02.01"
      title="Button"
      tag="2 axes · 11 variants · 4 sizes"
      description="Two visual axes — Dracula-neon for interface actions and Neobrutalism for emphasis and destructive flows. Supports loading state, icon slots, and polymorphic rendering."
      preview={
        <div className="space-y-4 w-full">
          <PreviewRow label="axis_01 · dracula_neon">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </PreviewRow>
          <PreviewRow label="axis_02 · neobrutalism">
            <Button variant="neu">Neu</Button>
            <Button variant="neu-purple">Run Agent</Button>
            <Button variant="neu-green">Save</Button>
            <Button variant="neu-pink">Cancel</Button>
            <Button variant="neu-red">Delete</Button>
          </PreviewRow>
          <PreviewRow label="sizes">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="terminal"><Terminal className="h-4 w-4" /></Button>
          </PreviewRow>
          <PreviewRow label="states">
            <Button leftIcon={<Zap className="h-4 w-4" />}>With Icon</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="Button.tsx"
      props={PROPS}
    />
  )
}
