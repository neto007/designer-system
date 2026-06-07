import { Avatar } from '@shieldai/ds'
import { ComponentBlock, DocSection, PreviewRow, PlaygroundBlock } from '../../components/docs'
import type { ControlValues } from '../../components/docs'

const CODE = `import { Avatar } from '@shieldai/ds'

// Role variants
<Avatar variant="user" initials="JD" />
<Avatar variant="bot"  initials="AI" />
<Avatar variant="tool" initials="FN" />

// Sizes
<Avatar variant="user" size="sm" initials="SM" />
<Avatar variant="user" size="md" initials="MD" />
<Avatar variant="user" size="lg" initials="LG" />

// With image (falls back to initials on error)
<Avatar variant="user" src="/avatar.png" initials="JD" />`

const PROPS = [
  { name: 'variant', type: '"user" | "bot" | "tool" | "default"', default: '"default"', description: 'Role-based color variant' },
  { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Avatar size' },
  { name: 'src', type: 'string', description: 'Image URL — falls back to initials on error' },
  { name: 'initials', type: 'string', description: 'Fallback text shown when no image' },
  { name: 'alt', type: 'string', description: 'Alt text for the image' },
]

const CONTROLS = [
  { type: 'select' as const, key: 'variant', label: 'variant', default: 'user', options: ['user', 'bot', 'tool', 'default'] },
  { type: 'select' as const, key: 'size', label: 'size', default: 'md', options: ['sm', 'md', 'lg'] },
  { type: 'text' as const, key: 'initials', label: 'initials', default: 'JD' },
]

function genCode(v: ControlValues): string {
  const parts: string[] = [`variant="${v.variant}"`]
  if (v.size !== 'md') parts.push(`size="${v.size}"`)
  parts.push(`initials="${v.initials}"`)
  return `<Avatar ${parts.join(' ')} />`
}

export default function AvatarPage() {
  return (
    <ComponentBlock
      num="02.03"
      title="Avatar"
      tag="4 roles · 3 sizes · image fallback"
      description="Role-coded avatar for users, bots, and tool agents. Color maps to the agent type system. Falls back to initials when image fails to load."
      preview={
        <div className="space-y-4 w-full">
          <PreviewRow label="role variants">
            <Avatar variant="user" initials="JD" />
            <Avatar variant="bot"  initials="AI" />
            <Avatar variant="tool" initials="FN" />
            <Avatar variant="default" initials="??" />
          </PreviewRow>
          <PreviewRow label="sizes">
            <Avatar variant="user" size="sm" initials="SM" />
            <Avatar variant="user" size="md" initials="MD" />
            <Avatar variant="user" size="lg" initials="LG" />
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="Avatar.tsx"
      props={PROPS}
    >
      <DocSection title="Interactive Playground">
        <PlaygroundBlock
          controls={CONTROLS}
          render={(v) => (
            <Avatar
              variant={v.variant as Parameters<typeof Avatar>[0]['variant']}
              size={v.size as 'sm' | 'md' | 'lg'}
              initials={v.initials as string}
            />
          )}
          generateCode={genCode}
          filename="Avatar.tsx"
        />
      </DocSection>
    </ComponentBlock>
  )
}
