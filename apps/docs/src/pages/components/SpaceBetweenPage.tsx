import { SpaceBetween, Badge, Button } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { SpaceBetween } from '@shieldai/ds'

// Vertical spacing (default)
<SpaceBetween size="md">
  <div>First item</div>
  <div>Second item</div>
  <div>Third item</div>
</SpaceBetween>

// Horizontal layout
<SpaceBetween direction="horizontal" size="md">
  <Button variant="neu-purple">Cancel</Button>
  <Button variant="neu-green">Confirm</Button>
</SpaceBetween>

// Size variants
<SpaceBetween size="sm">...</SpaceBetween>
<SpaceBetween size="lg">...</SpaceBetween>
<SpaceBetween size="xl">...</SpaceBetween>`

const PROPS = [
  { name: 'direction', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Stacking axis — vertical uses space-y-*, horizontal uses flex + gap-*' },
  { name: 'size', type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Gap between children — sm=4px md=12px lg=24px xl=40px' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Sibling elements to space apart' },
  { name: 'className', type: 'string', default: '—', description: 'Additional classes' },
]

export default function SpaceBetweenPage() {
  return (
    <ComponentBlock
      num="02.P5"
      title="Space Between"
      tag="vertical · horizontal · 4 sizes"
      description="Utility layout component that applies consistent spacing between sibling children. Vertical uses space-y, horizontal uses flexbox gap."
      preview={
        <div className="flex gap-8 w-full">
          <div className="flex-1 space-y-2">
            <div className="text-[10px] font-mono uppercase text-ds-comment mb-2">vertical</div>
            <SpaceBetween size="md">
              <div className="h-8 bg-ds-purple/20 border border-ds-purple/30 rounded-ds-sm flex items-center px-3 text-ds-purple text-xs">Item 1</div>
              <div className="h-8 bg-ds-purple/20 border border-ds-purple/30 rounded-ds-sm flex items-center px-3 text-ds-purple text-xs">Item 2</div>
              <div className="h-8 bg-ds-purple/20 border border-ds-purple/30 rounded-ds-sm flex items-center px-3 text-ds-purple text-xs">Item 3</div>
            </SpaceBetween>
          </div>
          <div className="flex-1 space-y-2">
            <div className="text-[10px] font-mono uppercase text-ds-comment mb-2">horizontal</div>
            <SpaceBetween direction="horizontal" size="md">
              <Badge variant="purple">Tag A</Badge>
              <Badge variant="green">Tag B</Badge>
              <Badge variant="cyan">Tag C</Badge>
            </SpaceBetween>
          </div>
          <div className="flex-1 space-y-2">
            <div className="text-[10px] font-mono uppercase text-ds-comment mb-2">sizes</div>
            <div className="space-y-4">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size}>
                  <div className="text-[10px] text-ds-comment mb-1">{size}</div>
                  <SpaceBetween direction="horizontal" size={size}>
                    <Button size="sm" variant="outline">A</Button>
                    <Button size="sm" variant="outline">B</Button>
                  </SpaceBetween>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      code={CODE}
      filename="SpaceBetween.tsx"
      props={PROPS}
    />
  )
}
