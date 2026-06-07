import { useState, useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface CarouselProps {
  items: React.ReactNode[]
  /** How many items show at once. Default 3. */
  visibleCount?: number
  /** Gap between items in px. Default 16. */
  gap?: number
  showDots?: boolean
  showArrows?: boolean
  /** Wrap around at edges. Default false. */
  loop?: boolean
  /** Auto-advance interval in ms. 0 = off. */
  autoPlay?: number
  className?: string
  itemClassName?: string
}

export function Carousel({
  items,
  visibleCount = 3,
  gap = 16,
  showDots = true,
  showArrows = true,
  loop = false,
  autoPlay = 0,
  className,
  itemClassName,
}: CarouselProps) {
  const [page, setPage] = useState(0)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const totalPages = Math.ceil(items.length / visibleCount)

  const canPrev = loop || page > 0
  const canNext = loop || page < totalPages - 1

  const go = useCallback((dir: number) => {
    setPage(p => {
      const next = p + dir
      if (loop) return ((next % totalPages) + totalPages) % totalPages
      return Math.max(0, Math.min(totalPages - 1, next))
    })
  }, [loop, totalPages])

  useEffect(() => {
    if (!autoPlay) return
    autoRef.current = setInterval(() => go(1), autoPlay)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [autoPlay, go])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  return (
    <div className={cn('relative', className)} role="region" aria-label="Carousel">
      {/* Track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-medium2 ease-[cubic-bezier(0.05,0.7,0.1,1.0)]"
          style={{
            gap: `${gap}px`,
            transform: `translateX(calc(-${page * 100}% - ${page * gap}px))`,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={cn('flex-none', itemClassName)}
              style={{
                width: `calc(${100 / visibleCount}% - ${gap * (visibleCount - 1) / visibleCount}px)`,
              }}
              aria-hidden={
                i < page * visibleCount || i >= (page + 1) * visibleCount
              }
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {showArrows && totalPages > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            disabled={!canPrev}
            aria-label="Previous"
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10',
              'w-8 h-8 rounded-full bg-ds-panel border border-ds-current',
              'flex items-center justify-center',
              'transition-all duration-[150ms]',
              canPrev
                ? 'text-ds-fg hover:border-ds-purple hover:shadow-glow cursor-pointer'
                : 'opacity-25 cursor-not-allowed'
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(1)}
            disabled={!canNext}
            aria-label="Next"
            className={cn(
              'absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10',
              'w-8 h-8 rounded-full bg-ds-panel border border-ds-current',
              'flex items-center justify-center',
              'transition-all duration-[150ms]',
              canNext
                ? 'text-ds-fg hover:border-ds-purple hover:shadow-glow cursor-pointer'
                : 'opacity-25 cursor-not-allowed'
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && totalPages > 1 && (
        <div className="flex justify-center gap-1.5 mt-4" role="tablist">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === page}
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1} of ${totalPages}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-[200ms]',
                i === page
                  ? 'w-4 bg-ds-purple'
                  : 'w-1.5 bg-ds-current hover:bg-ds-comment'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
