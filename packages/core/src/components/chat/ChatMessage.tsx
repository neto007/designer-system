import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Avatar } from '../primitives/Avatar'
import { Skeleton } from '../primitives/Skeleton'
import { Badge } from '../primitives/Badge'

// ─── Types ────────────────────────────────────────────────────────────────────

export type MessageRole = 'user' | 'assistant' | 'tool' | 'system'

export interface ChatMessageProps {
  role: MessageRole
  content: ReactNode
  timestamp?: string
  agentName?: string
  toolName?: string
  streaming?: boolean
  actions?: ReactNode
  className?: string
}

// ─── Role config ──────────────────────────────────────────────────────────────

const roleConfig: Record<MessageRole, {
  avatarType: 'user' | 'bot' | 'tool' | 'default'
  label: string
  align: 'left' | 'right'
  bubbleClass: string
}> = {
  user: {
    avatarType: 'user',
    label: 'You',
    align: 'right',
    bubbleClass: 'bg-ds-purple/15 border-ds-purple/30 text-ds-fg',
  },
  assistant: {
    avatarType: 'bot',
    label: 'ShieldAI',
    align: 'left',
    bubbleClass: 'bg-ds-panel border-ds-current text-ds-fg',
  },
  tool: {
    avatarType: 'tool',
    label: 'Tool',
    align: 'left',
    bubbleClass: 'bg-ds-bg border-ds-current/50 text-ds-comment font-mono text-[12px]',
  },
  system: {
    avatarType: 'default',
    label: 'System',
    align: 'left',
    bubbleClass: 'bg-ds-orange/5 border-ds-orange/20 text-ds-comment italic text-xs',
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ChatMessage({
  role,
  content,
  timestamp,
  agentName,
  toolName,
  streaming,
  actions,
  className,
}: ChatMessageProps) {
  const cfg = roleConfig[role]
  const isRight = cfg.align === 'right'

  const displayName = toolName ?? agentName ?? cfg.label

  return (
    <div
      className={cn(
        'flex gap-3 group',
        isRight && 'flex-row-reverse',
        className
      )}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 pt-0.5">
        <Avatar variant={cfg.avatarType} size="sm" />
      </div>

      {/* Bubble */}
      <div className={cn('flex flex-col gap-1 max-w-[75%]', isRight && 'items-end')}>
        {/* Meta row */}
        <div className={cn('flex items-center gap-2 text-[10px] text-ds-comment', isRight && 'flex-row-reverse')}>
          <span className="font-semibold text-ds-fg/70">{displayName}</span>
          {role === 'tool' && toolName && (
            <Badge variant="muted" className="text-[9px] py-0">tool_call</Badge>
          )}
          {timestamp && <span>{timestamp}</span>}
        </div>

        {/* Message bubble */}
        <div
          className={cn(
            'rounded-ds-lg border px-4 py-3 text-sm leading-relaxed',
            cfg.bubbleClass,
            streaming && 'after:content-["▋"] after:animate-pulse after:ml-0.5 after:text-ds-purple'
          )}
        >
          {streaming ? (
            <div className="space-y-1.5">
              {content}
              <span className="inline-block w-2 h-4 bg-ds-purple animate-pulse rounded-sm ml-0.5 align-text-bottom" />
            </div>
          ) : (
            content
          )}
        </div>

        {/* Actions */}
        {actions && !streaming && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Streaming skeleton ───────────────────────────────────────────────────────

export function ChatMessageSkeleton() {
  return (
    <div className="flex gap-3">
      <Skeleton className="w-7 h-7 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2 pt-1">
        <Skeleton className="h-3 w-24" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}
