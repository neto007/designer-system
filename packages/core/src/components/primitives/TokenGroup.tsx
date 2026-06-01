import { useState } from 'react'
import { cn } from '../../lib/cn'
import { Token } from './Token'
import type { TokenProps } from './Token'

export interface TokenType {
  label: string
  value: string
  variant?: TokenProps['variant']
}

export interface TokenGroupProps {
  label?: string
  tokens: TokenType[]
  onDismiss?: (value: string) => void
  maxVisible?: number
  className?: string
}

export function TokenGroup({
  label,
  tokens,
  onDismiss,
  maxVisible = 5,
  className,
}: TokenGroupProps) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? tokens : tokens.slice(0, maxVisible)
  const remaining = tokens.length - maxVisible

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-ds-comment">
            {label}
          </span>
          {tokens.length > 0 && (
            <button
              type="button"
              onClick={() => onDismiss?.(tokens.map(t => t.value).join(','))}
              className="text-[10px] text-ds-comment hover:text-ds-red transition-colors"
            >
              Dismiss all
            </button>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {visible.map((token) => (
          <Token
            key={token.value}
            label={token.label}
            variant={token.variant}
            onDismiss={onDismiss ? () => onDismiss(token.value) : undefined}
          />
        ))}
        {!showAll && remaining > 0 && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className={cn(
              'inline-flex items-center rounded-ds-pill px-2.5 py-0.5',
              'text-[11px] font-semibold text-ds-comment border border-ds-current',
              'hover:bg-ds-current/50 transition-colors cursor-pointer'
            )}
          >
            +{remaining} more
          </button>
        )}
      </div>
    </div>
  )
}