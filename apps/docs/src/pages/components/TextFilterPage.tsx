import { useState, useMemo } from 'react'
import { TextFilter, Badge } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { TextFilter } from '@shieldai/ds'

// Uncontrolled — fires onChange after debounce
<TextFilter
  placeholder="Filter agents…"
  onChange={(q) => setQuery(q)}
/>

// Controlled with match count
<TextFilter
  value={query}
  onChange={setQuery}
  matchCount={filteredItems.length}
  placeholder="Search…"
/>

// With debounce (default 200ms)
<TextFilter
  onChange={handleFilter}
  debounceMs={400}
/>`

const PROPS = [
  { name: 'value', type: 'string', default: '—', description: 'Controlled input value' },
  { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Called (debounced) on every keystroke' },
  { name: 'placeholder', type: 'string', default: '"Filter…"', description: 'Input placeholder text' },
  { name: 'debounceMs', type: 'number', default: '200', description: 'Milliseconds to debounce before firing onChange' },
  { name: 'matchCount', type: 'number', default: '—', description: 'When provided and the field is empty, shows this count in the right edge' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input' },
]

const AGENTS = [
  { name: 'ml-training-agent',   type: 'llm',        status: 'live' },
  { name: 'threat-scanner',      type: 'task',       status: 'live' },
  { name: 'log-analyzer',        type: 'sequential', status: 'idle' },
  { name: 'network-monitor',     type: 'loop',       status: 'live' },
  { name: 'data-pipeline',       type: 'workflow',   status: 'idle' },
  { name: 'auth-guard',          type: 'task',       status: 'live' },
  { name: 'backup-controller',   type: 'sequential', status: 'idle' },
  { name: 'metrics-collector',   type: 'llm',        status: 'live' },
  { name: 'alert-dispatcher',    type: 'a2a',        status: 'idle' },
  { name: 'policy-enforcer',     type: 'task',       status: 'live' },
]

function LiveDemo() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return AGENTS
    const q = query.toLowerCase()
    return AGENTS.filter(
      (a) => a.name.includes(q) || a.type.includes(q) || a.status.includes(q)
    )
  }, [query])

  return (
    <div className="space-y-4 w-full">
      <TextFilter
        value={query}
        onChange={setQuery}
        placeholder="Filter by name, type, or status…"
        matchCount={filtered.length}
        className="max-w-sm"
      />
      <div className="border border-ds-current rounded-ds-md overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-ds-panel border-b border-ds-current text-ds-comment">
              <th className="text-left px-3 py-2 font-mono">name</th>
              <th className="text-left px-3 py-2 font-mono">type</th>
              <th className="text-left px-3 py-2 font-mono">status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ds-current/50">
            {filtered.length > 0 ? (
              filtered.map((agent) => (
                <tr key={agent.name} className="hover:bg-ds-panel/50 transition-colors">
                  <td className="px-3 py-2 font-mono text-ds-fg">{agent.name}</td>
                  <td className="px-3 py-2">
                    <Badge variant="purple">{agent.type}</Badge>
                  </td>
                  <td className="px-3 py-2">
                    <Badge variant={agent.status === 'live' ? 'green' : 'muted'}>{agent.status}</Badge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-3 py-6 text-center text-ds-comment">
                  No agents match "{query}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PreviewRow label="disabled">
        <TextFilter placeholder="Disabled filter" disabled className="w-48" />
      </PreviewRow>
    </div>
  )
}

export default function TextFilterPage() {
  return (
    <ComponentBlock
      num="02.TF"
      title="Text Filter"
      tag="debounced · match count · clear button"
      description="Free-text search input bound to a collection. Fires onChange after a debounce to avoid excessive filtering. Shows a clear × button when non-empty, or an optional match count when empty."
      preview={<LiveDemo />}
      code={CODE}
      filename="TextFilter.tsx"
      props={PROPS}
    />
  )
}
