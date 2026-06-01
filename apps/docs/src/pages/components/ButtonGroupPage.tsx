import { useState } from 'react'
import { ButtonGroup, ButtonDropdown, Button } from '@shieldai/ds'
import type { DropdownItem } from '@shieldai/ds'
import { List, Grid, BarChart2, Copy, Trash2, Pencil, MoreHorizontal, Download, Settings, ExternalLink } from 'lucide-react'
import { ComponentBlock, DocSection, PreviewRow } from '../../components/docs'

const CODE_GROUP = `import { ButtonGroup, Button } from '@shieldai/ds'

// Horizontal (default)
<ButtonGroup aria-label="View mode">
  <Button variant="outline" size="sm">List</Button>
  <Button variant="outline" size="sm">Grid</Button>
  <Button variant="outline" size="sm">Chart</Button>
</ButtonGroup>

// Vertical
<ButtonGroup orientation="vertical" aria-label="Actions">
  <Button variant="outline">Edit</Button>
  <Button variant="outline">Duplicate</Button>
  <Button variant="outline" className="text-ds-red hover:text-ds-red">Delete</Button>
</ButtonGroup>`

const CODE_DROPDOWN = `import { ButtonDropdown } from '@shieldai/ds'
import type { DropdownItem } from '@shieldai/ds'

const items = [
  { id: 'edit',   label: 'Edit',   icon: <Pencil className="h-3.5 w-3.5" /> },
  { id: 'copy',   label: 'Copy',   icon: <Copy   className="h-3.5 w-3.5" /> },
  { id: 'delete', label: 'Delete', icon: <Trash2 className="h-3.5 w-3.5" />, danger: true },
]

<ButtonDropdown
  label="Actions"
  items={items}
  onItemClick={(item) => console.log(item.id)}
/>

// Grouped items
<ButtonDropdown
  label="More"
  items={[
    { label: 'Export', items: [
      { id: 'csv', label: 'Download CSV' },
      { id: 'json', label: 'Download JSON' },
    ]},
    { items: [{ id: 'delete', label: 'Delete', danger: true }] },
  ]}
/>`

