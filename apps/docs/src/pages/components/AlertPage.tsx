import { Alert, AlertTitle, AlertDescription } from '@shieldai/ds'
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { ComponentBlock, DocSection, PlaygroundBlock } from '../../components/docs'
import type { ControlValues } from '../../components/docs'

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

const ICON_MAP = {
  info: <Info className="h-4 w-4" />,
  success: <CheckCircle className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  error: <XCircle className="h-4 w-4" />,
}

const CONTROLS = [
  { type: 'select' as const, key: 'variant', label: 'variant', default: 'info', options: ['info', 'success', 'warning', 'error'] },
  { type: 'text' as const, key: 'title', label: 'title', default: 'Attention' },
  { type: 'text' as const, key: 'description', label: 'description', default: 'Something happened that requires your attention.' },
]

function genCode(v: ControlValues): string {
  return `<Alert variant="${v.variant}" icon={<Icon />}>
  <AlertTitle>${v.title}</AlertTitle>
  <AlertDescription>${v.description}</AlertDescription>
</Alert>`
}

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
    >
      <DocSection title="Interactive Playground">
        <PlaygroundBlock
          controls={CONTROLS}
          render={(v) => (
            <div className="w-full max-w-lg">
              <Alert
                variant={v.variant as Parameters<typeof Alert>[0]['variant']}
                icon={ICON_MAP[v.variant as keyof typeof ICON_MAP]}
              >
                <AlertTitle>{v.title as string}</AlertTitle>
                <AlertDescription>{v.description as string}</AlertDescription>
              </Alert>
            </div>
          )}
          generateCode={genCode}
          filename="Alert.tsx"
        />
      </DocSection>
    </ComponentBlock>
  )
}
