import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Command, Sun, Moon, Zap } from 'lucide-react'
import { NAV } from '../../layouts/nav'
import { cn, useTheme } from '@shieldai/ds'
import type { ReactNode } from 'react'

interface CommandItem {
  id: string
  label: string
  group: string
  href?: string
  action?: () => void
  icon?: ReactNode
  keywords?: string
}

function buildItems(toggleTheme: () => void, theme: string): CommandItem[] {
  const items: CommandItem[] = []

  for (const group of NAV) {
    for (const item of group.items) {
      if (items.some(i => i.href === item.href && i.group === group.label)) continue
      items.push({
        id: `${group.num}-${item.href}-${item.label}`,
        label: item.label,
        group: group.label,
        href: item.href,
        keywords: group.label,
      })
    }
  }

  items.push({
    id: 'toggle-theme',
    label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
    group: 'Actions',
    action: toggleTheme,
    icon: theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />,
  })

  items.push({
    id: 'goto-overview',
    label: 'Go to Overview',
    group: 'Actions',
    action: undefined,
    icon: <Zap className="h-3.5 w-3.5" />,
    href: '/',
  })

  return items
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const allItems = buildItems(toggleTheme, theme)

  const filtered = query.trim()
    ? allItems.filter(item => {
        const q = query.toLowerCase()
        return (
          item.label.toLowerCase().includes(q) ||
          item.group.toLowerCase().includes(q) ||
          item.keywords?.toLowerCase().includes(q)
        )
      })
    : allItems.slice(0, 14)

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 40)
    }
  }, [open])

  useEffect(() => { setSelected(0) }, [query])

  const execute = useCallback((item: CommandItem) => {
    if (item.href) navigate(item.href)
    else if (item.action) item.action()
    onClose()
  }, [navigate, onClose])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
      if (e.key === 'Enter' && filtered[selected]) execute(filtered[selected])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, filtered, selected, execute, onClose])

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selected}"]`) as HTMLElement
    el?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  if (!open) return null

  // Build grouped structure tracking global index
  const grouped: { group: string; items: (CommandItem & { idx: number })[] }[] = []
  let counter = 0
  const seenGroups = new Map<string, number>()

  for (const item of filtered) {
    if (!seenGroups.has(item.group)) {
      seenGroups.set(item.group, grouped.length)
      grouped.push({ group: item.group, items: [] })
    }
    const gIdx = seenGroups.get(item.group)!
    grouped[gIdx].items.push({ ...item, idx: counter++ })
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[12vh] px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-[560px] bg-ds-panel border border-ds-current rounded-ds-lg shadow-2xl overflow-hidden">
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 border-b border-ds-current">
          <Search className="h-4 w-4 text-ds-comment flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search components, pages, actions…"
            className="flex-1 bg-transparent py-4 text-[14px] text-ds-fg placeholder:text-ds-comment outline-none font-mono"
          />
          <kbd className="font-mono text-[10px] text-ds-comment border border-ds-current rounded px-1.5 py-0.5 flex-shrink-0">ESC</kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="overflow-y-auto max-h-[400px] py-1.5">
          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center text-ds-comment font-mono text-[12px]">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            grouped.map(({ group, items }) => (
              <div key={group}>
                <div className="px-4 pt-3 pb-1 font-mono text-[9px] uppercase tracking-widest text-ds-comment">
                  {group}
                </div>
                {items.map(item => (
                  <button
                    key={item.id}
                    data-idx={item.idx}
                    onClick={() => execute(item)}
                    onMouseEnter={() => setSelected(item.idx)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors text-left',
                      selected === item.idx
                        ? 'bg-ds-purple/15 text-ds-purple'
                        : 'text-ds-fg hover:bg-ds-current/30'
                    )}
                  >
                    <span className={cn('flex-shrink-0', selected === item.idx ? 'text-ds-purple' : 'text-ds-comment')}>
                      {item.icon ?? <ArrowRight className="h-3.5 w-3.5" />}
                    </span>
                    <span className="font-medium truncate">{item.label}</span>
                    {selected === item.idx && (
                      <kbd className="ml-auto flex-shrink-0 font-mono text-[9px] text-ds-comment border border-ds-current rounded px-1 py-0.5">↵</kbd>
                    )}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-ds-current flex items-center gap-5">
          <span className="font-mono text-[9px] text-ds-comment flex items-center gap-1">
            <kbd className="border border-ds-current rounded px-1 py-0.5">↑↓</kbd> navigate
          </span>
          <span className="font-mono text-[9px] text-ds-comment flex items-center gap-1">
            <kbd className="border border-ds-current rounded px-1 py-0.5">↵</kbd> select
          </span>
          <span className="ml-auto font-mono text-[9px] text-ds-comment flex items-center gap-1">
            <Command className="h-3 w-3" /> K
          </span>
        </div>
      </div>
    </div>
  )
}
