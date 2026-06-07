import { Badge } from '@shieldai/ds'
import { Bot } from 'lucide-react'
import { ComponentBlock, DocSection, PreviewRow, PlaygroundBlock } from '../../components/docs'
import type { ControlValues } from '../../components/docs'

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

const CONTROLS = [
  { type: 'select' as const, key: 'variant', label: 'variant', default: 'purple', options: ['purple', 'green', 'cyan', 'pink', 'orange', 'yellow', 'red', 'muted', 'solid-green', 'solid-red', 'solid-orange', 'solid-purple'] },
  { type: 'text' as const, key: 'label', label: 'label', default: 'Status' },
  { type: 'boolean' as const, key: 'dot', label: 'dot', default: false },
]

function genCode(v: ControlValues): string {
  const parts: string[] = [`variant="${v.variant}"`]
  if (v.dot) parts.push('dot')
  return `<Badge ${parts.join(' ')}>${v.label}</Badge>`
}

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
    >
      <DocSection title="Interactive Playground">
        <PlaygroundBlock
          controls={CONTROLS}
          render={(v) => (
            <Badge
              variant={v.variant as Parameters<typeof Badge>[0]['variant']}
              dot={v.dot as boolean}
            >
              {v.label as string}
            </Badge>
          )}
          generateCode={genCode}
          filename="Badge.tsx"
        />
      </DocSection>
    </ComponentBlock>
  )
}
