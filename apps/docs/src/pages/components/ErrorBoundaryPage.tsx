import { useState, type ReactNode } from 'react'
import { ErrorBoundary, Button, Alert } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { ErrorBoundary } from '@shieldai/ds'

// Default fallback UI
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

// Custom fallback — render prop
<ErrorBoundary
  fallback={(error, reset) => (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  )}
  onError={(error, info) => reportToTelemetry(error, info)}
>
  <MyComponent />
</ErrorBoundary>

// Static fallback node
<ErrorBoundary fallback={<Alert variant="error">Crash!</Alert>}>
  <MyComponent />
</ErrorBoundary>`

const PROPS = [
  { name: 'children', type: 'ReactNode', default: '—', description: 'The subtree to protect' },
  { name: 'fallback', type: 'ReactNode | ((error: Error, reset: () => void) => ReactNode)', default: '—', description: 'Custom fallback — receives the caught error and a reset function. If omitted, the default red card is shown.' },
  { name: 'onError', type: '(error: Error, info: ErrorInfo) => void', default: '—', description: 'Optional telemetry hook called on every caught render error' },
  { name: 'className', type: 'string', default: '—', description: 'Additional classes on the default fallback container' },
]

function BrokenComponent(): ReactNode {
  throw new Error('Agent render loop detected: max depth exceeded')
}

function LiveDemo() {
  const [crashed, setCrashed] = useState(false)
  const [key, setKey] = useState(0)

  return (
    <div className="space-y-4 w-full">
      <PreviewRow label="default fallback">
        <ErrorBoundary key={key}>
          {crashed ? (
            <BrokenComponent />
          ) : (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="neu-red"
                onClick={() => setCrashed(true)}
              >
                Trigger crash
              </Button>
              <Alert variant="info" className="text-xs py-1">
                Click the button to simulate a render error
              </Alert>
            </div>
          )}
        </ErrorBoundary>
      </PreviewRow>

      <PreviewRow label="custom fallback">
        <ErrorBoundary
          fallback={(error, reset) => (
            <div className="flex items-center gap-3 px-4 py-3 bg-ds-orange/10 border border-ds-orange/30 rounded-ds-md">
              <span className="text-xs text-ds-orange font-mono">{error.message}</span>
              <Button size="sm" variant="outline" onClick={reset}>Reset</Button>
            </div>
          )}
        >
          <BrokenComponent />
        </ErrorBoundary>
      </PreviewRow>

      {crashed && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => { setCrashed(false); setKey((k) => k + 1) }}
        >
          Reset demo
        </Button>
      )}
    </div>
  )
}

export default function ErrorBoundaryPage() {
  return (
    <ComponentBlock
      num="02.EB"
      title="Error Boundary"
      tag="render error catch · custom fallback · reset"
      description="React class component that catches render-phase errors in its subtree. Shows a default styled error card with a retry button, or a custom fallback via the fallback prop. Use onError to pipe errors to your telemetry service."
      preview={<LiveDemo />}
      code={CODE}
      filename="ErrorBoundary.tsx"
      props={PROPS}
    />
  )
}
