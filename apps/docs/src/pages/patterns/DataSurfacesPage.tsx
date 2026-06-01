import { useState } from 'react'
import { Table, useTableSorting, Pagination, Badge, StatusIndicator, Button, Input, NeuCard } from '@shieldai/ds'
import type { TableColumn } from '@shieldai/ds'
import { Search, Filter, Download, RefreshCw, Plus } from 'lucide-react'
import { DocSection } from '../../components/docs'

interface Agent {
  id: string
  name: string
  type: string
  status: 'success' | 'running' | 'warning' | 'error' | 'disabled'
  tasks: number
  uptime: string
  model: string
  region: string
}

const ALL_AGENTS: Agent[] = [
  { id: '1', name: 'Orchestrator Prime', type: 'workflow',   status: 'running',  tasks: 142, uptime: '99.9%', model: 'claude-opus-4-7',   region: 'us-east-1' },
  { id: '2', name: 'CodeGen Alpha',      type: 'llm',        status: 'success',  tasks: 87,  uptime: '98.2%', model: 'claude-sonnet-4-6', region: 'us-west-2' },
  { id: '3', name: 'Data Wrangler',      type: 'sequential', status: 'success',  tasks: 203, uptime: '99.5%', model: 'claude-haiku-4-5',  region: 'eu-west-1' },
  { id: '4', name: 'Retrieval Bot',      type: 'a2a',        status: 'warning',  tasks: 56,  uptime: '94.1%', model: 'claude-sonnet-4-6', region: 'ap-northeast-1' },
  { id: '5', name: 'DocBot 3000',        type: 'llm',        status: 'disabled', tasks: 12,  uptime: '0%',    model: 'claude-haiku-4-5',  region: 'us-east-1' },
  { id: '6', name: 'Safety Guard',       type: 'task',       status: 'success',  tasks: 341, uptime: '100%',  model: 'claude-opus-4-7',   region: 'eu-central-1' },
  { id: '7', name: 'Fan-out Worker',     type: 'parallel',   status: 'success',  tasks: 98,  uptime: '97.8%', model: 'claude-sonnet-4-6', region: 'us-east-1' },
  { id: '8', name: 'Loop Optimizer',     type: 'loop',       status: 'warning',  tasks: 44,  uptime: '91.2%', model: 'claude-haiku-4-5',  region: 'us-west-2' },
]

const STATS = [
  { label: 'Total agents',     value: '8',     delta: '+2 this week',  color: 'text-ds-purple' },
  { label: 'Running',          value: '5',     delta: '62.5% of fleet',color: 'text-ds-green' },
  { label: 'Tasks completed',  value: '983',   delta: '+142 today',    color: 'text-ds-cyan' },
  { label: 'Avg uptime',       value: '85.2%', delta: '↓ 1.3% vs last week', color: 'text-ds-orange' },
]

const PAGE_SIZE = 5

export default function DataSurfacesPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Agent[]>([])
  const [page, setPage] = useState(1)

  const filtered = ALL_AGENTS.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.type.toLowerCase().includes(search.toLowerCase())
  )

  const { sorting, setSorting, sortedItems } = useTableSorting(filtered)
  const paginated = sortedItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  const columns: TableColumn<Agent>[] = [
    {
      id: 'name',
      header: 'Agent',
      cell: (item) => <span className="font-medium text-ds-fg">{item.name}</span>,
      sortingField: 'name',
    },
    {
      id: 'type',
      header: 'Type',
      cell: (item) => (
        <Badge variant="muted" className="font-mono text-[9px]">{item.type}</Badge>
      ),
      sortingField: 'type',
    },
    {
      id: 'status',
      header: 'Status',
      cell: (item) => <StatusIndicator status={item.status} />,
    },
    {
      id: 'tasks',
      header: 'Tasks',
      cell: (item) => <span className="font-mono text-ds-cyan">{item.tasks}</span>,
      sortingField: 'tasks',
      align: 'right',
    },
    {
      id: 'uptime',
      header: 'Uptime',
      cell: (item) => (
        <span className={item.status === 'disabled' ? 'text-ds-comment font-mono' : 'text-ds-green font-mono'}>
          {item.uptime}
        </span>
      ),
      align: 'right',
    },
    {
      id: 'model',
      header: 'Model',
      cell: (item) => <code className="text-[10px] text-ds-orange">{item.model}</code>,
    },
    {
      id: 'region',
      header: 'Region',
      cell: (item) => <span className="text-xs text-ds-comment font-mono">{item.region}</span>,
      sortingField: 'region',
    },
  ]

  return (
    <div className="space-y-10 max-w-5xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">04.05</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Data Surfaces</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Composition pattern for data-heavy views: stats cards → search/filter bar → sortable table → pagination. Built entirely from DS components.
        </p>
      </div>

      {/* Full data surface demo */}
      <DocSection title="Agent fleet dashboard">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {STATS.map((s) => (
            <NeuCard key={s.label} className="p-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-ds-comment mb-1">{s.label}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-ds-comment mt-1">{s.delta}</div>
            </NeuCard>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ds-comment" />
            <Input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search agents…"
              className="pl-8 h-9 text-sm"
            />
          </div>
          <Button variant="outline" size="sm" leftIcon={<Filter className="h-3.5 w-3.5" />}>Filter</Button>
          <Button variant="outline" size="sm" leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>Refresh</Button>
          <div className="ml-auto flex items-center gap-2">
            {selected.length > 0 && (
              <span className="text-xs text-ds-comment">{selected.length} selected</span>
            )}
            <Button variant="outline" size="sm" leftIcon={<Download className="h-3.5 w-3.5" />} disabled={selected.length === 0}>Export</Button>
            <Button size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>Deploy agent</Button>
          </div>
        </div>

        {/* Table */}
        <Table
          items={paginated}
          columns={columns}
          selectionType="multi"
          selectedItems={selected}
          onSelectionChange={setSelected}
          trackBy="id"
          sorting={sorting}
          onSortingChange={setSorting}
          empty={<span className="text-sm text-ds-comment">No agents match "{search}"</span>}
          footer={
            <div className="flex items-center justify-between px-1 mt-2">
              <span className="text-xs text-ds-comment font-mono">
                {filtered.length} agents · {selected.length} selected
              </span>
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          }
        />
      </DocSection>

      <DocSection title="Composition recipe">
        <div className="space-y-2 text-sm">
          {[
            { step: '1', label: 'Stats cards',    comp: '<NeuCard>',         desc: 'Key metrics at the top — 2–4 cards in a grid' },
            { step: '2', label: 'Search + filter',comp: '<Input> + <Button>',desc: 'Left: search. Right: filter, refresh, actions' },
            { step: '3', label: 'Sortable table', comp: '<Table>',           desc: 'sortable columns, multi-select, pagination footer slot' },
            { step: '4', label: 'Pagination',     comp: '<Pagination>',      desc: 'In the Table footer slot — never float independently' },
          ].map((row) => (
            <div key={row.step} className="flex items-start gap-4 py-2.5 border-b border-ds-current/20">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ds-purple/20 text-ds-purple text-[11px] font-black flex items-center justify-center">{row.step}</span>
              <div className="flex-1 grid grid-cols-3 gap-2">
                <span className="text-ds-fg font-medium text-xs">{row.label}</span>
                <code className="text-ds-purple text-[11px]">{row.comp}</code>
                <span className="text-ds-comment text-[12px]">{row.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </DocSection>
    </div>
  )
}
