import { Button, useToast } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

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
    />
  )
}
