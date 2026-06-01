import { type ReactNode } from 'react'
import { ThumbsUp, ThumbsDown, ExternalLink, Sparkles } from 'lucide-react'
import { cn } from '../../lib/cn'

// ─── StreamingBubble ──────────────────────────────────────────────────────────

export interface StreamingBubbleProps {
  content: string
  isStreaming?: boolean
  className?: string
}

export function StreamingBubble({ content, isStreaming = false, className }: StreamingBubbleProps) {
  return (
    <div className={cn(
      'rounded-ds-xl bg-ds-panel border border-ds-current px-4 py-3 text-sm text-ds-fg leading-relaxed',
      className
    )}>
      {content}
      {isStreaming && (
        <span
          className="inline-block w-0.5 h-4 ml-0.5 bg-ds-purple align-middle animate-[blink_1s_step-end_infinite]"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

// ─── ThinkingIndicator ───────────────────────────────────────────────────────

export interface ThinkingIndicatorProps {
  label?: string
  className?: string
}

export function ThinkingIndicator({ label = 'Thinking…', className }: ThinkingIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-2.5 text-ds-comment', className)}>
      <Sparkles className="h-4 w-4 text-ds-purple flex-shrink-0 animate-pulse" />
      <span className="text-xs font-medium">{label}</span>
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1 h-1 rounded-full bg-ds-purple animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </span>
    </div>
  )
}

// ─── SourcesList ─────────────────────────────────────────────────────────────

export interface Source {
  title: string
  url?: string
  snippet?: string
  index?: number
}

export interface SourcesListProps {
  sources: Source[]
  className?: string
}

export function SourcesList({ sources, className }: SourcesListProps) {
  if (sources.length === 0) return null

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="text-[10px] font-mono uppercase tracking-wider text-ds-comment">Sources</div>
      <div className="flex flex-wrap gap-2">
        {sources.map((source, i) => (
          <a
            key={i}
            href={source.url}
            target={source.url ? '_blank' : undefined}
            rel={source.url ? 'noopener noreferrer' : undefined}
            title={source.snippet}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-ds-pill text-xs border',
              'border-ds-current bg-ds-panel text-ds-fg/70',
              source.url && 'hover:border-ds-purple/40 hover:text-ds-purple transition-colors cursor-pointer'
            )}
          >
            {source.index !== undefined && (
              <span className="w-4 h-4 rounded-full bg-ds-purple/20 text-ds-purple text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                {source.index}
              </span>
            )}
            <span className="truncate max-w-[140px]">{source.title}</span>
            {source.url && <ExternalLink className="h-2.5 w-2.5 flex-shrink-0 opacity-60" />}
          </a>
        ))}
      </div>
    </div>
  )
}

// ─── FeedbackBar ─────────────────────────────────────────────────────────────

export type FeedbackValue = 'up' | 'down' | null

export interface FeedbackBarProps {
  value?: FeedbackValue
  onChange?: (value: FeedbackValue) => void
  label?: string
  className?: string
}

export function FeedbackBar({ value, onChange, label = 'Was this helpful?', className }: FeedbackBarProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {label && <span className="text-[11px] text-ds-comment">{label}</span>}
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => onChange?.(value === 'up' ? null : 'up')}
          aria-pressed={value === 'up'}
          aria-label="Helpful"
          className={cn(
            'p-1.5 rounded-ds-md border-2 transition-all',
            value === 'up'
              ? 'border-ds-green bg-ds-green/10 text-ds-green'
              : 'border-ds-current text-ds-comment hover:border-ds-green/40 hover:text-ds-green'
          )}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onChange?.(value === 'down' ? null : 'down')}
          aria-pressed={value === 'down'}
          aria-label="Not helpful"
          className={cn(
            'p-1.5 rounded-ds-md border-2 transition-all',
            value === 'down'
              ? 'border-ds-red bg-ds-red/10 text-ds-red'
              : 'border-ds-current text-ds-comment hover:border-ds-red/40 hover:text-ds-red'
          )}
        >
          <ThumbsDown className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

// ─── PromptInput ──────────────────────────────────────────────────────────────

export interface PromptSuggestion {
  label: string
  prompt: string
}

export interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  suggestions?: PromptSuggestion[]
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  className?: string
  children?: ReactNode
}

export function PromptInput({
  value,
  onChange,
  onSubmit,
  suggestions = [],
  placeholder = 'Ask anything…',
  disabled,
  loading,
  className,
  children,
}: PromptInputProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {/* Suggestion chips */}
      {!value && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s.prompt}
              type="button"
              onClick={() => { onChange(s.prompt); onSubmit() }}
              disabled={disabled || loading}
              className={cn(
                'px-3 py-1 rounded-ds-pill text-xs border border-ds-current bg-ds-panel text-ds-fg/70',
                'hover:border-ds-purple/40 hover:text-ds-purple hover:bg-ds-purple/5 transition-all',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                if (value.trim() && !disabled && !loading) onSubmit()
              }
            }}
            placeholder={placeholder}
            disabled={disabled || loading}
            rows={1}
            className={cn(
              'w-full px-4 py-3 pr-12 text-sm rounded-ds-xl border-2 border-ds-current bg-ds-panel',
              'text-ds-fg placeholder:text-ds-comment resize-none overflow-hidden',
              'focus:outline-none focus:border-ds-purple transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
            style={{ minHeight: '48px', maxHeight: '200px' }}
            onInput={(e) => {
              const el = e.currentTarget
              el.style.height = 'auto'
              el.style.height = `${el.scrollHeight}px`
            }}
          />
          {children}
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || loading || !value.trim()}
          className={cn(
            'flex-shrink-0 h-12 w-12 rounded-ds-xl flex items-center justify-center',
            'border-2 transition-all',
            value.trim() && !disabled && !loading
              ? 'border-ds-purple bg-ds-purple/20 text-ds-purple hover:bg-ds-purple/30'
              : 'border-ds-current text-ds-comment cursor-not-allowed opacity-50'
          )}
          aria-label="Send"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M2 8l12-6-6 12V9L2 8z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
