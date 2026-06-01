import { useState } from 'react'
import { Button, Alert, Skeleton, Spinner, NeuCard, StatusIndicator } from '@shieldai/ds'
import { RefreshCw, Plus, Search, AlertTriangle } from 'lucide-react'
import { DocSection, PreviewRow } from '../../components/docs'


// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-4">
      {icon && (
        <div className="w-14 h-14 rounded-full border-2 border-ds-current flex items-center justify-center text-ds-comment">
          {icon}
        </div>
      )}
      <div className="space-y-1.5">
        <h3 className="font-bold text-ds-fg text-base">{title}</h3>
        {description && <p className="text-ds-comment text-sm max-w-xs">{description}</p>}
      </div>
      {action}
    </div>
  )
}

// ─── Error State ──────────────────────────────────────────────────────────────

function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="space-y-4 p-6">
      <Alert variant="error">
        <AlertTriangle className="h-4 w-4" />
        <div>
          <div className="font-semibold">Failed to load agents</div>
          <div className="text-sm mt-0.5 opacity-80">Connection timed out. Check your network and try again.</div>
        </div>
      </Alert>
      {onRetry && (
        <Button variant="outline" size="sm" leftIcon={<RefreshCw className="h-3.5 w-3.5" />} onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  )
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div className="space-y-3 p-4">
      {[1, 2, 3].map((i) => (
        <NeuCard key={i} className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-9 h-9 rounded-ds-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-64" />
            </div>
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <div className="grid grid-cols-4 gap-3 pt-1">
            {[1, 2, 3, 4].map((j) => (
              <Skeleton key={j} className="h-8 rounded" />
            ))}
          </div>
        </NeuCard>
      ))}
    </div>
  )
}

// ─── Demo orchestrator ────────────────────────────────────────────────────────

type ViewState = 'loading' | 'empty' | 'error' | 'success'

const SUCCESS_ITEMS = ['Orchestrator Prime', 'CodeGen Alpha', 'Data Wrangler']

export default function ContentStatesPage() {
  const [state, setState] = useState<ViewState>('success')

  return (
    <div className="space-y-10 max-w-3xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">04.04</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Content States</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Every data surface has four states: loading, empty, error, and success. Apply consistently to give users clear feedback at each stage.
        </p>
      </div>

      {/* Interactive switcher */}
      <DocSection title="Interactive demo">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {(['loading', 'empty', 'error', 'success'] as ViewState[]).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={state === s ? 'default' : 'outline'}
              onClick={() => setState(s)}
            >
              {s}
            </Button>
          ))}
        </div>

        <div className="border border-ds-current rounded-ds-lg bg-ds-panel overflow-hidden min-h-[240px]">
          {state === 'loading' && <LoadingState />}
          {state === 'empty' && (
            <EmptyState
              icon={<Search className="h-6 w-6" />}
              title="No agents deployed"
              description="Deploy your first agent to start automating workflows."
              action={<Button leftIcon={<Plus className="h-4 w-4" />}>Deploy Agent</Button>}
            />
          )}
          {state === 'error' && <ErrorState onRetry={() => setState('loading')} />}
          {state === 'success' && (
            <div className="divide-y divide-ds-current/30">
              {SUCCESS_ITEMS.map((name) => (
                <div key={name} className="flex items-center gap-3 px-4 py-3">
                  <StatusIndicator status="success" />
                  <span className="text-sm text-ds-fg">{name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </DocSection>

      {/* Individual state docs */}
      <DocSection title="Loading — skeleton pattern">
        <p className="text-xs text-ds-comment mb-3">
          Skeleton loaders match the shape of the real content. Never use a spinner for content that has a known structure.
        </p>
        <div className="border border-ds-current rounded-ds-lg bg-ds-panel overflow-hidden">
          <LoadingState />
        </div>
        <pre className="mt-3 text-[11px] font-mono text-ds-comment">{`<NeuCard className="p-4 space-y-3">
  <div className="flex items-center gap-3">
    <Skeleton className="w-9 h-9 rounded-ds-md" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-64" />
    </div>
  </div>
</NeuCard>`}</pre>
      </DocSection>

      <DocSection title="Empty — zero data">
        <PreviewRow label="no-results">
          <div className="w-full border border-ds-current rounded-ds-lg bg-ds-panel">
            <EmptyState
              icon={<Search className="h-6 w-6" />}
              title="No results found"
              description="Try adjusting your search or filters."
            />
          </div>
        </PreviewRow>
        <PreviewRow label="first-use">
          <div className="w-full border border-ds-current rounded-ds-lg bg-ds-panel">
            <EmptyState
              icon={<Plus className="h-6 w-6" />}
              title="No agents yet"
              description="Deploy your first agent to start building workflows."
              action={<Button leftIcon={<Plus className="h-4 w-4" />}>Deploy Agent</Button>}
            />
          </div>
        </PreviewRow>
      </DocSection>

      <DocSection title="Error — recoverable">
        <div className="border border-ds-current rounded-ds-lg bg-ds-panel overflow-hidden">
          <ErrorState onRetry={() => {}} />
        </div>
        <p className="text-xs text-ds-comment mt-3">
          Always include a retry action for transient errors. Use <code className="text-ds-purple">Alert variant="destructive"</code> + <code className="text-ds-purple">Button</code> Retry pattern.
        </p>
      </DocSection>

      <DocSection title="Spinner — indeterminate actions">
        <PreviewRow label="inline spinner (button loading state)">
          <Button loading>Deploying agent…</Button>
          <Button variant="outline" loading>Saving</Button>
        </PreviewRow>
        <PreviewRow label="standalone spinner">
          <div className="flex items-center gap-3">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </PreviewRow>
        <p className="text-xs text-ds-comment mt-3">
          Use spinner only for indeterminate actions (submit, upload). For data loading, prefer Skeleton loaders.
        </p>
      </DocSection>
    </div>
  )
}
