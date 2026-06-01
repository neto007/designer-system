import { useContext, createContext, useReducer, useCallback, type Dispatch } from 'react'

export type ToastVariant = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  variant: ToastVariant
  title: string
  description?: string
  duration?: number
}

type ToastAction =
  | { type: 'ADD'; toast: Toast }
  | { type: 'REMOVE'; id: string }

function toastReducer(state: Toast[], action: ToastAction): Toast[] {
  switch (action.type) {
    case 'ADD':
      return [action.toast, ...state].slice(0, 5)
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id)
    default:
      return state
  }
}

interface ToastContextValue {
  toasts: Toast[]
  dispatch: Dispatch<ToastAction>
}

export const ToastContext = createContext<ToastContextValue>({
  toasts: [],
  dispatch: () => undefined,
})

export function useToastReducer() {
  return useReducer(toastReducer, [])
}

export function useToast() {
  const { toasts, dispatch } = useContext(ToastContext)

  const toast = useCallback(
    (options: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).slice(2)
      const duration = options.duration ?? 4000

      dispatch({ type: 'ADD', toast: { ...options, id } })

      if (duration > 0) {
        setTimeout(() => dispatch({ type: 'REMOVE', id }), duration)
      }

      return id
    },
    [dispatch]
  )

  const dismiss = useCallback(
    (id: string) => dispatch({ type: 'REMOVE', id }),
    [dispatch]
  )

  return { toasts, toast, dismiss }
}
