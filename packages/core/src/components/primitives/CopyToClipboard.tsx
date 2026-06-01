import { useState, type ReactNode } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface CopyToClipboardProps {
  value: string
  children?: ReactNode
  variant?: 'icon' | 'button' | 'inline'
  className?: string
}

export function CopyToClipboard({ value, children, variant = 'icon', className }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (variant === 'inline') {
    return (
      <span className={cn('inline-flex items-center gap-1.5 group', className)}>
        <code className="font-mono text-ds-cyan text-sm">{children ?? value}</code>
        <button
          onClick={copy}
          className="text-ds-current hover:text-ds-comment transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Copy"
        >
          {copied ? <Check className="h-3 w-3 text-ds-green" /> : <Copy className="h-3 w-3" />}
        </button>
      </span>
    )
  }

  if (variant === 'button') {
    return (
      <button
        onClick={copy}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5 rounded-ds-sm text-xs font-mono',
          'border border-ds-current bg-ds-panel hover:border-ds-purple hover:text-ds-fg',
          'text-ds-comment transition-all duration-fast',
          className
        )}
      >
        {copied ? <Check className="h-3.5 w-3.5 text-ds-green" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? 'Copied!' : (children ?? 'Copy')}
      </button>
    )
  }

  return (
    <button
      onClick={copy}
      className={cn(
        'inline-flex items-center justify-center h-7 w-7 rounded-ds-sm',
        'text-ds-comment hover:text-ds-fg hover:bg-ds-current/50 transition-colors',
        className
      )}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-ds-green" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}
