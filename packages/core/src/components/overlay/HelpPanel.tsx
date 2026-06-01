import { type ReactNode } from 'react'
import { X, HelpCircle } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface HelpPanelProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: ReactNode
  width?: number | string
  className?: string
}

export function HelpPanel({
  open,
  onClose,
  title = 'Help',
  children,
  width = 320,
  className,
}: HelpPanelProps) {
  return (
    <div
      role="complementary"
      aria-label={title}
      aria-hidden={!open}
      style={{ width: typeof width === 'number' ? `${width}px` : width }}
      className={cn(
        'flex flex-col h-full bg-ds-panel border-l border-ds-current flex-shrink-0',
        'transition-all duration-default overflow-hidden',
        open ? 'opacity-100' : 'opacity-0 w-0 pointer-events-none',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-ds-current flex-shrink-0">
        <HelpCircle className="h-4 w-4 text-ds-purple flex-shrink-0" />
        <span className="flex-1 text-sm font-semibold text-ds-fg truncate">{title}</span>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded text-ds-comment hover:text-ds-fg hover:bg-ds-current transition-colors"
          aria-label="Close help panel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 text-sm text-ds-fg/80 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  )
}
