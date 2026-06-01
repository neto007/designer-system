import { useState, useRef, useCallback, type ReactNode, type MouseEvent } from 'react'
import { cn } from '../../lib/cn'

export interface SplitPanelProps {
  first: ReactNode
  second: ReactNode
  direction?: 'horizontal' | 'vertical'
  defaultSplit?: number
  minFirst?: number
  minSecond?: number
  className?: string
}

export function SplitPanel({
  first,
  second,
  direction = 'horizontal',
  defaultSplit = 50,
  minFirst = 20,
  minSecond = 20,
  className,
}: SplitPanelProps) {
  const [split, setSplit] = useState(defaultSplit)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const startDrag = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      setDragging(true)

      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()

      const onMove = (me: globalThis.MouseEvent) => {
        const pos =
          direction === 'horizontal'
            ? ((me.clientX - rect.left) / rect.width) * 100
            : ((me.clientY - rect.top) / rect.height) * 100
        setSplit(Math.max(minFirst, Math.min(100 - minSecond, pos)))
      }

      const onUp = () => {
        setDragging(false)
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [direction, minFirst, minSecond]
  )

  const isH = direction === 'horizontal'

  return (
    <div
      ref={containerRef}
      className={cn('flex overflow-hidden', isH ? 'flex-row' : 'flex-col', className)}
    >
      {/* First pane */}
      <div
        style={isH ? { width: `${split}%` } : { height: `${split}%` }}
        className="overflow-auto flex-shrink-0"
      >
        {first}
      </div>

      {/* Drag handle */}
      <div
        role="separator"
        aria-orientation={isH ? 'vertical' : 'horizontal'}
        onMouseDown={startDrag}
        className={cn(
          'flex-shrink-0 flex items-center justify-center select-none transition-colors',
          isH
            ? 'w-1.5 cursor-col-resize hover:bg-ds-purple/30'
            : 'h-1.5 cursor-row-resize hover:bg-ds-purple/30',
          dragging ? 'bg-ds-purple/40' : 'bg-ds-current'
        )}
      >
        <span
          className={cn(
            'rounded-full bg-ds-comment/50',
            isH ? 'w-0.5 h-6' : 'w-6 h-0.5'
          )}
        />
      </div>

      {/* Second pane */}
      <div className="flex-1 overflow-auto min-w-0 min-h-0">
        {second}
      </div>
    </div>
  )
}
