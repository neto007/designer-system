import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  siblings?: number
  className?: string
}

function getPages(page: number, total: number, siblings: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const left  = Math.max(2, page - siblings)
  const right = Math.min(total - 1, page + siblings)
  const pages: (number | '...')[] = [1]

  if (left > 2) pages.push('...')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('...')
  pages.push(total)
  return pages
}

export function Pagination({ page, totalPages, onPageChange, siblings = 1, className }: PaginationProps) {
  const pages = getPages(page, totalPages, siblings)

  const btn = (content: React.ReactNode, target: number, disabled: boolean, active = false) => (
    <button
      onClick={() => !disabled && onPageChange(target)}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center h-7 min-w-[28px] px-1.5 rounded-ds-sm font-mono text-[11px]',
        'transition-colors duration-fast',
        active
          ? 'bg-ds-purple text-ds-on-accent shadow-[0_0_8px_rgba(189,147,249,.4)]'
          : 'text-ds-comment hover:text-ds-fg hover:bg-ds-current/50',
        disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent hover:text-ds-comment'
      )}
    >
      {content}
    </button>
  )

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      {btn(<ChevronLeft className="h-3.5 w-3.5" />, page - 1, page <= 1)}
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="inline-flex items-center justify-center h-7 w-7 text-ds-current">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </span>
        ) : (
          btn(p, p, false, p === page)
        )
      )}
      {btn(<ChevronRight className="h-3.5 w-3.5" />, page + 1, page >= totalPages)}
    </nav>
  )
}
