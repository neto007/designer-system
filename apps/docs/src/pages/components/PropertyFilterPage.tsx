import { useState, useMemo } from 'react'
import { PropertyFilter, Badge, StatusIndicator } from '@shieldai/ds'
import type { FilterToken } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { PropertyFilter } from '@shieldai/ds'

const PROPERTIES = [
  { key: 'status', label: 'Status', operators: ['=', '!='], values: ['live', 'idle', 'error'] },
  { key: 'type',   label: 'Type',   operators: ['=', '!='], values: ['llm', 'scanner', 'monitor'] },
  { key: 'region', label: 'Region', operators: ['=', 'starts with'] },
  { key: 'name',   label: 'Name',   operators: ['contains', 'starts with'] },
]

const [filters, setFilters] = useState<FilterToken[]>([])

<PropertyFilter
  properties={PROPERTIES}
  value={filters}
  onChange={setFilters}
  placeholder="Filter agents…"
/>`

const PROPS = [
  { name: 'properties', type: 'FilterProperty[]', default: '—', description: 'Available filter fields: { key, label, operators?, values? }' },
  { name: 'value', type: 'FilterToken[]', default: '—', description: 'Controlled array of active filter tokens' },
  { name: 'onChange', type: '(tokens: FilterToken[]) => void', default: '—', description: 'Called when tokens change' },
  { name: 'placeholder', type: 'string', default: '"Filter by property…"', description: 'Placeholder shown when no tokens exist' },
]

const AGENTS = [
  { name: 'ml-training-agent',  type: 'llm',     status: 'live',  region: 'us-east-1' },
  { name: 'threat-scanner',     type: 'scanner', status: 'live',  region: 'eu-west-1' },
  { name: 'log-analyzer',       type: 'monitor', status: 'idle',  region: 'us-east-1' },
  { name: 'network-monitor',    type: 'monitor', status: 'live',  region: 'ap-east-1' },
  { name: 'data-pipeline',      type: 'llm',     status: 'idle',  region: 'us-west-2' },
  { name: 'auth-guard',         type: 'scanner', status: 'error', region: 'us-east-1' },
]

const PROPERTIES = [
  { key: 'status', label: 'Status', operators: ['=', '!='], values: ['live', 'idle', 'error'] },
  { key: 'type',   label: 'Type',   operators: ['=', '!='], values: ['llm', 'scanner', 'monitor'] },
  { key: 'region', label: 'Region', operators: ['=', 'starts with'] },
  { key: 'name',   label: 'Name',   operators: ['contains', 'starts with'] },
]

function matches(agent: typeof AGENTS[0], token: FilterToken): boolean {
  const val = agent[token.property as keyof typeof agent] ?? ''
  switch (token.operator) {
    case '=': return val === token.value
    case '!=': return val !== token.value
    case 'contains': return val.includes(token.value)
    case 'starts with': return val.startsWith(token.value)
    default: return true
  }
}

function LiveDemo() {
  const [filters, setFilters] = useState<FilterToken[]>([])

  const filtered = useMemo(() =>
    filters.length === 0
      ? AGENTS
      : AGENTS.filter((a) => filters.every((f) => matches(a, f))),
    [filters]
  )

  return (
    <div className="space-y-4 w-full">
      <PropertyFilter
        properties={PROPERTIES}
        value={filters}
        onChange={setFilters}
        placeholder="Filter agents by status, type, region, or name…"
      />
      <div className="border border-ds-current rounded-ds-md overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-ds-panel border-b border-ds-current text-ds-comment">
              <th className="text-left px-3 py-2 font-mono">name</th>
              <th className="text-left px-3 py-2 font-mono">type</th>
              <th className="text-left px-3 py-2 font-mono">status</th>
              <th className="text-left px-3 py-2 font-mono">region</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ds-current/50">
            {filtered.length > 0 ? filtered.map((a) => (
              <tr key={a.name} className="hover:bg-ds-panel/50 transition-colors">
                <td className="px-3 py-2 font-mono text-ds-fg">{a.name}</td>
                <td className="px-3 py-2"><Badge variant="purple">{a.type}</Badge></td>
                <td className="px-3 py-2">
                  <StatusIndicator status={a.status === 'live' ? 'success' : a.status === 'error' ? 'error' : 'disabled'} label={a.status} />
                </td>
                <td className="px-3 py-2 font-mono text-ds-comment">{a.region}</td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="px-3 py-6 text-center text-ds-comment">No agents match the current filters</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function PropertyFilterPage() {
  return (
    <ComponentBlock
      num="02.PF"
      title="Property Filter"
      tag="query builder · tokens · attribute:operator:value"
      description="Multi-attribute query builder. Click to add filters step-by-step: pick a property, choose an operator, then enter or select a value. Each active filter renders as a dismissible token. All active filters are ANDed together."
      preview={<LiveDemo />}
      code={CODE}
      filename="PropertyFilter.tsx"
      props={PROPS}
    />
  )
}
