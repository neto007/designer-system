import { StatusIndicator } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { StatusIndicator } from '@shieldai/ds'

<StatusIndicator status="live" />
<StatusIndicator status="running" />
<StatusIndicator status="idle" />
<StatusIndicator status="pending" />
<StatusIndicator status="success" />
<StatusIndicator status="warning" />
<StatusIndicator status="error" />
<StatusIndicator status="disabled" />

// Dot only
<StatusIndicator status="live" showLabel={false} />

// Custom label
<StatusIndicator status="running" label="Processing" />

// Sizes
<StatusIndicator status="live" size="sm" />
<StatusIndicator status="live" size="md" />
<StatusIndicator status="live" size="lg" />`

const PROPS = [
  { name: 'status', type: '"live" | "idle" | "error" | "warning" | "pending" | "running" | "success" | "disabled"', required: true, description: 'Status type — controls dot color and animation' },
  { name: 'label', type: 'string', description: 'Override default status label text' },
  { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Dot size' },
  { name: 'showLabel', type: 'boolean', default: 'true', description: 'Show/hide label text' },
]

const ALL_STATUSES = ['live', 'running', 'idle', 'pending', 'success', 'warning', 'error', 'disabled'] as const

export default function StatusIndicatorPage() {
  return (
    <ComponentBlock
      num="02.23"
      title="Status Indicator"
      tag="8 states · animated live/running"
      description="Dot + label indicator for agent and system status. Live and running states pulse with a glow animation. Maps to the signal color palette."
      preview={
        <div className="space-y-4 w-full">
          <PreviewRow label="all states">
            {ALL_STATUSES.map((s) => (
              <StatusIndicator key={s} status={s} />
            ))}
          </PreviewRow>
          <PreviewRow label="dot only">
            {ALL_STATUSES.map((s) => (
              <StatusIndicator key={s} status={s} showLabel={false} />
            ))}
          </PreviewRow>
          <PreviewRow label="sizes">
            <StatusIndicator status="live" size="sm" />
            <StatusIndicator status="live" size="md" />
            <StatusIndicator status="live" size="lg" />
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="StatusIndicator.tsx"
      props={PROPS}
    />
  )
}
