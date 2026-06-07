import { useState, useCallback, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/cn'
import type { ProgressColor } from '../primitives/Progress'

const colorGlow: Record<ProgressColor, string> = {
  purple: 'bg-ds-purple shadow-[0_0_8px_2px_#bd93f9]',
  green:  'bg-ds-green  shadow-[0_0_8px_2px_#50fa7b]',
  cyan:   'bg-ds-cyan   shadow-[0_0_8px_2px_#8be9fd]',
  orange: 'bg-ds-orange shadow-[0_0_8px_2px_#ffb86c]',
  red:    'bg-ds-red    shadow-[0_0_8px_2px_#ff5555]',
}

export interface PageProgressBarProps {
  value: number        // 0–100
  color?: ProgressColor
  visible?: boolean
  height?: number      // px, default 3
}

export function PageProgressBar({
  value,
  color = 'purple',
  visible = true,
  height = 3,
}: PageProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value))
  const isDone = pct >= 100

  return createPortal(
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'fixed top-0 left-0 right-0 z-[200] transition-opacity duration-[300ms]',
        visible && !isDone ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      style={{ height }}
    >
      <div
        className={cn(
          'h-full rounded-r-full transition-[width] duration-[400ms] ease-[cubic-bezier(0.05,0.7,0.1,1.0)]',
          colorGlow[color]
        )}
        style={{ width: `${pct}%` }}
      />
    </div>,
    document.body
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface UsePageProgressReturn {
  value: number
  visible: boolean
  color: ProgressColor
  start: (c?: ProgressColor) => void
  advance: (to?: number) => void
  complete: () => void
  fail: () => void
  reset: () => void
}

export function usePageProgress(): UsePageProgressReturn {
  const [value, setValue] = useState(0)
  const [visible, setVisible] = useState(false)
  const [color, setColor] = useState<ProgressColor>('purple')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimers = () => {
    if (timerRef.current)    clearTimeout(timerRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const start = useCallback((c: ProgressColor = 'purple') => {
    clearTimers()
    setColor(c)
    setVisible(true)
    setValue(15)
    // Slowly advance to ~85% while waiting
    intervalRef.current = setInterval(() => {
      setValue(v => {
        if (v >= 85) { clearInterval(intervalRef.current!) ; return v }
        return v + Math.random() * 6 + 2
      })
    }, 600)
  }, [])

  const advance = useCallback((to?: number) => {
    setValue(v => Math.min(90, to ?? v + Math.random() * 12 + 4))
  }, [])

  const complete = useCallback(() => {
    clearTimers()
    setValue(100)
    timerRef.current = setTimeout(() => {
      setVisible(false)
      setValue(0)
    }, 500)
  }, [])

  const fail = useCallback(() => {
    clearTimers()
    setColor('red')
    setValue(100)
    timerRef.current = setTimeout(() => {
      setVisible(false)
      setValue(0)
      setColor('purple')
    }, 800)
  }, [])

  const reset = useCallback(() => {
    clearTimers()
    setVisible(false)
    setValue(0)
    setColor('purple')
  }, [])

  useEffect(() => () => clearTimers(), [])

  return { value, visible, color, start, advance, complete, fail, reset }
}
