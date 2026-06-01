import { useState } from 'react'
import { LiveRegion, useLiveRegion, Button } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { LiveRegion, useLiveRegion } from '@shieldai/ds'

// Static live region (polite by default)
<LiveRegion>Status updated successfully.</LiveRegion>

// Assertive (interrupts screen reader immediately)
<LiveRegion assertive>Critical alert: connection lost.</LiveRegion>

// useLiveRegion hook — imperative announcements
function MyComponent() {
  const { announce, LiveRegionAnnouncer } = useLiveRegion()

  return (
    <>
      <LiveRegionAnnouncer />
      <Button onClick={() => announce('File saved successfully.')}>
        Save
      </Button>
    </>
  )
}`

const PROPS = [
  { name: 'children', type: 'ReactNode', default: '—', description: 'Content to announce to screen readers' },
  { name: 'assertive', type: 'boolean', default: 'false', description: 'When true uses aria-live="assertive" — interrupts the current announcement' },
  { name: 'className', type: 'string', default: '—', description: 'Additional classes (the region is visually hidden with sr-only by default)' },
]

function LiveDemo() {
  const [politeMsg, setPoliteMsg] = useState('')
  const { announce, LiveRegionAnnouncer } = useLiveRegion()

  const messages = [
    'Agent scan completed — 0 threats found.',
    '3 agents deployed to us-east-1.',
    'Workflow pipeline finished in 4.2s.',
    'Authentication token refreshed.',
  ]

  return (
    <div className="space-y-4 w-full">
      <LiveRegionAnnouncer />

      <PreviewRow label="static polite">
        <div className="bg-ds-panel border border-ds-current rounded-ds-md px-3 py-2 text-xs text-ds-comment">
          LiveRegion is visually hidden — only screen readers hear it.
        </div>
        <LiveRegion>{politeMsg}</LiveRegion>
      </PreviewRow>

      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-wider text-ds-comment">
          useLiveRegion hook — click to announce
        </div>
        <div className="flex flex-wrap gap-2">
          {messages.map((msg) => (
            <Button
              key={msg}
              size="sm"
              variant="outline"
              onClick={() => {
                announce(msg)
                setPoliteMsg(msg)
              }}
            >
              {msg.split(' ').slice(0, 3).join(' ')}…
            </Button>
          ))}
        </div>
        {politeMsg && (
          <div className="bg-ds-green/10 border border-ds-green/30 rounded-ds-md px-3 py-2 text-xs text-ds-green">
            Last announced: {politeMsg}
          </div>
        )}
      </div>
    </div>
  )
}

export default function LiveRegionPage() {
  return (
    <ComponentBlock
      num="02.P7"
      title="Live Region"
      tag="aria-live · polite · assertive · hook"
      description="Invisible ARIA live region that announces dynamic content to screen readers. Use polite for non-critical updates and assertive for urgent alerts. The useLiveRegion hook provides imperative announcements."
      preview={<LiveDemo />}
      code={CODE}
      filename="LiveRegion.tsx"
      props={PROPS}
    />
  )
}
