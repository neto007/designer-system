import { useState } from 'react'
import { Download, Filter, Plus, RefreshCw, Trash2 } from 'lucide-react'
import {
  Button, Badge, Pagination, TextFilter, StatusIndicator,
  CollectionPreferences,
} from '@shieldai/ds'
import type { TableColumn, ColumnPreference } from '@shieldai/ds'
import { Table } from '@shieldai/ds'
import { ExampleShell } from './ExampleShell'

type ThreatRow = {
  id: number; host: string; type: string; severity: string;
  status: string; source: string; ts: string;
}

const ALL_ROWS: ThreatRow[] = [
  { id: 1, host: '10.0.1.45', type: 'Lateral Movement',   severity: 'critical', status: 'running', source: 'LLM-01',  ts: '21:14:03' },
  { id: 2, host: '10.0.2.12', type: 'Brute Force',         severity: 'high',     status: 'running', source: 'Scan-01', ts: '21:00:14' },
  { id: 3, host: '10.0.3.88', type: 'Data Exfiltration',   severity: 'critical', status: 'pending', source: 'LLM-01',  ts: '20:47:55' },
  { id: 4, host: '10.0.1.20', type: 'Port Scan',           severity: 'warning',  status: 'success', source: 'Scan-01', ts: '20:31:02' },
  { id: 5, host: '10.0.4.67', type: 'Malware Signature',   severity: 'high',     status: 'running', source: 'WF-01',   ts: '20:15:41' },
  { id: 6, host: '10.0.2.99', type: 'Phishing Link',       severity: 'warning',  status: 'success', source: 'LLM-01',  ts: '19:58:17' },
  { id: 7, host: '10.0.5.14', type: 'Privilege Escalation',severity: 'critical', status: 'running', source: 'WF-01',   ts: '19:44:30' },
  { id: 8, host: '10.0.1.77', type: 'C2 Communication',    severity: 'high',     status: 'pending', source: 'LLM-01',  ts: '19:22:08' },
]

const SEV_BADGE: Record<string, 'red'|'orange'|'yellow'|'muted'> = {
  critical: 'red', high: 'orange', warning: 'yellow', low: 'muted',
}

const STATUS_IND: Record<string, 'running'|'pending'|'success'|'error'> = {
  running: 'running', pending: 'pending', success: 'success', error: 'error',
}

const PAGE_SIZE = 5

const ALL_COLUMNS: TableColumn<ThreatRow>[] = [
  {
    id: 'host', header: 'Host',
    cell: r => <span className="font-mono text-[12px] text-ds-cyan">{r.host}</span>,
    sortingField: 'host',
  },
  {
    id: 'type', header: 'Threat Type',
    cell: r => <span className="text-[12px]">{r.type}</span>,
    sortingField: 'type',
  },
  {
    id: 'severity', header: 'Severity',
    cell: r => <Badge variant={SEV_BADGE[r.severity] ?? 'muted'}>{r.severity}</Badge>,
    sortingField: 'severity',
  },
  {
    id: 'status', header: 'Status',
    cell: r => <StatusIndicator status={STATUS_IND[r.status] ?? 'idle'} />,
    sortingField: 'status',
  },
  {
    id: 'source', header: 'Source',
    cell: r => <Badge variant="purple">{r.source}</Badge>,
    sortingField: 'source',
  },
  {
    id: 'ts', header: 'Time',
    cell: r => <span className="font-mono text-[11px] text-ds-comment">{r.ts}</span>,
    sortingField: 'ts',
  },
]

export default function DataExplorerExamplePage() {
  const [search, setSearch]         = useState('')
  const [page, setPage]             = useState(1)
  const [selectedItems, setSelected] = useState<ThreatRow[]>([])
  const [sortField, setSortField]   = useState<keyof ThreatRow>('ts')
  const [sortDir, setSortDir]       = useState<'asc'|'desc'>('desc')
  const [showPrefs, setShowPrefs]   = useState(false)
  const [colPrefs, setColPrefs]     = useState<ColumnPreference[]>(
    ALL_COLUMNS.map(c => ({ id: c.id, label: String(c.header), visible: true }))
  )

  const visibleCols = ALL_COLUMNS.filter(c => colPrefs.find(p => p.id === c.id)?.visible !== false)

  const filtered = ALL_ROWS.filter(r =>
    !search || [r.host, r.type, r.severity, r.status, r.source]
      .some(v => v.toLowerCase().includes(search.toLowerCase()))
  )
  const sorted = [...filtered].sort((a, b) => {
    const av = String(a[sortField]), bv = String(b[sortField])
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  return (
    <ExampleShell
      title="Data Explorer"
      actions={
        <>
          <Button size="sm" variant="ghost" leftIcon={<Download className="h-3.5 w-3.5" />}>Export CSV</Button>
          <Button size="sm" variant="ghost" leftIcon={<Filter className="h-3.5 w-3.5" />} onClick={() => setShowPrefs(true)}>Columns</Button>
          <Button size="sm" variant="neu-purple" leftIcon={<Plus className="h-3.5 w-3.5" />}>Add Rule</Button>
        </>
      }
    >
      <div className="max-w-6xl space-y-4">

        {/* Toolbar */}
        <div className="flex items-center gap-3 flex-wrap">
          <TextFilter value={search} onChange={setSearch} placeholder="Search threats, hosts, sources…" className="w-72" />
          {selectedItems.length > 0 && (
            <Button size="sm" variant="ghost"
              leftIcon={<Trash2 className="h-3.5 w-3.5" />}
              className="ml-auto text-ds-red border-ds-red/30 hover:bg-ds-red/10"
              onClick={() => setSelected([])}>
              Delete {selectedItems.length}
            </Button>
          )}
          <span className="ml-auto text-[11px] font-mono text-ds-comment">{filtered.length} results</span>
        </div>

        {/* Table */}
        <div className="bg-ds-panel border border-ds-current rounded-ds-xl overflow-hidden">
          <Table<ThreatRow>
            items={paginated}
            columns={visibleCols}
            trackBy="id"
            selectionType="multi"
            selectedItems={selectedItems}
            onSelectionChange={setSelected}
            sorting={{ column: visibleCols.find(c => c.id === sortField) ?? visibleCols[0], direction: sortDir }}
            onSortingChange={s => {
              setSortField(s.column.sortingField as keyof ThreatRow ?? 'ts')
              setSortDir(s.direction)
              setPage(1)
            }}
            empty={
              <div className="py-12 text-center text-ds-comment text-sm">
                <RefreshCw className="h-8 w-8 mx-auto mb-3 opacity-30" />
                No threats match your filters.
              </div>
            }
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-ds-comment">
            Showing {Math.min(filtered.length, (page-1)*PAGE_SIZE+1)}–{Math.min(filtered.length, page*PAGE_SIZE)} of {filtered.length}
          </span>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>

        {/* Column prefs dialog */}
        <CollectionPreferences
          open={showPrefs}
          onClose={() => setShowPrefs(false)}
          columns={colPrefs}
          onColumnsChange={setColPrefs}
        />
      </div>
    </ExampleShell>
  )
}
