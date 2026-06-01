import { useState, type ReactNode } from 'react'
import { ChevronDown, CheckCircle2, XCircle, Clock, Loader2, Wrench } from 'lucide-react'
import { cn } from '../../lib/cn'

export type StepStatus = 'pending' | 'running' | 'success' | 'error'

export interface ToolCall {
  name: string
  input?: Record<string, string | number | boolean | null>
  output?: string | number | boolean | null | Record<string, unknown>
  status: StepStatus
  durationMs?: number
}

export interface ExecutionStep {
  id: string
  label: string
  status: StepStatus
  timestamp?: string
  durationMs?: number
  toolCalls?: ToolCall[]
  log?: string
}

export interface AgentExecutionViewProps {
  steps: ExecutionStep[]
  title?: string
  defaultExpanded?: boolean
  className?: string
}

const statusIcon: Record<StepStatus, ReactNode> = {
  pending: <Clock className="h-3.5 w-3.5 text-ds-comment" />,
  running: <Loader2 className="h-3.5 w-3.5 text-ds-yellow animate-spin" />,
  success: <CheckCircle2 className="h-3.5 w-3.5 text-ds-green" />,
  error:   <XCircle className="h-3.5 w-3.5 text-ds-red" />,
}

const statusLine: Record<StepStatus, string> = {
  pending: 'bg-ds-comment/30',
  running: 'bg-ds-yellow/60',
  success: 'bg-ds-green/60',
  error:   'bg-ds-red/60',
}

function ToolCallRow({ call }: { call: ToolCall }) {
  const [open, setOpen] = useState(false)
  const hasDetail = call.input || call.output

  return (
    <div className="ml-4 mt-1 rounded-ds-md border border-ds-current/50 bg-ds-bg overflow-hidden">
      <button
        type="button"
        onClick={() => hasDetail && setOpen((v) => !v)}
        className={cn(
          'w-full flex items-center gap-2 px-3 py-1.5 text-left',
          hasDetail ? 'cursor-pointer hover:bg-ds-panel/50 transition-colors' : ''
        )}
      >
        <Wrench className="h-3 w-3 text-ds-orange flex-shrink-0" />
        <span className="text-[11px] font-mono text-ds-orange font-semibold">{call.name}</span>
        <span className="flex-1" />
        <span className="flex-shrink-0">{statusIcon[call.status]}</span>
        {call.durationMs !== undefined && (
          <span className="text-[10px] text-ds-comment font-mono">{call.durationMs}ms</span>
        )}
        {hasDetail && (
          <ChevronDown className={cn('h-3 w-3 text-ds-comment flex-shrink-0 transition-transform', open && 'rotate-180')} />
        )}
      </button>

      {open && (call.input || call.output) && (
        <div className="border-t border-ds-current/50 px-3 py-2 space-y-2">
          {call.input && (
            <div>
              <div className="text-[9px] font-mono uppercase text-ds-comment mb-1">input</div>
              <pre className="text-[10px] font-mono text-ds-fg/80 whitespace-pre-wrap break-all">
                {JSON.stringify(call.input, null, 2)}
              </pre>
            </div>
          )}
          {call.output !== undefined && (
            <div>
              <div className="text-[9px] font-mono uppercase text-ds-comment mb-1">output</div>
              <pre className="text-[10px] font-mono text-ds-fg/80 whitespace-pre-wrap break-all">
                {typeof call.output === 'string' ? call.output : JSON.stringify(call.output, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function StepRow({ step }: { step: ExecutionStep }) {
  const [open, setOpen] = useState(step.status === 'running')
  const hasChildren = (step.toolCalls?.length ?? 0) > 0 || step.log

  return (
    <div>
      <button
        type="button"
        onClick={() => hasChildren && setOpen((v) => !v)}
        className={cn(
          'w-full flex items-center gap-2 px-3 py-2 text-left rounded-ds-md transition-colors',
          hasChildren && 'cursor-pointer hover:bg-ds-panel/50'
        )}
      >
        {/* Status icon */}
        <span className="flex-shrink-0">{statusIcon[step.status]}</span>

        {/* Label */}
        <span className={cn(
          'flex-1 text-xs font-medium',
          step.status === 'running' ? 'text-ds-fg' : 'text-ds-fg/80'
        )}>
          {step.label}
        </span>

        {/* Timestamp */}
        {step.timestamp && (
          <span className="text-[10px] text-ds-comment font-mono flex-shrink-0">{step.timestamp}</span>
        )}

        {/* Duration */}
        {step.durationMs !== undefined && (
          <span className="text-[10px] text-ds-comment font-mono flex-shrink-0">{step.durationMs}ms</span>
        )}

        {/* Chevron */}
        {hasChildren && (
          <ChevronDown className={cn('h-3.5 w-3.5 text-ds-comment flex-shrink-0 transition-transform', open && 'rotate-180')} />
        )}
      </button>

      {open && (
        <div className="pl-4 pb-2 space-y-1">
          {step.toolCalls?.map((call, i) => <ToolCallRow key={i} call={call} />)}
          {step.log && (
            <pre className="ml-4 text-[10px] font-mono text-ds-comment whitespace-pre-wrap leading-relaxed">
              {step.log}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}

export function AgentExecutionView({
  steps,
  title = 'Execution trace',
  defaultExpanded = true,
  className,
}: AgentExecutionViewProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const doneCount = steps.filter((s) => s.status === 'success' || s.status === 'error').length
  const hasError = steps.some((s) => s.status === 'error')
  const isRunning = steps.some((s) => s.status === 'running')

  return (
    <div className={cn('rounded-ds-xl border border-ds-current bg-ds-panel overflow-hidden', className)}>
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-ds-current/30 transition-colors"
      >
        {isRunning
          ? <Loader2 className="h-3.5 w-3.5 text-ds-yellow animate-spin flex-shrink-0" />
          : hasError
          ? <XCircle className="h-3.5 w-3.5 text-ds-red flex-shrink-0" />
          : <CheckCircle2 className="h-3.5 w-3.5 text-ds-green flex-shrink-0" />
        }
        <span className="text-xs font-semibold text-ds-fg flex-1">{title}</span>
        <span className="text-[10px] font-mono text-ds-comment">
          {doneCount}/{steps.length} steps
        </span>
        <ChevronDown className={cn('h-3.5 w-3.5 text-ds-comment flex-shrink-0 transition-transform', expanded && 'rotate-180')} />
      </button>

      {/* Steps */}
      {expanded && (
        <div className="border-t border-ds-current">
          <div className="relative px-2 py-1">
            {/* Connecting line */}
            <div className="absolute left-5 top-4 bottom-4 w-px bg-ds-current/50" />
            {steps.map((step) => (
              <div key={step.id} className="relative">
                {/* Status dot on the line */}
                <div className={cn(
                  'absolute left-3.5 top-3.5 w-1.5 h-1.5 rounded-full flex-shrink-0',
                  statusLine[step.status]
                )} />
                <StepRow step={step} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
