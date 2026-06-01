import { Container, Badge, Button, StatusIndicator } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { Container } from '@shieldai/ds'

// Default panel with header and footer
<Container
  variant="panel"
  header={<h3 className="font-semibold">Agent Details</h3>}
  footer={<Button size="sm">Deploy</Button>}
>
  <p>Container body content</p>
</Container>

// With media header
<Container
  media={<img src={banner} alt="" className="w-full h-32 object-cover" />}
  header={<h3>With media</h3>}
>
  Content below the media
</Container>

// Padding variants
<Container padding="sm">Tight</Container>
<Container padding="lg">Spacious</Container>`

const PROPS = [
  { name: 'variant', type: '"default" | "panel" | "neu"', default: '"panel"', description: 'Background and border style' },
  { name: 'padding', type: '"none" | "sm" | "md" | "lg"', default: '"md"', description: 'Padding applied to header, body, and footer sections' },
  { name: 'header', type: 'ReactNode', default: '—', description: 'Renders above the body with a bottom border' },
  { name: 'footer', type: 'ReactNode', default: '—', description: 'Renders below the body with a top border' },
  { name: 'media', type: 'ReactNode', default: '—', description: 'Full-width slot at the very top (above header) — for images or banners' },
]

export default function ContainerPage() {
  return (
    <ComponentBlock
      num="03.C"
      title="Container"
      tag="header · footer · media · 3 variants"
      description="Generic surface with optional header, footer, and media slots. Each section is separated by a 1px border. The media slot bleeds to the edges above the header — useful for card thumbnails and banners."
      preview={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <Container
            variant="panel"
            header={
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ds-fg">Agent Status</span>
                <Badge variant="green">live</Badge>
              </div>
            }
            footer={
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Logs</Button>
                <Button size="sm" variant="neu-purple">Deploy</Button>
              </div>
            }
          >
            <div className="space-y-2 text-xs text-ds-comment">
              <StatusIndicator status="success" label="All systems nominal" />
              <StatusIndicator status="running" label="Scan running…" />
            </div>
          </Container>

          <Container
            variant="neu"
            header={<span className="text-sm font-bold text-ds-fg">Neu variant</span>}
          >
            <p className="text-xs text-ds-comment">Neumorphic border with drop shadow.</p>
          </Container>

          <Container
            variant="default"
            padding="sm"
            header={<span className="text-xs font-semibold text-ds-fg">Tight padding</span>}
            footer={<span className="text-[10px] text-ds-comment font-mono">padding="sm"</span>}
          >
            <p className="text-xs text-ds-comment">Compact layout for dense UIs.</p>
          </Container>
        </div>
      }
      code={CODE}
      filename="Container.tsx"
      props={PROPS}
    />
  )
}
