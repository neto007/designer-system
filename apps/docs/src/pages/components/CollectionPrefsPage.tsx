import { useState } from 'react'
import { CollectionPreferences, Button } from '@shieldai/ds'
import type { ColumnPreference } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { CollectionPreferences } from '@shieldai/ds'

const [open, setOpen] = useState(false)
const [columns, setColumns] = useState([
  { id: 'name',   label: 'Name',   visible: true,  required: true },
  { id: 'status', label: 'Status', visible: true },
  { id: 'type',   label: 'Type',   visible: true },
  { id: 'region', label: 'Region', visible: false },
])
const [pageSize, setPageSize] = useState(25)

<Button onClick={() => setOpen(true)}>Preferences</Button>

<CollectionPreferences
  open={open}
  onClose={() => setOpen(false)}
  columns={columns}
  onColumnsChange={setColumns}
  pageSize={pageSize}
  onPageSizeChange={setPageSize}
/>`

const PROPS = [
  { name: 'open', type: 'boolean', default: '—', description: 'Controls dialog visibility' },
  { name: 'onClose', type: '() => void', default: '—', description: 'Called when the dialog should close' },
  { name: 'columns', type: 'ColumnPreference[]', default: '[]', description: 'Array of { id, label, visible, required? } — required columns cannot be hidden' },
  { name: 'onColumnsChange', type: '(cols: ColumnPreference[]) => void', default: '—', description: 'Called on Save with the updated column array' },
  { name: 'pageSize', type: 'number', default: '10', description: 'Initial page size selection' },
  { name: 'onPageSizeChange', type: '(size: number) => void', default: '—', description: 'Called on Save with the selected page size' },
  { name: 'pageSizeOptions', type: 'number[]', default: '[10, 25, 50, 100]', description: 'Available page size choices' },
  { name: 'title', type: 'string', default: '"Preferences"', description: 'Dialog title' },
]

const INITIAL_COLS: ColumnPreference[] = [
  { id: 'name',     label: 'Name',        visible: true,  required: true },
  { id: 'status',   label: 'Status',      visible: true },
  { id: 'type',     label: 'Agent type',  visible: true },
  { id: 'region',   label: 'Region',      visible: false },
  { id: 'owner',    label: 'Owner',       visible: false },
  { id: 'created',  label: 'Created at',  visible: true },
]

function LiveDemo() {
  const [open, setOpen] = useState(false)
  const [cols, setCols] = useState(INITIAL_COLS)
  const [pageSize, setPageSize] = useState(25)

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-3">
        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
          Table preferences
        </Button>
        <span className="text-xs text-ds-comment">
          {cols.filter(c => c.visible).length}/{cols.length} cols · {pageSize} per page
        </span>
      </div>

      <div className="border border-ds-current rounded-ds-md overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-ds-panel border-b border-ds-current text-ds-comment">
              {cols.filter(c => c.visible).map(c => (
                <th key={c.id} className="text-left px-3 py-2 font-mono">{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map(i => (
              <tr key={i} className="border-b border-ds-current/50">
                {cols.filter(c => c.visible).map(c => (
                  <td key={c.id} className="px-3 py-2 text-ds-fg/70">—</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CollectionPreferences
        open={open}
        onClose={() => setOpen(false)}
        columns={cols}
        onColumnsChange={setCols}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
    </div>
  )
}

export default function CollectionPrefsPage() {
  return (
    <ComponentBlock
      num="02.CP"
      title="Collection Preferences"
      tag="column visibility · page size · dialog"
      description="Dialog for configuring table preferences: toggle column visibility (required columns are locked) and select items per page. Saves all changes atomically on confirm."
      preview={<LiveDemo />}
      code={CODE}
      filename="CollectionPreferences.tsx"
      props={PROPS}
    />
  )
}
