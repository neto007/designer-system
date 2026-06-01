import { Icon } from '@shieldai/ds'
import { Zap, Shield, Bot, Network, Search, Bell, Settings, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Icon } from '@shieldai/ds'
import { Zap, Shield, Bot } from 'lucide-react'

// Sizes
<Icon icon={<Zap />} size="sm" />
<Icon icon={<Zap />} size="md" />
<Icon icon={<Zap />} size="lg" />
<Icon icon={<Zap />} size="xl" />

// With color via className
<Icon icon={<Shield />} size="lg" className="text-ds-purple" />
<Icon icon={<Bot />}    size="lg" className="text-ds-green" />

// Inline with text
<span>
  <Icon icon={<Zap />} size="sm" className="text-ds-yellow" />
  {' '}Active agents
</span>`

const PROPS = [
  { name: 'icon', type: 'ReactNode', default: '—', description: 'Lucide icon element (or any SVG node)' },
  { name: 'size', type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Icon bounding box — sm=12px md=16px lg=20px xl=24px' },
  { name: 'className', type: 'string', default: '—', description: 'Pass text-ds-* to set color; inherits currentColor by default' },
]

export default function IconPage() {
  return (
    <ComponentBlock
      num="02.P3"
      title="Icon"
      tag="Lucide wrapper · 4 sizes · currentColor"
      description="Thin wrapper around Lucide icons that enforces consistent sizing. Color inherits currentColor so it adapts to any parent text color. Pass className with text-ds-* to override."
      preview={
        <div className="space-y-4 w-full">
          <PreviewRow label="sizes">
            <Icon icon={<Zap />} size="sm" className="text-ds-purple" />
            <Icon icon={<Zap />} size="md" className="text-ds-purple" />
            <Icon icon={<Zap />} size="lg" className="text-ds-purple" />
            <Icon icon={<Zap />} size="xl" className="text-ds-purple" />
          </PreviewRow>
          <PreviewRow label="colors">
            <Icon icon={<Shield />} size="lg" className="text-ds-purple" />
            <Icon icon={<Bot />} size="lg" className="text-ds-green" />
            <Icon icon={<Network />} size="lg" className="text-ds-cyan" />
            <Icon icon={<Search />} size="lg" className="text-ds-pink" />
            <Icon icon={<Bell />} size="lg" className="text-ds-orange" />
            <Icon icon={<Settings />} size="lg" className="text-ds-yellow" />
            <Icon icon={<AlertTriangle />} size="lg" className="text-ds-red" />
            <Icon icon={<CheckCircle />} size="lg" className="text-ds-green" />
            <Icon icon={<XCircle />} size="lg" className="text-ds-red" />
          </PreviewRow>
          <PreviewRow label="inline text">
            <span className="text-ds-fg text-sm flex items-center gap-1">
              <Icon icon={<Zap />} size="sm" className="text-ds-yellow" />
              Active agents
            </span>
            <span className="text-ds-fg text-sm flex items-center gap-1">
              <Icon icon={<Shield />} size="sm" className="text-ds-purple" />
              Security scan
            </span>
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="Icon.tsx"
      props={PROPS}
    />
  )
}
