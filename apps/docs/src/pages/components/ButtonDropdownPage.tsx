import { ButtonDropdown } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

export default function ButtonDropdownPage() {
  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold text-ds-fg mb-8">Button Dropdown</h1>

      <ComponentBlock
        num="1"
        title="Basic"
        description="A Button that reveals a dropdown menu of grouped actions."
        preview={
          <ButtonDropdown
            label="Actions"
            items={[
              { id: 'edit', label: 'Edit' },
            ]}
          />
        }
        code={`<ButtonDropdown
  label="Actions"
  items={[{ id: 'edit', label: 'Edit' }]}
/>`}
        props={[
          { name: 'label', type: 'ReactNode', default: '—', description: 'Button label' },
          { name: 'items', type: '(DropdownItem | DropdownGroup)[]', default: '[]', description: 'Array of items or groups' },
          { name: 'variant', type: 'ButtonProps["variant"]', default: 'outline', description: 'Button variant' },
          { name: 'size', type: 'ButtonProps["size"]', default: '—', description: 'Button size' },
          { name: 'placement', type: "'bottom-start' | 'bottom-end'", default: "'bottom-start'", description: 'Dropdown placement' },
          { name: 'onItemClick', type: '(item: DropdownItem) => void', default: '—', description: 'Item click handler' },
        ]}
      />

      <ComponentBlock
        num="2"
        title="Grouped Items"
        description="Items can be grouped into logical sections."
        preview={
          <div className="flex gap-4">
            <ButtonDropdown
              label="More"
              items={[
                {
                  label: 'View & Edit',
                  items: [
                    { id: 'view', label: 'View details' },
                    { id: 'edit', label: 'Edit' },
                  ],
                },
                {
                  label: 'Danger Zone',
                  items: [
                    { id: 'delete', label: 'Delete', danger: true },
                  ],
                },
              ]}
            />
            <ButtonDropdown
              label="Export"
              variant="outline"
              items={[
                { id: 'csv', label: 'Export as CSV' },
                { id: 'json', label: 'Export as JSON' },
                { id: 'pdf', label: 'Export as PDF' },
              ]}
            />
          </div>
        }
        code={`const items = [
  {
    label: 'View & Edit',
    items: [
      { id: 'view', label: 'View details' },
      { id: 'edit', label: 'Edit' },
    ],
  },
  {
    label: 'Danger Zone',
    items: [
      { id: 'delete', label: 'Delete', danger: true },
    ],
  },
]

<ButtonDropdown label="More" items={items} />`}
      />

      <ComponentBlock
        num="3"
        title="Button Variants"
        description="All button variants can be used as the trigger."
        preview={
          <div className="flex flex-wrap gap-3">
            <ButtonDropdown label="Default" items={[{ id: '1', label: 'Action' }]} variant="default" />
            <ButtonDropdown label="Purple" items={[{ id: '2', label: 'Action' }]} variant="neu-purple" />
            <ButtonDropdown label="Outline" items={[{ id: '3', label: 'Action' }]} variant="outline" />
            <ButtonDropdown label="Ghost" items={[{ id: '4', label: 'Action' }]} variant="ghost" />
          </div>
        }
        code={`<ButtonDropdown label="Default" variant="default" items={[{id:'1',label:'Action'}]} />
<ButtonDropdown label="Purple" variant="neu-purple" items={[{id:'2',label:'Action'}]} />
<ButtonDropdown label="Outline" variant="outline" items={[{id:'3',label:'Action'}]} />
<ButtonDropdown label="Ghost" variant="ghost" items={[{id:'4',label:'Action'}]} />`}
      />
    </div>
  )
}
