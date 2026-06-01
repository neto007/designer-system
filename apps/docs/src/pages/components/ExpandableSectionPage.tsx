import { ExpandableSection, Badge } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { ExpandableSection } from '@shieldai/ds'

// Basic
<ExpandableSection header="Advanced Settings">
  <p className="text-sm text-ds-comment">Hidden content revealed on expand.</p>
</ExpandableSection>

// Default expanded
<ExpandableSection header="Agent Configuration" defaultExpanded>
  <div className="space-y-3">
    <Input placeholder="Model name" />
    <Textarea placeholder="System prompt" />
  </div>
</ExpandableSection>

// Compact variant
<ExpandableSection variant="compact" header="Raw JSON">
  <pre className="text-xs font-mono text-ds-cyan">{json}</pre>
</ExpandableSection>

// Controlled
<ExpandableSection
  header="Details"
  expanded={isOpen}
  onToggle={setIsOpen}
>
  ...
</ExpandableSection>`

const PROPS = [
  { name: 'header', type: 'ReactNode', required: true, description: 'Content shown in the clickable header row' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Content revealed when expanded' },
  { name: 'defaultExpanded', type: 'boolean', default: 'false', description: 'Initial open state (uncontrolled)' },
  { name: 'expanded', type: 'boolean', description: 'Controlled open state' },
  { name: 'onToggle', type: '(expanded: boolean) => void', description: 'Called when toggled' },
  { name: 'variant', type: '"default" | "compact"', default: '"default"', description: 'Padding and font size of header' },
]

export default function ExpandableSectionPage() {
  return (
    <ComponentBlock
      num="02.24"
      title="Expandable Section"
      tag="controlled · compact variant"
      description="Collapsible content panel with animated chevron. Supports controlled and uncontrolled modes, and a compact variant for dense layouts."
      preview={
        <div className="space-y-3 w-full max-w-lg">
          <ExpandableSection header="Advanced Settings">
            <p className="text-sm text-ds-comment">Configure rate limiting, timeout, and retry behavior for this agent.</p>
          </ExpandableSection>
          <ExpandableSection header="Agent Configuration" defaultExpanded>
            <div className="space-y-2 text-sm text-ds-comment">
              <div className="flex justify-between"><span>Model</span><span className="font-mono text-ds-cyan">claude-3-5-sonnet</span></div>
              <div className="flex justify-between"><span>Temperature</span><span className="font-mono text-ds-cyan">0.7</span></div>
              <div className="flex justify-between"><span>Max tokens</span><span className="font-mono text-ds-cyan">4096</span></div>
            </div>
          </ExpandableSection>
          <ExpandableSection variant="compact" header={<span className="flex items-center gap-2">Raw Output <Badge variant="muted">JSON</Badge></span>}>
            <pre className="text-[11px] font-mono text-ds-cyan">{'{ "status": "done", "tokens": 842 }'}</pre>
          </ExpandableSection>
        </div>
      }
      code={CODE}
      filename="ExpandableSection.tsx"
      props={PROPS}
    />
  )
}
