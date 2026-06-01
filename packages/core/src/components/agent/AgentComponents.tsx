import { cn } from '../../lib/cn'
import { AGENT_TYPES, type AgentType } from '../../tokens/agentTypes'
import type { ReactNode } from 'react'

// ─── AgentBadge ───────────────────────────────────────────────────────────────

export interface AgentBadgeProps {
  agentType: AgentType
  showLabel?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function AgentBadge({ agentType, showLabel = true, size = 'md', className }: AgentBadgeProps) {
  const cfg = AGENT_TYPES[agentType]
  const Icon = cfg.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-ds-pill font-semibold border transition-colors',
        cfg.color,
        cfg.borderColor,
        'bg-ds-panel/80',
        size === 'sm' ? 'text-[9px] px-2 py-0.5' : 'text-[11px] px-2.5 py-1',
        className
      )}
    >
      <Icon className={cn('flex-shrink-0', size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3')} />
      {showLabel && <span className="truncate max-w-[80px]">{cfg.label}</span>}
    </span>
  )
}

// ─── StatusDot ────────────────────────────────────────────────────────────────

export type StatusDotStatus = 'live' | 'idle' | 'error' | 'pending'

export interface StatusDotProps {
  status?: StatusDotStatus
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

const statusDotConfig: Record<StatusDotStatus, { bg: string; shadow: string; animate: string }> = {
  live:    { bg: 'bg-ds-green',  shadow: 'shadow-[0_0_8px_rgba(80,250,123,.6)]',  animate: 'animate-pulse-glow' },
  idle:    { bg: 'bg-ds-comment', shadow: 'shadow-none',                          animate: '' },
  error:   { bg: 'bg-ds-red',    shadow: 'shadow-[0_0_8px_rgba(255,85,85,.6)]',  animate: 'animate-pulse-glow' },
  pending: { bg: 'bg-ds-orange', shadow: 'shadow-[0_0_8px_rgba(255,184,108,.4)]', animate: 'animate-pulse' },
}

const sizeMap = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2.5 h-2.5',
  lg: 'w-3.5 h-3.5',
}

export function StatusDot({ status = 'idle', size = 'md', label, className }: StatusDotProps) {
  const cfg = statusDotConfig[status]

  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span
        className={cn(
          'rounded-full flex-shrink-0',
          cfg.bg,
          cfg.shadow,
          cfg.animate,
          sizeMap[size]
        )}
      />
      {label && <span className="text-[10px] font-mono text-ds-comment">{label}</span>}
    </span>
  )
}

// ─── AgentNode ────────────────────────────────────────────────────────────────

export interface AgentNodeProps {
  agentType: AgentType
  label: string
  status?: StatusDotStatus
  description?: string
  actions?: ReactNode
  className?: string
}

export function AgentNode({
  agentType,
  label,
  status = 'idle',
  description,
  actions,
  className,
}: AgentNodeProps) {
  const cfg = AGENT_TYPES[agentType]
  const Icon = cfg.icon

  return (
    <div
      className={cn(
        'rounded-ds-xl border-2 bg-ds-panel p-3 min-w-[160px]',
        cfg.borderColor,
        cfg.shadowClass,
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className={cn('w-8 h-8 rounded-ds-lg flex items-center justify-center', cfg.color, 'bg-ds-bg border', cfg.borderColor)}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-ds-fg truncate">{label}</span>
            <StatusDot status={status} size="sm" />
          </div>
          <span className={cn('text-[10px] font-mono font-semibold uppercase', cfg.color)}>{cfg.label}</span>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-[11px] text-ds-comment leading-relaxed mb-2">{description}</p>
      )}

      {/* Actions */}
      {actions && (
        <div className="flex items-center gap-1 pt-1 border-t border-ds-current/50">
          {actions}
        </div>
      )}
    </div>
  )
}

// ─── WorkflowEdge ─────────────────────────────────────────────────────────────

export interface WorkflowEdgeConfig {
  from: string
  to: string
  agentType?: AgentType
  animated?: boolean
  label?: string
}

export interface WorkflowEdgeProps {
  edges: WorkflowEdgeConfig[]
  className?: string
}

export function WorkflowEdge({ edges, className }: WorkflowEdgeProps) {
  return (
    <svg className={cn('overflow-visible flex-shrink-0', className)} width="100%" height="40">
      {edges.map((edge, i) => {
        const cfg = edge.agentType ? AGENT_TYPES[edge.agentType] : null
        return (
          <path
            key={i}
            d={`M0,20 Q${i % 2 === 0 ? 40 : -40},0 ${80 + i * 20},20`}
            fill="none"
            stroke={cfg?.hex ?? '#6272a4'}
            strokeWidth={2}
            strokeDasharray={edge.animated ? '6 3' : undefined}
            className={edge.animated ? 'animate-dash' : undefined}
          />
        )
      })}
    </svg>
  )
}