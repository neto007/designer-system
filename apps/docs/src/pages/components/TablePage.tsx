import { useState } from 'react'
import { Table, useTableSorting, Badge, StatusIndicator, Pagination } from '@shieldai/ds'
import type { TableColumn } from '@shieldai/ds'
import { ComponentBlock, DocSection, PreviewRow } from '../../components/docs'

interface Agent {
  id: string
  name: string
  type: string
  status: 'success' | 'running' | 'warning' | 'error' | 'disabled'
  tasks: number
  uptime: string
}

const AGENTS: Agent[] = [
  { id: 'a1', name: 'Orchestrator Prime', type: 'Orchestrator', status: 'success',  tasks: 142, uptime: '99.9%' },
  { id: 'a2', name: 'CodeGen Alpha',      type: 'Coder',        status: 'running',  tasks: 87,  uptime: '98.2%' },
  { id: 'a3', name: 'Data Wrangler',      type: 'Executor',     status: 'success',  tasks: 203, uptime: '99.5%' },
  { id: 'a4', name: 'Retrieval Bot',      type: 'Retriever',    status: 'warning',  tasks: 56,  uptime: '94.1%' },
  { id: 'a5', name: 'DocBot 3000',        type: 'Researcher',   status: 'disabled', tasks: 12,  uptime: '0%' },
  { id: 'a6', name: 'Safety Guard',       type: 'Evaluator',    status: 'success',  tasks: 341, uptime: '100%' },
]

const COLUMNS: TableColumn<Agent>[] = [
  {
    id: 'name',
    header: 'Agent Name',
    cell: (item) => <span className="font-medium text-ds-fg">{item.name}</span>,
    sortingField: 'name',
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item) => <Badge variant="muted" className="font-mono text-[10px]">{item.type}</Badge>,
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
      <span className={item.status === 'disabled' ? 'text-ds-comment' : 'text-ds-green font-mono'}>
        {item.uptime}
      </span>
    ),
    align: 'right',
  },
]

const CODE_BASIC = `import { Table, useTableSorting } from '@shieldai/ds'
import type { TableColumn } from '@shieldai/ds'

interface Agent { id: string; name: string; tasks: number }

const columns: TableColumn<Agent>[] = [
  { id: 'name', header: 'Name', cell: (item) => item.name, sortingField: 'name' },
  { id: 'tasks', header: 'Tasks', cell: (item) => item.tasks, sortingField: 'tasks', align: 'right' },
]

function AgentTable({ agents }: { agents: Agent[] }) {
  const { sorting, setSorting, sortedItems } = useTableSorting(agents)

  return (
    <Table
      items={sortedItems}
      columns={columns}
      trackBy="id"
      sorting={sorting}
      onSortingChange={setSorting}
    />
  )
}`

const CODE_SELECTION = `const [selected, setSelected] = useState<Agent[]>([])

<Table
  items={agents}
  columns={columns}
  selectionType="multi"
  selectedItems={selected}
  onSelectionChange={setSelected}
  trackBy="id"
/>`

const CODE_STATES = `// Loading
<Table items={[]} columns={columns} loading loadingText="Fetching agents…" />

// Empty
<Table
  items={[]}
  columns={columns}
  empty={<span>No agents found. Deploy one to get started.</span>}
/>

// Striped + compact
<Table items={agents} columns={columns} stripedRows compact />`

const PROPS = [
  { name: 'items', type: 'T[]', default: '—', description: 'Data array to render' },
  { name: 'columns', type: 'TableColumn<T>[]', default: '—', description: 'Column definitions with id, header, and cell renderer' },
  { name: 'selectionType', type: '"none" | "single" | "multi"', default: '"none"', description: 'Row selection mode' },
  { name: 'selectedItems', type: 'T[]', default: '[]', description: 'Controlled selected items' },
  { name: 'onSelectionChange', type: '(items: T[]) => void', default: '—', description: 'Fires when selection changes' },
  { name: 'trackBy', type: 'keyof T | (item: T) => string', default: '—', description: 'Unique key per row for stable rendering' },
  { name: 'sorting', type: 'SortingState<T>', default: 'undefined', description: 'Controlled sort state (column + direction)' },
  { name: 'onSortingChange', type: '(state: SortingState<T>) => void', default: '—', description: 'Fires when a sortable header is clicked' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Replaces rows with skeleton loaders' },
  { name: 'loadingText', type: 'string', default: '"Loading…"', description: 'Text shown below skeleton rows' },
  { name: 'empty', type: 'ReactNode', default: '"No items found."', description: 'Displayed when items is empty and not loading' },
  { name: 'header', type: 'ReactNode', default: '—', description: 'Slot rendered above the table border' },
  { name: 'footer', type: 'ReactNode', default: '—', description: 'Slot rendered below the table border' },
  { name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Fixes the header row while body scrolls' },
  { name: 'stripedRows', type: 'boolean', default: 'false', description: 'Alternates row backgrounds' },
  { name: 'compact', type: 'boolean', default: 'false', description: 'Reduces cell vertical padding' },
]

function BasicDemo() {
  const { sorting, setSorting, sortedItems } = useTableSorting(AGENTS)
  return (
    <Table
      items={sortedItems}
      columns={COLUMNS}
      trackBy="id"
      sorting={sorting}
      onSortingChange={setSorting}
    />
  )
}

function SelectionDemo() {
  const [selected, setSelected] = useState<Agent[]>([])
  const { sorting, setSorting, sortedItems } = useTableSorting(AGENTS)
  return (
    <div className="space-y-2">
      <Table
        items={sortedItems}
        columns={COLUMNS}
        selectionType="multi"
        selectedItems={selected}
        onSelectionChange={setSelected}
        trackBy="id"
        sorting={sorting}
        onSortingChange={setSorting}
        footer={
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-ds-comment">
              {selected.length} of {AGENTS.length} selected
            </span>
            <Pagination page={1} totalPages={3} onPageChange={() => {}} />
          </div>
        }
      />
    </div>
  )
}

export default function TablePage() {
  return (
    <ComponentBlock
      num="03.01"
      title="Table"
      tag="sortable · selectable · loading · empty"
      description="Data table with sortable columns, multi/single row selection, skeleton loading state, empty state, and optional sticky header. Use useTableSorting for client-side sorting."
      preview={<BasicDemo />}
      code={CODE_BASIC}
      props={PROPS}
    >
      <DocSection title="Multi-selection + pagination footer">
        <SelectionDemo />
        <div className="mt-2 font-mono text-xs text-ds-comment">{CODE_SELECTION}</div>
      </DocSection>

      <DocSection title="States">
        <PreviewRow label="loading">
          <div className="w-full">
            <Table items={[]} columns={COLUMNS.slice(0, 3)} loading loadingText="Fetching agents…" />
          </div>
        </PreviewRow>
        <PreviewRow label="empty">
          <div className="w-full">
            <Table
              items={[]}
              columns={COLUMNS.slice(0, 3)}
              empty={<span className="text-ds-comment text-sm">No agents deployed. Start one to see data here.</span>}
            />
          </div>
        </PreviewRow>
        <PreviewRow label="striped + compact">
          <div className="w-full">
            <Table items={AGENTS.slice(0, 4)} columns={COLUMNS.slice(0, 3)} stripedRows compact />
          </div>
        </PreviewRow>
        <div className="mt-2 font-mono text-xs text-ds-comment">{CODE_STATES}</div>
      </DocSection>
    </ComponentBlock>
  )
}
