import { MessageSquare, Sparkles, Search } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface EmptyChatStateProps {
  title?: string
  description?: string
  suggestions?: string[]
  onSuggestionClick?: (suggestion: string) => void
  className?: string
}

export function EmptyChatState({
  title = 'Start a conversation',
  description = 'Ask a question or give a command to get started.',
  suggestions = [
    'Deploy a new agent',
    'Show me recent workflows',
    'Analyze this data',
    'Help me debug an error',
  ],
  onSuggestionClick,
  className,
}: EmptyChatStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center px-6 py-16', className)}>
      {/* Illustration */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-ds-2xl bg-ds-purple/10 border border-ds-purple/20 flex items-center justify-center">
          <MessageSquare className="h-8 w-8 text-ds-purple" />
        </div>
        <Sparkles className="h-4 w-4 text-ds-yellow absolute -top-1 -right-1" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-ds-fg mb-2">{title}</h2>
      <p className="text-sm text-ds-comment max-w-sm mb-8">{description}</p>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 max-w-md">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSuggestionClick?.(suggestion)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-ds-pill text-xs',
                'border border-ds-current bg-ds-panel text-ds-fg/70',
                'hover:border-ds-purple/40 hover:text-ds-purple hover:bg-ds-purple/5',
                'transition-all duration-fast cursor-pointer'
              )}
            >
              <Search className="h-3 w-3 flex-shrink-0" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}