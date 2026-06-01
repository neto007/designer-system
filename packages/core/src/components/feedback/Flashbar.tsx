import { X, Info, CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'

export interface FlashbarItem {
  id: string
  type: 'info' | 'success' | 'warning' | 'error' | 'loading'
  header?: ReactNode
  content?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  action?: ReactNode
}

export interface FlashbarProps {
  items: FlashbarItem[]
  className?: string
}

const CONFIG = {
  info:    { icon: Info,          border: 'border-l-ds-cyan',   bg: 'bg-ds-cyan/5',   text: 'text-ds-cyan'   },
  success: { icon: CheckCircle,   border: 'border-l-ds-green',  bg: 'bg-ds-green/5',  text: 'text-ds-green'  },
  warning: { icon: AlertTriangle, border: 'border-l-ds-orange', bg: 'bg-ds-orange/5', text: 'text-ds-orange' },
  error:   { icon: XCircle,       border: 'border-l-ds-red',    bg: 'bg-ds-red/5',    text: 'text-ds-red'    },
  loading: { icon: Loader2,       border: 'border-l-ds-purple', bg: 'bg-ds-purple/5', text: 'text-ds-purple' },
}

export function Flashbar({ items, className }: FlashbarProps) {
  if (!items.length) return null

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item) => {
        const { icon: Icon, border, bg, text } = CONFIG[item.type]
        return (
          <div
            key={item.id}
            role="status"
            className={cn(
              'flex gap-3 px-4 py-3 rounded-ds-md border border-ds-current border-l-4',
              bg, border
            )}
          >
            <Icon className={cn('h-4 w-4 flex-shrink-0 mt-0.5', text, item.type === 'loading' && 'animate-spin')} />
            <div className="flex-1 min-w-0 space-y-0.5">
              {item.header && <p className={cn('text-sm font-medium', text)}>{item.header}</p>}
              {item.content && <p className="text-sm text-ds-comment">{item.content}</p>}
              {item.action && <div className="mt-2">{item.action}</div>}
            </div>
            {item.dismissible && (
              <button
                onClick={item.onDismiss}
                className="flex-shrink-0 text-ds-comment hover:text-ds-fg transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
