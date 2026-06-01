import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogClose,
  Button, Input, Textarea,
} from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

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
    />
  )
}
