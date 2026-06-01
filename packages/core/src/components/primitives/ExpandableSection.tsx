import { useState, type ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface ExpandableSectionProps {
  header: ReactNode
  children: ReactNode
  defaultExpanded?: boolean
  expanded?: boolean
  onToggle?: (expanded: boolean) => void
  variant?: 'default' | 'compact'
  className?: string
}

export function ExpandableSection({
  header,
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onToggle,
  variant = 'default',
  className,
}: ExpandableSectionProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded

  const toggle = () => {
    const next = !isExpanded
    setInternalExpanded(next)
    onToggle?.(next)
  }

  return (
    <div className={cn('border border-ds-current rounded-ds-lg overflow-hidden', className)}>
      <button
        onClick={toggle}
        aria-expanded={isExpanded}
        className={cn(
          'flex items-center gap-2 w-full text-left bg-ds-panel hover:bg-ds-current/50 transition-colors duration-fast',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ds-purple focus-visible:ring-inset',
          variant === 'compact' ? 'px-3 py-2' : 'px-4 py-3'
        )}
      >
        <ChevronRight
          className={cn(
            'h-3.5 w-3.5 text-ds-comment transition-transform duration-fast flex-shrink-0',
            isExpanded && 'rotate-90'
          )}
        />
        <span className={cn('flex-1 text-ds-fg', variant === 'compact' ? 'text-sm' : 'text-sm font-medium')}>
          {header}
        </span>
      </button>
      {isExpanded && (
        <div className={cn('bg-ds-bg border-t border-ds-current', variant === 'compact' ? 'p-3' : 'p-4')}>
          {children}
        </div>
      )}
    </div>
  )
}
