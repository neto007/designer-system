import { Breadcrumb } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Breadcrumb } from '@shieldai/ds'

<Breadcrumb
  items={[
    { label: 'Home',       href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb' },
  ]}
/>

// In a router app, swap href for NavLink/Link children:
<Breadcrumb
  items={[
    { label: <Link to="/">Home</Link> },
    { label: <Link to="/components">Components</Link> },
    { label: 'Breadcrumb' },
  ]}
/>`

const PROPS = [
  { name: 'items', type: 'BreadcrumbItem[]', required: true, description: 'Ordered list of crumbs. Last item is current page (no link).' },
  { name: 'separator', type: 'ReactNode', description: 'Custom separator element — defaults to ChevronRight' },
]

export default function BreadcrumbPage() {
  return (
    <ComponentBlock
      num="02.26"
      title="Breadcrumb"
      tag="nav · aria-label · current page"
      description="Accessible breadcrumb navigation with aria-label and aria-current. Last item is rendered as plain text (current page). Separator is swappable."
      preview={
        <div className="space-y-4 w-full">
          <PreviewRow label="3 levels">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Components', href: '/components' },
                { label: 'Breadcrumb' },
              ]}
            />
          </PreviewRow>
          <PreviewRow label="deep path">
            <Breadcrumb
              items={[
                { label: 'Workspace', href: '#' },
                { label: 'Agents',    href: '#' },
                { label: 'LLM Fleet', href: '#' },
                { label: 'claude-prod-01' },
              ]}
            />
          </PreviewRow>
          <PreviewRow label="custom separator · /">
            <Breadcrumb
              separator={<span className="text-ds-current font-mono text-sm">/</span>}
              items={[
                { label: 'root', href: '#' },
                { label: 'configs', href: '#' },
                { label: 'agent.yaml' },
              ]}
            />
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="Breadcrumb.tsx"
      props={PROPS}
    />
  )
}
