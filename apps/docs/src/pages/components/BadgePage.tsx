import { Badge } from '@shieldai/ds'
import { Bot } from 'lucide-react'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Badge } from '@shieldai/ds'

// Signal colors
<Badge variant="purple">Purple</Badge>
<Badge variant="green" dot>Live</Badge>
<Badge variant="cyan">Cyan</Badge>
<Badge variant="pink">Pink</Badge>
<Badge variant="orange">Warning</Badge>
<Badge variant="yellow">Yellow</Badge>
<Badge variant="red">Error</Badge>
<Badge variant="muted">Muted</Badge>

// Solid fills
<Badge variant="solid-green" dot>Live</Badge>
<Badge variant="solid-red">Error</Badge>
<Badge variant="solid-orange">Warning</Badge>
<Badge variant="solid-purple" icon={<Bot />}>LLM</Badge>`

const PROPS = [
  { name: 'variant', type: '"purple" | "green" | "cyan" | "pink" | "orange" | "yellow" | "red" | "muted" | "solid-green" | "solid-red" | "solid-orange" | "solid-purple"', default: '"purple"', description: 'Color variant' },
  { name: 'dot', type: 'boolean', default: 'false', description: 'Shows a status dot before label' },
  { name: 'icon', type: 'ReactNode', description: 'Icon rendered before label' },
]

export default function BadgePage() {
  return (
    <ComponentBlock
      num="02.02"
      title="Badge"
      tag="12 variants · dot · icon"
      description="Compact label for status, agent type, and signal categories. Two fills — outline-glow for ambient states and solid for high-emphasis status."
      preview={
        <div className="space-y-4 w-full">
          <PreviewRow label="signal colors">
            <Badge variant="purple">Purple</Badge>
            <Badge variant="green" dot>Live</Badge>
            <Badge variant="cyan">Cyan</Badge>
            <Badge variant="pink">Pink</Badge>
            <Badge variant="orange">Warning</Badge>
            <Badge variant="yellow">Yellow</Badge>
            <Badge variant="red">Error</Badge>
            <Badge variant="muted">Muted</Badge>
          </PreviewRow>
          <PreviewRow label="solid">
            <Badge variant="solid-green" dot>Live</Badge>
            <Badge variant="solid-red">Error</Badge>
            <Badge variant="solid-orange">Warning</Badge>
            <Badge variant="solid-purple" icon={<Bot className="h-3 w-3" />}>LLM</Badge>
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="Badge.tsx"
      props={PROPS}
    />
  )
}
