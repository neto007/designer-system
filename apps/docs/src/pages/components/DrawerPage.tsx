import { useState } from 'react'
import { Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, Button, Input, Textarea } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import {
  Drawer, DrawerHeader, DrawerTitle, DrawerDescription,
  DrawerBody, DrawerFooter,
} from '@shieldai/ds'

function AgentDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>

      <Drawer side="right" open={open} onOpenChange={setOpen}>
        <DrawerHeader onClose={() => setOpen(false)}>
          <DrawerTitle>Configure Agent</DrawerTitle>
          <DrawerDescription>Set model and system prompt.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <Input placeholder="Agent name" />
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="neu-green">Save</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}`

const PROPS = [
  { name: 'side', type: '"right" | "left" | "bottom"', default: '"right"', description: 'Which edge the drawer slides in from' },
  { name: 'open', type: 'boolean', description: 'Controlled open state' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when open state changes' },
  { name: 'trigger', type: 'ReactNode', description: 'Optional trigger element (wraps in DialogTrigger)' },
]

function Demo() {
  const [right, setRight] = useState(false)
  const [left, setLeft] = useState(false)
  const [bottom, setBottom] = useState(false)

  return (
    <PreviewRow label="click to open each side">
      <Button variant="outline" onClick={() => setRight(true)}>Right Drawer</Button>
      <Button variant="outline" onClick={() => setLeft(true)}>Left Drawer</Button>
      <Button variant="outline" onClick={() => setBottom(true)}>Bottom Sheet</Button>

      <Drawer side="right" open={right} onOpenChange={setRight}>
        <DrawerHeader onClose={() => setRight(false)}>
          <DrawerTitle>Configure Agent</DrawerTitle>
          <DrawerDescription>Set model and system prompt.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="space-y-3">
          <Input placeholder="Agent name" />
          <Textarea placeholder="System prompt" rows={5} />
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => setRight(false)}>Cancel</Button>
          <Button variant="neu-green">Save</Button>
        </DrawerFooter>
      </Drawer>

      <Drawer side="left" open={left} onOpenChange={setLeft}>
        <DrawerHeader onClose={() => setLeft(false)}>
          <DrawerTitle>Navigation</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-ds-comment text-sm">Left drawer — sidebar panel pattern.</p>
        </DrawerBody>
      </Drawer>

      <Drawer side="bottom" open={bottom} onOpenChange={setBottom}>
        <DrawerHeader onClose={() => setBottom(false)}>
          <DrawerTitle>Quick Actions</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-ds-comment text-sm">Bottom sheet — mobile action panel pattern.</p>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => setBottom(false)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </PreviewRow>
  )
}

export default function DrawerPage() {
  return (
    <ComponentBlock
      num="02.30"
      title="Drawer"
      tag="3 sides · portal · focus trap"
      description="Slide-in panel built on Radix Dialog. Renders via portal with backdrop blur and focus trap. Three sides — right (detail panels), left (navigation), bottom (mobile sheets)."
      preview={<Demo />}
      code={CODE}
      filename="Drawer.tsx"
      props={PROPS}
    />
  )
}
