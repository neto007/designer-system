import { useContext } from 'react'
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '../../lib/cn'
import { ToastContext, useToastReducer, type Toast, type ToastVariant } from '../../hooks/useToast'

const variantMap: Record<
  ToastVariant,
  { border: string; shadow: string; icon: React.ReactNode }
> = {
  success: {
    border: 'border-ds-green',
    shadow: 'shadow-[0_8px_32px_rgba(80,250,123,.15)]',
    icon: <CheckCircle className="h-4 w-4 text-ds-green" />,
  },
  error: {
    border: 'border-ds-red',
    shadow: 'shadow-[0_8px_32px_rgba(255,85,85,.15)]',
    icon: <XCircle className="h-4 w-4 text-ds-red" />,
  },
  info: {
    border: 'border-ds-cyan',
    shadow: 'shadow-[0_8px_32px_rgba(139,233,253,.15)]',
    icon: <Info className="h-4 w-4 text-ds-cyan" />,
  },
  warning: {
    border: 'border-ds-orange',
    shadow: 'shadow-[0_8px_32px_rgba(255,184,108,.15)]',
    icon: <AlertTriangle className="h-4 w-4 text-ds-orange" />,
  },
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const { border, shadow, icon } = variantMap[toast.variant]

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3',
        'bg-ds-panel border rounded-ds-md p-4',
        'max-w-[360px] w-full',
        'animate-in slide-in-from-right-5 fade-in-0 duration-200',
        border,
        shadow
      )}
    >
      <span className="flex-shrink-0 mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-ds-fg">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-ds-comment mt-0.5">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="flex-shrink-0 text-ds-comment hover:text-ds-fg transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function Toaster() {
  const { toasts, dispatch } = useContext(ToastContext)

  if (toasts.length === 0) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-toast flex flex-col gap-2 items-end"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          toast={t}
          onDismiss={() => dispatch({ type: 'REMOVE', id: t.id })}
        />
      ))}
    </div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, dispatch] = useToastReducer()

  return (
    <ToastContext.Provider value={{ toasts, dispatch }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}
