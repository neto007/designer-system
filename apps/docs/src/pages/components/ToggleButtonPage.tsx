import { useState } from 'react'
import { ToggleButton } from '@shieldai/ds'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Pin, Bell } from 'lucide-react'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { ToggleButton } from '@shieldai/ds'

// Controlled
const [bold, setBold] = useState(false)
<ToggleButton pressed={bold} onChange={setBold}>
  Bold
</ToggleButton>

// Sizes
<ToggleButton size="sm">Small</ToggleButton>
<ToggleButton size="md">Medium</ToggleButton>
<ToggleButton size="lg">Large</ToggleButton>

// Icon toolbar
<ToggleButton pressed={alignLeft} onChange={setAlignLeft}>
  <AlignLeft className="h-4 w-4" />
</ToggleButton>`

const PROPS = [
  { name: 'pressed', type: 'boolean', default: 'false', description: 'Whether the button is in the pressed/active state' },
  { name: 'onChange', type: '(pressed: boolean) => void', default: '—', description: 'Called with the new pressed state on click' },
  { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button height and horizontal padding' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Button label or icon' },
]

function LiveDemo() {
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left')
  const [pinned, setPinned] = useState(false)
  const [notif, setNotif] = useState(true)

  return (
    <div className="space-y-4 w-full">
      <PreviewRow label="text formatting">
        <ToggleButton pressed={bold}      onChange={setBold}      size="sm"><Bold className="h-3.5 w-3.5" /></ToggleButton>
        <ToggleButton pressed={italic}    onChange={setItalic}    size="sm"><Italic className="h-3.5 w-3.5" /></ToggleButton>
        <ToggleButton pressed={underline} onChange={setUnderline} size="sm"><Underline className="h-3.5 w-3.5" /></ToggleButton>
      </PreviewRow>

      <PreviewRow label="alignment (exclusive)">
        <ToggleButton pressed={align === 'left'}   onChange={() => setAlign('left')}   size="sm"><AlignLeft className="h-3.5 w-3.5" /></ToggleButton>
        <ToggleButton pressed={align === 'center'} onChange={() => setAlign('center')} size="sm"><AlignCenter className="h-3.5 w-3.5" /></ToggleButton>
        <ToggleButton pressed={align === 'right'}  onChange={() => setAlign('right')}  size="sm"><AlignRight className="h-3.5 w-3.5" /></ToggleButton>
      </PreviewRow>

      <PreviewRow label="sizes">
        <ToggleButton pressed={pinned} onChange={setPinned} size="sm"><Pin className="h-3 w-3" />Pin</ToggleButton>
        <ToggleButton pressed={pinned} onChange={setPinned} size="md"><Pin className="h-4 w-4" />Pin</ToggleButton>
        <ToggleButton pressed={pinned} onChange={setPinned} size="lg"><Pin className="h-5 w-5" />Pin</ToggleButton>
      </PreviewRow>

      <PreviewRow label="with text">
        <ToggleButton pressed={notif} onChange={setNotif} size="md">
          <Bell className="h-4 w-4" />
          {notif ? 'Notifications on' : 'Notifications off'}
        </ToggleButton>
        <ToggleButton pressed={false} disabled size="md">Disabled</ToggleButton>
      </PreviewRow>
    </div>
  )
}

export default function ToggleButtonPage() {
  return (
    <ComponentBlock
      num="02.TB"
      title="Toggle Button"
      tag="aria-pressed · controlled · 3 sizes"
      description="Button that maintains a pressed/active state. Uses aria-pressed for accessibility. Suitable for toolbars, formatting controls, and binary feature toggles. Unlike Toggle (which renders a switch), ToggleButton looks like a button."
      preview={<LiveDemo />}
      code={CODE}
      filename="ToggleButton.tsx"
      props={PROPS}
    />
  )
}
