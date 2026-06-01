import { Popover, PopoverTrigger, PopoverContent, PopoverItem, PopoverSeparator, Button } from '@shieldai/ds'
import { Copy, Settings, Trash2, LogOut } from 'lucide-react'
import { ComponentBlock } from '../../components/docs'

const CODE = `import {
  Popover, PopoverTrigger, PopoverContent,
  PopoverItem, PopoverSeparator,
} from '@shieldai/ds'
import { Copy, Settings, Trash2 } from 'lucide-react'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverItem icon={<Copy />}>Duplicate</PopoverItem>
    <PopoverItem icon={<Settings />}>Settings</PopoverItem>
    <PopoverSeparator />
    <PopoverItem icon={<Trash2 />} danger>Delete</PopoverItem>
  </PopoverContent>
</Popover>`

const PROPS = [
  { name: 'icon', type: 'ReactNode', description: 'Icon rendered before the label (PopoverItem)' },
  { name: 'danger', type: 'boolean', default: 'false', description: 'Renders the item in destructive red (PopoverItem)' },
  { name: 'side', type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: 'Preferred position (PopoverContent)' },
  { name: 'align', type: '"start" | "center" | "end"', default: '"start"', description: 'Alignment relative to trigger (PopoverContent)' },
]

export default function PopoverPage() {
  return (
    <ComponentBlock
      num="02.13"
      title="Popover"
      tag="dropdown menu · danger variant · portal"
      description="Context menu built on Radix Popover. Renders via portal to escape overflow. PopoverItem supports an icon slot and a destructive danger mode."
      preview={
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Menu</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverItem icon={<Copy className="h-3.5 w-3.5" />}>Duplicate</PopoverItem>
            <PopoverItem icon={<Settings className="h-3.5 w-3.5" />}>Settings</PopoverItem>
            <PopoverItem icon={<LogOut className="h-3.5 w-3.5" />}>Export</PopoverItem>
            <PopoverSeparator />
            <PopoverItem icon={<Trash2 className="h-3.5 w-3.5" />} danger>Delete</PopoverItem>
          </PopoverContent>
        </Popover>
      }
      code={CODE}
      filename="Popover.tsx"
      props={PROPS}
    />
  )
}
