import { KeyValuePairs, Badge } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { KeyValuePairs } from '@shieldai/ds'

<KeyValuePairs
  columns={2}
  items={[
    { key: 'Agent ID',  value: 'agt_01j9z' },
    { key: 'Model',     value: 'claude-3-5-sonnet' },
    { key: 'Status',    value: <Badge variant="solid-green" dot>Live</Badge> },
    { key: 'Tokens',    value: '8,421' },
  ]}
/>

// Code variant — values in monospace
<KeyValuePairs
  variant="code"
  columns={3}
  items={[
    { key: 'Temperature', value: '0.7' },
    { key: 'Max tokens',  value: '4096' },
    { key: 'Top-p',       value: '0.95' },
  ]}
/>`

const PROPS = [
  { name: 'items', type: 'KeyValueItem[]', required: true, description: 'Array of { key, value } pairs' },
  { name: 'columns', type: '1 | 2 | 3 | 4', default: '2', description: 'Grid column count' },
  { name: 'variant', type: '"default" | "compact" | "code"', default: '"default"', description: 'Value text style' },
]

export default function KeyValuePairsPage() {
  return (
    <ComponentBlock
      num="02.25"
      title="Key-Value Pairs"
      tag="1–4 columns · code variant"
      description="Structured data display for agent metadata, configuration, and detail panels. Values can be any ReactNode — embed badges, links, or status indicators."
      preview={
        <div className="space-y-6 w-full">
          <PreviewRow label="2 columns · with badge value">
            <KeyValuePairs
              columns={2}
              items={[
                { key: 'Agent ID', value: 'agt_01j9z4xk' },
                { key: 'Model', value: 'claude-3-5-sonnet' },
                { key: 'Status', value: <Badge variant="solid-green" dot>Live</Badge> },
                { key: 'Tokens used', value: '8,421' },
                { key: 'Created', value: '2026-05-27 00:41' },
                { key: 'Region', value: 'us-east-1' },
              ]}
            />
          </PreviewRow>
          <PreviewRow label="3 columns · code variant">
            <KeyValuePairs
              variant="code"
              columns={3}
              items={[
                { key: 'Temperature', value: '0.7' },
                { key: 'Max tokens', value: '4096' },
                { key: 'Top-p', value: '0.95' },
                { key: 'Top-k', value: '40' },
                { key: 'Stop seqs', value: '["</s>"]' },
                { key: 'Stream', value: 'true' },
              ]}
            />
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="KeyValuePairs.tsx"
      props={PROPS}
    />
  )
}
