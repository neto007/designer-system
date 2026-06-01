import { useState, useMemo } from 'react'
import { CollectionSelectFilter, StatusIndicator, Badge } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { CollectionSelectFilter } from '@shieldai/ds'

// Filter a collection by a single attribute
const [status, setStatus] = useState<string | null>(null)

<CollectionSelectFilter
  label="Status"
  value={status}
  onChange={setStatus}
  items={[
    { value: 'live',  label: 'Live',  count: 8 },
    { value: 'idle',  label: 'Idle',  count: 4 },
    { value: 'error', label: 'Error', count: 1 },
  ]}
/>

// Use alongside Table / Cards:
const filtered = status
  ? agents.filter(a => a.status === status)
  : agents`

const PROPS = [
  { name: 'items', type: 'SelectFilterItem[]', default: '—', description: 'Options: { value, label, count? }' },
  { name: 'value', type: 'string | null', default: '—', description: 'Controlled selection — null means "All"' },
  { name: 'onChange', type: '(value: string | null) => void', default: '—', description: 'Called with the selected value or null when cleared' },
  { name: 'label', type: 'string', default: '—', description: 'Inline label rendered before the trigger button' },
  { name: 'placeholder', type: 'string', default: '"All"', description: 'Trigger label when nothing is selected' },
  { name: 'clearLabel', type: 'string', default: '"All"', description: 'Label for the "clear" option at the top of the dropdown' },
]

const AGENTS = [
  { name: 'ml-training-agent',  status: 'live',  type: 'llm',     region: 'us-east-1' },
  { name: 'threat-scanner',     status: 'live',  type: 'scanner', region: 'eu-west-1' },
  { name: 'log-analyzer',       status: 'idle',  type: 'monitor', region: 'us-east-1' },
  { name: 'network-monitor',    status: 'live',  type: 'monitor', region: 'ap-east-1' },
  { name: 'data-pipeline',      status: 'idle',  type: 'llm',     region: 'us-west-2' },
  { name: 'auth-guard',         status: 'error', type: 'scanner', region: 'us-east-1' },
  { name: 'backup-controller',  status: 'idle',  type: 'monitor', region: 'sa-east-1' },
  { name: 'metrics-collector',  status: 'live',  type: 'llm',     region: 'us-east-1' },
]

function count(field: keyof typeof AGENTS[0], val: string) {
  return AGENTS.filter((a) => a[field] === val).length
}

function LiveDemo() {
  const [status, setStatus] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)
  const [region, setRegion] = useState<string | null>(null)

  const filtered = useMemo(() =>
    AGENTS.filter((a) =>
      (!status || a.status === status) &&
      (!type   || a.type   === type)   &&
      (!region || a.region === region)
    ),
    [status, type, region]
  )

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap items-center gap-3">
        <CollectionSelectFilter
          label="Status"
          value={status}
          onChange={setStatus}
          items={[
            { value: 'live',  label: 'Live',  count: count('status', 'live') },
            { value: 'idle',  label: 'Idle',  count: count('status', 'idle') },
            { value: 'error', label: 'Error', count: count('status', 'error') },
          ]}
        />
        <CollectionSelectFilter
          label="Type"
          value={type}
          onChange={setType}
          items={[
            { value: 'llm',     label: 'LLM',     count: count('type', 'llm') },
            { value: 'scanner', label: 'Scanner', count: count('type', 'scanner') },
            { value: 'monitor', label: 'Monitor', count: count('type', 'monitor') },
          ]}
        />
        <CollectionSelectFilter
          label="Region"
          value={region}
          onChange={setRegion}
          placeholder="All regions"
          items={[...new Set(AGENTS.map((a) => a.region))].map((r) => ({
            value: r, label: r, count: count('region', r),
          }))}
        />
        <span className="text-xs text-ds-comment ml-auto">{filtered.length} agents</span>
      </div>

      <div className="border border-ds-current rounded-ds-md overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-ds-panel border-b border-ds-current text-ds-comment">
              <th className="text-left px-3 py-2 font-mono">name</th>
              <th className="text-left px-3 py-2 font-mono">status</th>
              <th className="text-left px-3 py-2 font-mono">type</th>
              <th className="text-left px-3 py-2 font-mono">region</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ds-current/50">
            {filtered.length > 0 ? filtered.map((a) => (
              <tr key={a.name} className="hover:bg-ds-panel/50">
                <td className="px-3 py-2 font-mono text-ds-fg">{a.name}</td>
                <td className="px-3 py-2">
                  <StatusIndicator status={a.status === 'live' ? 'success' : a.status === 'error' ? 'error' : 'disabled'} label={a.status} />
                </td>
                <td className="px-3 py-2"><Badge variant="purple">{a.type}</Badge></td>
                <td className="px-3 py-2 font-mono text-ds-comment">{a.region}</td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="px-3 py-6 text-center text-ds-comment">No agents match the selected filters</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <PreviewRow label="standalone">
        <CollectionSelectFilter
          items={[
            { value: 'us', label: 'United States', count: 45 },
            { value: 'eu', label: 'Europe', count: 23 },
            { value: 'ap', label: 'Asia Pacific', count: 12 },
          ]}
          placeholder="All regions"
        />
      </PreviewRow>
    </div>
  )
}

export default function CollectionSelectPage() {
  return (
    <ComponentBlock
      num="02.CS"
      title="Collection Select Filter"
      tag="single attribute · dropdown · count badge · clear"
      description="Compact dropdown that filters a collection by a single attribute value. Shows item counts, supports a clear option (null), and can be combined with TextFilter or PropertyFilter for multi-dimensional filtering."
      preview={<LiveDemo />}
      code={CODE}
      filename="CollectionSelectFilter.tsx"
      props={PROPS}
    />
  )
}
