import { Component, type ReactNode, type ErrorInfo } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  onError?: (error: Error, info: ErrorInfo) => void
  className?: string
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }

  reset = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    const { children, fallback, className } = this.props

    if (error) {
      if (fallback) {
        return typeof fallback === 'function' ? fallback(error, this.reset) : fallback
      }

      return (
        <div
          role="alert"
          className={cn(
            'flex flex-col items-center justify-center gap-4 p-8 text-center',
            'bg-ds-red/5 border border-ds-red/30 rounded-ds-xl',
            className
          )}
        >
          <AlertTriangle className="h-10 w-10 text-ds-red" />
          <div>
            <p className="text-sm font-semibold text-ds-fg mb-1">Something went wrong</p>
            <p className="text-xs text-ds-comment font-mono max-w-sm break-all">{error.message}</p>
          </div>
          <button
            type="button"
            onClick={this.reset}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-ds-md text-sm font-semibold',
              'border-2 border-ds-red/50 text-ds-red hover:bg-ds-red/10 transition-colors duration-fast'
            )}
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
        </div>
      )
    }

    return children
  }
}
