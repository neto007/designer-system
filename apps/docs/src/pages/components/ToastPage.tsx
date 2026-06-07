import { Button, useToast } from '@shieldai/ds'
import { ComponentBlock, DocSection, PlaygroundBlock } from '../../components/docs'
import type { ControlValues } from '../../components/docs'

const CODE = `import { useToast, ToastProvider, Toaster } from '@shieldai/ds'

// Wrap your app with ToastProvider
function App() {
  return (
    <ToastProvider>
      <YourApp />
      <Toaster />
    </ToastProvider>
  )
}

// Use inside any component
function MyComponent() {
  const { toast, dismiss } = useToast()

  return (
    <Button onClick={() => toast({
      variant: 'success',
      title: 'Saved!',
      description: 'Changes persisted to the database.',
    })}>
      Save
    </Button>
  )
}

// All variants
toast({ variant: 'success', title: 'Success', description: '...' })
toast({ variant: 'error',   title: 'Error',   description: '...' })
toast({ variant: 'info',    title: 'Info',     description: '...' })
toast({ variant: 'warning', title: 'Warning',  description: '...' })`

const PROPS = [
  { name: 'variant', type: '"success" | "error" | "info" | "warning"', required: true, description: 'Semantic color and icon' },
  { name: 'title', type: 'string', required: true, description: 'Toast heading' },
  { name: 'description', type: 'string', description: 'Secondary text below the title' },
  { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss delay in milliseconds' },
]

const PLAYGROUND_CONTROLS = [
  { type: 'text' as const, key: 'title', label: 'title', default: 'Operation completed' },
  { type: 'text' as const, key: 'description', label: 'description', default: 'Your changes have been saved successfully.' },
  { type: 'select' as const, key: 'variant', label: 'variant', default: 'success', options: ['success', 'error', 'info', 'warning'] },
]

function generateToastCode(v: ControlValues): string {
  let lines = `import { useToast, Button } from '@shieldai/ds'\n\n`
  lines += 'export default function Example() {\n'
  lines += '  const { toast } = useToast()\n\n'
  lines += '  return (\n'
  lines += `    <Button\n`
  const btnVar = v.variant === 'warning' || v.variant === 'error' ? 'neu-red' : 'neu-green'
  lines += `      variant="${btnVar}"\n`
  lines += '      onClick={() => toast({\n'
  lines += `        title: '${v.title}',\n`
  lines += `        description: '${v.description}',\n`
  lines += `        variant: '${v.variant}',\n`
  lines += '      })}\n'
  lines += '    >\n'
  lines += '      Show Toast\n'
  lines += '    </Button>\n'
  lines += '  )\n'
  lines += '}'
  return lines
}

function ToastDemo() {
  const { toast } = useToast()
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="neu-green" onClick={() => toast({ variant: 'success', title: 'Saved!', description: 'Changes persisted.' })}>Success</Button>
      <Button size="sm" variant="neu-red"   onClick={() => toast({ variant: 'error',   title: 'Error',   description: 'Something went wrong.' })}>Error</Button>
      <Button size="sm" variant="neu-purple" onClick={() => toast({ variant: 'info',   title: 'Info',    description: 'Agent is running.' })}>Info</Button>
      <Button size="sm" variant="neu"       onClick={() => toast({ variant: 'warning', title: 'Warning', description: 'Rate limit near.' })}>Warning</Button>
    </div>
  )
}

export default function ToastPage() {
  return (
    <ComponentBlock
      num="02.10"
      title="Toast"
      tag="useToast hook · 4 variants · auto-dismiss"
      description="Notification system built on a context + reducer pattern. Toasts auto-dismiss after 4 seconds, cap at 5 visible, and slide in from the bottom-right."
      preview={<ToastDemo />}
      code={CODE}
      filename="Toast.tsx"
      props={PROPS}
    >
      <DocSection title="Interactive Playground">
        <p className="text-ds-comment text-[13px] leading-relaxed mb-4">
          Tweak props on the right and see the result live. The generated code updates instantly.
        </p>
        <PlaygroundBlock
          controls={PLAYGROUND_CONTROLS}
          render={(v) => {
            const { toast } = useToast()
            return (
              <div className="text-center">
                <p className="text-[13px] text-ds-comment mb-4">Click the button to trigger a toast notification</p>
                <Button
                  variant={v.variant === 'warning' || v.variant === 'error' ? 'neu-red' : 'neu-green'}
                  onClick={() => toast({
                    title: v.title as string,
                    description: v.description as string,
                    variant: v.variant as 'success' | 'error' | 'info' | 'warning',
                  })}
                >
                  Show Toast
                </Button>
              </div>
            )
          }}
          generateCode={generateToastCode}
          filename="Toast.tsx"
        />
      </DocSection>
    </ComponentBlock>
  )
}
