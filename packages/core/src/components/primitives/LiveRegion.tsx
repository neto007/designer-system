import { useState, useCallback, useEffect, useRef, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

// ─── Live Region Component ────────────────────────────────────────────────────

export interface LiveRegionProps {
  children?: ReactNode
  assertive?: boolean
  className?: string
}

export function LiveRegion({
  children,
  assertive = false,
  className,
}: LiveRegionProps) {
  return (
    <div
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={cn('sr-only', className)}
    >
      {children}
    </div>
  )
}

// ─── useLiveRegion Hook ───────────────────────────────────────────────────────

export interface LiveRegionMessage {
  id: number
  text: string
}

export function useLiveRegion() {
  const [messages, setMessages] = useState<LiveRegionMessage[]>([])
  const idRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const announce = useCallback((text: string) => {
    const id = ++idRef.current
    setMessages([{ id, text }])

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setMessages([])
    }, 5000)
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return {
    announce,
    messages,
    LiveRegionAnnouncer: messages.length > 0
      ? ({ className }: { className?: string }) => (
          <LiveRegion assertive className={className}>
            {messages[messages.length - 1]?.text}
          </LiveRegion>
        )
      : () => null,
  }
}