const PROPS_GROUP = [
  { name: 'children', type: 'ReactNode', default: '—', description: 'Button elements to group' },
  { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Layout direction' },
  { name: 'aria-label', type: 'string', default: '—', description: 'Accessible label for the group' },
]

const PROPS_DROPDOWN = [
  { name: 'label', type: 'ReactNode', default: '—', description: 'Button label (chevron is auto-appended)' },
  { name: 'items', type: '(DropdownItem | DropdownGroup)[]', default: '—', description: 'Flat list of items or grouped sections' },
  { name: 'onItemClick', type: '(item: DropdownItem) => void', default: '—', description: 'Fires when a menu item is clicked' },
  { name: 'placement', type: '"bottom-start" | "bottom-end"', default: '"bottom-start"', description: 'Dropdown alignment relative to trigger' },
  { name: 'variant', type: 'ButtonVariant', default: '"outline"', description: 'Inherits all Button variants' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger' },
]

function GroupDemo() {
  const [view, setView] = useState<'list' | 'grid' | 'chart'>('list')
  return (
    <PreviewRow label="view switcher">
      <ButtonGroup aria-label="View mode">
        <Button
          variant={view === 'list' ? 'default' : 'outline'}
          size="sm"
          leftIcon={<List className="h-3.5 w-3.5" />}
          onClick={() => setView('list')}
        >List</Button>
        <Button
          variant={view === 'grid' ? 'default' : 'outline'}
          size="sm"
          leftIcon={<Grid className="h-3.5 w-3.5" />}
          onClick={() => setView('grid')}
        >Grid</Button>
        <Button
          variant={view === 'chart' ? 'default' : 'outline'}
          size="sm"
          leftIcon={<BarChart2 className="h-3.5 w-3.5" />}
          onClick={() => setView('chart')}
        >Chart</Button>
      </ButtonGroup>
    </PreviewRow>
  )
}

const ACTIONS: DropdownItem[] = [
  { id: 'edit',   label: 'Edit',     icon: <Pencil  className="h-3.5 w-3.5" /> },
  { id: 'copy',   label: 'Duplicate', icon: <Copy   className="h-3.5 w-3.5" /> },
  { id: 'export', label: 'Export',   icon: <Download className="h-3.5 w-3.5" /> },
  { id: 'open',   label: 'Open in new tab', icon: <ExternalLink className="h-3.5 w-3.5" />, description: 'Opens in a new browser tab' },
]

const GROUPED_ITEMS = [
  {
    label: 'Manage',
    items: [
      { id: 'settings', label: 'Settings', icon: <Settings className="h-3.5 w-3.5" /> },
      { id: 'export',   label: 'Export',   icon: <Download className="h-3.5 w-3.5" /> },
    ],
  },
  {
    items: [
      { id: 'delete', label: 'Delete agent', icon: <Trash2 className="h-3.5 w-3.5" />, danger: true },
    ],
  },
]

export default function ButtonGroupPage() {
  return (
    <ComponentBlock
      num="02.19"
      title="Button Group & Dropdown"
      tag="group · dropdown · actions"
      description="ButtonGroup joins multiple buttons visually into a single control. ButtonDropdown exposes multiple actions behind a single trigger with optional groups and danger items."
      preview={
        <div className="flex flex-wrap items-start gap-4">
          <GroupDemo />
          <PreviewRow label="dropdown">
            <ButtonDropdown
              label="Actions"
              items={ACTIONS}
              onItemClick={(item) => console.log(item.id)}
            />
            <ButtonDropdown
              label={<MoreHorizontal className="h-4 w-4" />}
              items={GROUPED_ITEMS}
              variant="ghost"
              onItemClick={(item) => console.log(item.id)}
            />
          </PreviewRow>
        </div>
      }
      code={CODE_GROUP}
      props={PROPS_GROUP}
    >
      <DocSection title="ButtonDropdown — grouped items">
        <PreviewRow label="grouped">
          <ButtonDropdown
            label="Manage agent"
            items={GROUPED_ITEMS}
            onItemClick={(item) => console.log(item.id)}
          />
          <ButtonDropdown
            label="Actions"
            items={GROUPED_ITEMS}
            variant="neu-purple"
            placement="bottom-end"
            onItemClick={(item) => console.log(item.id)}
          />
        </PreviewRow>
        <div className="mt-3 font-mono text-xs text-ds-comment whitespace-pre">{CODE_DROPDOWN}</div>
      </DocSection>

      <DocSection title="ButtonGroup — vertical">
        <PreviewRow label="vertical">
          <ButtonGroup orientation="vertical" aria-label="Row actions">
            <Button variant="outline" size="sm" leftIcon={<Pencil className="h-3.5 w-3.5" />}>Edit</Button>
            <Button variant="outline" size="sm" leftIcon={<Copy className="h-3.5 w-3.5" />}>Duplicate</Button>
            <Button variant="outline" size="sm" leftIcon={<Trash2 className="h-3.5 w-3.5" />} className="text-ds-red border-ds-red hover:bg-ds-red/10">Delete</Button>
          </ButtonGroup>
        </PreviewRow>
      </DocSection>

      <DocSection title="ButtonDropdown — props">
        {PROPS_DROPDOWN.map((p) => (
          <div key={p.name} className="grid grid-cols-4 gap-2 py-1.5 border-b border-ds-current/20 text-sm">
            <code className="text-ds-purple">{p.name}</code>
            <span className="text-ds-cyan text-xs font-mono col-span-2">{p.type}</span>
            <span className="text-ds-comment text-xs">{p.description}</span>
          </div>
        ))}
      </DocSection>
    </ComponentBlock>
  )
}
