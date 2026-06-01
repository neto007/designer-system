import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AppLayoutToolbarProps {
  breadcrumb?: ReactNode
  title?: ReactNode
  actions?: ReactNode
  tabs?: ReactNode
  className?: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AppLayoutToolbar({
  breadcrumb,
  title,
  actions,
  tabs,
  className,
}: AppLayoutToolbarProps) {
  return (
    <div className={cn(
      'border-b border-ds-current bg-ds-panel/80 backdrop-blur-sm',
      className
    )}>
      {/* Main row: breadcrumb + title + actions */}
      <div className="flex items-center justify-between gap-4 px-6 py-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          {breadcrumb && (
            <div className="text-[11px] text-ds-comment font-mono truncate">
              {breadcrumb}
            </div>
          )}
          {title && (
            <div className="text-sm font-semibold text-ds-fg truncate">
              {title}
            </div>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
      {/* Optional tab bar */}
      {tabs && (
        <div className="px-6 pb-0">
          {tabs}
        </div>
      )}
    </div>
  )
}

// ─── ToolbarSeparator ─────────────────────────────────────────────────────────

export function ToolbarSeparator({ className }: { className?: string }) {
  return (
    <div className={cn('h-5 w-px bg-ds-current mx-1', className)} />
  )
}

// ─── ToolbarGroup ─────────────────────────────────────────────────────────────

export interface ToolbarGroupProps {
  children: ReactNode
  className?: string
}

export function ToolbarGroup({ children, className }: ToolbarGroupProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {children}
    </div>
  )
}
