import { useState } from 'react'
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogClose,
  Button, Input, Textarea,
} from '@shieldai/ds'
import { ComponentBlock, DocSection, PreviewRow, PlaygroundBlock } from '../../components/docs'
import type { ControlValues } from '../../components/docs'

const CODE = `import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogClose,
} from '@shieldai/ds'

// Default variant
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>This will affect your agent config.</DialogDescription>
    </DialogHeader>
    <p className="text-sm text-ds-comment">Dialog body content.</p>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Neobrutalism variant
<Dialog>
  <DialogTrigger asChild>
    <Button variant="neu-purple">New Agent</Button>
  </DialogTrigger>
  <DialogContent variant="neu">
    <DialogHeader>
      <DialogTitle>New Agent</DialogTitle>
    </DialogHeader>
    <Input variant="neu-purple" placeholder="Agent name" />
    <DialogFooter>
      <Button variant="neu-green">Create</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`

const PROPS = [
  { name: 'variant', type: '"default" | "neu" | "purple"', default: '"default"', description: 'Visual style of DialogContent' },
]

const PLAYGROUND_CONTROLS = [
  { type: 'select' as const, key: 'variant', label: 'variant', default: 'default', options: ['default', 'neu', 'purple'] },
  { type: 'boolean' as const, key: 'showClose', label: 'showClose', default: true },
  { type: 'text' as const, key: 'title', label: 'title', default: 'Confirm Action' },
  { type: 'text' as const, key: 'description', label: 'description', default: 'Are you sure you want to proceed with this action?' },
]

function generateDialogCode(v: ControlValues): string {
  const openTrigger = v.variant === 'default' ? 'outline' : 'neu-purple'
  let lines = `import { useState } from 'react'\nimport { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button } from '@shieldai/ds'\n\n`
  lines += 'export default function Example() {\n'
  lines += '  const [open, setOpen] = useState(false)\n\n'
  lines += '  return (\n'
  lines += '    <Dialog open={open} onOpenChange={setOpen}>\n'
  lines += '      <DialogTrigger asChild>\n'
  lines += `        <Button variant="${openTrigger}">Open Dialog</Button>\n`
  lines += '      </DialogTrigger>\n'
  lines += `      <DialogContent variant="${v.variant}" showClose={${v.showClose}}>\n`
  lines += '        <DialogHeader>\n'
  lines += `          <DialogTitle>${v.title}</DialogTitle>\n`
  lines += `          <DialogDescription>${v.description}</DialogDescription>\n`
  lines += '        </DialogHeader>\n'
  lines += '        <DialogFooter>\n'
  lines += '          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>\n'
  lines += '          <Button variant="neu-purple" onClick={() => setOpen(false)}>Confirm</Button>\n'
  lines += '        </DialogFooter>\n'
  lines += '      </DialogContent>\n'
  lines += '    </Dialog>\n'
  lines += '  )\n'
  lines += '}'
  return lines
}

export default function DialogPage() {
  return (
    <ComponentBlock
      num="02.14"
      title="Dialog"
      tag="3 variants · focus trap · keyboard · portal"
      description="Modal dialog built on Radix Dialog with focus trap, keyboard dismissal, and backdrop blur. Three visual variants for different contexts."
      preview={
        <PreviewRow>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Default Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogDescription>This will affect your agent configuration.</DialogDescription>
              </DialogHeader>
              <p className="text-sm text-ds-comment">All running jobs will be paused.</p>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="neu-purple">Neu Dialog</Button>
            </DialogTrigger>
            <DialogContent variant="neu">
              <DialogHeader>
                <DialogTitle>New Agent</DialogTitle>
                <DialogDescription>Configure your autonomous agent.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <Input variant="neu-purple" placeholder="Agent name" />
                <Textarea variant="neu-purple" placeholder="System prompt" rows={3} />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button variant="neu-green">Create Agent</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PreviewRow>
      }
      code={CODE}
      filename="Dialog.tsx"
      props={PROPS}
    >
      <DocSection title="Interactive Playground">
        <p className="text-ds-comment text-[13px] leading-relaxed mb-4">
          Tweak props on the right and see the result live. The generated code updates instantly.
        </p>
        <PlaygroundBlock
          controls={PLAYGROUND_CONTROLS}
          render={(v) => {
            const [open, setOpen] = useState(false)
            return (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant={v.variant === 'default' ? 'outline' : 'neu-purple'}>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent variant={v.variant as 'default' | 'neu' | 'purple'} showClose={v.showClose as boolean}>
                  <DialogHeader>
                    <DialogTitle>{v.title as string}</DialogTitle>
                    <DialogDescription>{v.description as string}</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="neu-purple" onClick={() => setOpen(false)}>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )
          }}
          generateCode={generateDialogCode}
          filename="Dialog.tsx"
        />
      </DocSection>
    </ComponentBlock>
  )
}
