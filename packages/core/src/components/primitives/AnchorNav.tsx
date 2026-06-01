import { useState, useEffect, useRef, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface AnchorNavItem {
  id: string
  label: string
  level?: 1 | 2 | 3
}

export interface AnchorNavProps {
  items: AnchorNavItem[]
  className?: string
  title?: string
  offset?: number
}

export function AnchorNav({
  items,
  className,
  title = 'On this page',
  offset = 80,
}: AnchorNavProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (headings.length === 0) return

    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
            break
          }
        }
      },
      { rootMargin: `-${offset}px 0px -60% 0px`, threshold: 0 }
    )

    headings.forEach((h) => observerRef.current!.observe(h))
    return () => observerRef.current?.disconnect()
  }, [items, offset])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav aria-label="On this page" className={cn('space-y-1', className)}>
      {title && (
        <div className="text-[10px] font-mono uppercase tracking-widest text-ds-comment mb-3">
          {title}
        </div>
      )}
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => scrollTo(item.id)}
              className={cn(
                'w-full text-left text-xs transition-colors duration-fast',
                item.level === 2 ? 'pl-3' : item.level === 3 ? 'pl-6' : '',
                active === item.id
                  ? 'text-ds-purple font-semibold'
                  : 'text-ds-comment hover:text-ds-fg'
              )}
            >
              {active === item.id && (
                <span className="inline-block w-1 h-1 rounded-full bg-ds-purple mr-1.5 -mb-0.5" />
              )}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// ─── Anchor heading helper ────────────────────────────────────────────────────

export interface AnchorHeadingProps {
  id: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  children: ReactNode
  className?: string
}

export function AnchorHeading({ id, as: Tag = 'h2', children, className }: AnchorHeadingProps) {
  return (
    <Tag id={id} className={cn('scroll-mt-20', className)}>
      {children}
    </Tag>
  )
}
