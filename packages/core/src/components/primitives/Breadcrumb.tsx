import { ChevronRight } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'

export interface BreadcrumbItem {
  label: ReactNode
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: ReactNode
  className?: string
}

export function Breadcrumb({ items, separator, className }: BreadcrumbProps) {
  const sep = separator ?? <ChevronRight className="h-3 w-3 text-ds-current flex-shrink-0" />

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1.5', className)}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-mono text-[11px] text-ds-fg truncate max-w-[200px]"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="font-mono text-[11px] text-ds-comment hover:text-ds-fg transition-colors truncate max-w-[160px]"
                >
                  {item.label}
                </a>
              ) : (
                <span className="font-mono text-[11px] text-ds-comment truncate max-w-[160px]">
                  {item.label}
                </span>
              )}
              {!isLast && sep}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
