import { Alert, AlertTitle, AlertDescription } from '@shieldai/ds'
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { Alert, AlertTitle, AlertDescription } from '@shieldai/ds'
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

<Alert variant="info" icon={<Info />}>
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>Agent is processing your request.</AlertDescription>
</Alert>

<Alert variant="success" icon={<CheckCircle />}>
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Workflow completed in 2.4s.</AlertDescription>
</Alert>

<Alert variant="warning" icon={<AlertTriangle />}>
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Rate limit at 80%. Slow down.</AlertDescription>
</Alert>

<Alert variant="error" icon={<XCircle />}>
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>LLM call failed. Check API key.</AlertDescription>
</Alert>`

const PROPS = [
  { name: 'variant', type: '"info" | "success" | "warning" | "error"', required: true, description: 'Semantic color and icon color' },
  { name: 'icon', type: 'ReactNode', description: 'Icon rendered in the left column' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Alert content — typically AlertTitle + AlertDescription' },
]

export default function AlertPage() {
  return (
    <ComponentBlock
      num="02.09"
      title="Alert"
      tag="4 semantic variants · left-border style"
      description="Inline feedback message with left border accent and optional icon. Four semantic variants map to info, success, warning, and error states."
      preview={
        <div className="space-y-3 max-w-xl w-full">
          <Alert variant="info" icon={<Info className="h-4 w-4" />}>
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>Agent is processing your request.</AlertDescription>
          </Alert>
          <Alert variant="success" icon={<CheckCircle className="h-4 w-4" />}>
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Workflow completed in 2.4s.</AlertDescription>
          </Alert>
          <Alert variant="warning" icon={<AlertTriangle className="h-4 w-4" />}>
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Rate limit at 80%. Slow down.</AlertDescription>
          </Alert>
          <Alert variant="error" icon={<XCircle className="h-4 w-4" />}>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>LLM call failed. Check API key.</AlertDescription>
          </Alert>
        </div>
      }
      code={CODE}
      filename="Alert.tsx"
      props={PROPS}
    />
  )
}
