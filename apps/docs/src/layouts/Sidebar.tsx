import { NavLink, useLocation } from 'react-router-dom'
import { useState, useMemo } from 'react'
import {
  ChevronRight, Shield, Menu, X, Sun, Moon,
  Home, Layers, Package, Layout, Grid2X2,
  MessageSquare, GitBranch, Eye, Download, MonitorPlay,
  PanelLeftClose, PanelLeftOpen, Search,
  type LucideIcon,
} from 'lucide-react'
import { NAV, type NavGroup } from './nav'
import { cn, useTheme } from '@shieldai/ds'

const ICON_MAP: Record<string, LucideIcon> = {
  Home, Layers, Package, Layout, Grid2X2,
  MessageSquare, GitBranch, Eye, Download, MonitorPlay,
}

// ─── Theme toggle ─────────────────────────────────────────────────────────────

function ThemeToggle({ mini }: { mini: boolean }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  if (mini) {
    return (
      <button
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light' : 'Switch to dark'}
        className="w-8 h-8 flex items-center justify-center rounded-ds-sm border border-ds-current text-ds-comment hover:border-ds-purple hover:text-ds-fg transition-colors duration-[150ms]"
      >
        {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'w-full flex items-center gap-2 px-2 py-1.5 rounded-ds-sm text-[11px] font-mono',
        'border border-ds-current transition-colors duration-[150ms]',
        'hover:border-ds-purple hover:text-ds-fg text-ds-comment'
      )}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <Sun className="h-3.5 w-3.5 flex-shrink-0" /> : <Moon className="h-3.5 w-3.5 flex-shrink-0" />}
      <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
    </button>
  )
}

// ─── Status dot ───────────────────────────────────────────────────────────────

function StatusDot({ status }: { status?: string }) {
  if (status === 'done') return null
  if (status === 'wip')
    return <span className="ml-auto w-1.5 h-1.5 rounded-full bg-ds-orange flex-shrink-0" />
  return <span className="ml-auto w-1.5 h-1.5 rounded-full bg-ds-current flex-shrink-0" />
}

// ─── Mini nav icon button ─────────────────────────────────────────────────────

function MiniNavItem({ group }: { group: NavGroup }) {
  const location = useLocation()
  const isActive = group.items.some(
    (i) => location.pathname === i.href || location.pathname.startsWith(i.href + '/')
  )
  const Icon = ICON_MAP[group.icon] ?? Home
  const firstHref = group.items[0]?.href ?? '/'

  return (
    <NavLink
      to={firstHref}
      title={`${group.num} · ${group.label}`}
      className={cn(
        'relative flex items-center justify-center w-9 h-9 rounded-ds-sm transition-all duration-[150ms] group',
        isActive
          ? 'bg-ds-purple/15 text-ds-purple'
          : 'text-ds-comment hover:text-ds-fg hover:bg-ds-current/50'
      )}
    >
      <Icon className="h-4 w-4" />
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-ds-purple rounded-r-full" />
      )}
      {/* Tooltip on hover */}
      <span className="absolute left-full ml-2 px-2 py-1 bg-ds-selection border border-ds-current rounded-ds-sm text-[11px] font-mono text-ds-fg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-[150ms] z-tooltip">
        {group.label}
      </span>
    </NavLink>
  )
}

// ─── Full nav section ─────────────────────────────────────────────────────────

function NavSection({ group }: { group: NavGroup }) {
  const location = useLocation()
  const isActive = group.items.some(
    (i) => location.pathname === i.href || location.pathname.startsWith(i.href + '/')
  )
  const [open, setOpen] = useState(isActive || group.num === '02')
  const Icon = ICON_MAP[group.icon] ?? Home

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center w-full gap-2 px-3 py-1.5 rounded-ds-sm',
          'text-[11px] font-black uppercase tracking-widest',
          'transition-colors duration-[150ms] cursor-pointer border-0 bg-transparent',
          isActive ? 'text-ds-purple' : 'text-ds-comment hover:text-ds-fg'
        )}
      >
        <Icon className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="font-mono text-[9px] opacity-60 w-5">{group.num}</span>
        {group.label}
        <ChevronRight
          className={cn(
            'ml-auto h-3 w-3 transition-transform duration-[150ms] flex-shrink-0',
            open && 'rotate-90'
          )}
        />
      </button>

      {open && (
        <div className="ml-3 pl-3 border-l border-ds-current space-y-0.5 mt-0.5 mb-2">
          {group.items.map((item) => (
            <NavLink
              key={item.href + item.label}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive: a }) =>
                cn(
                  'flex items-center gap-2 px-2 py-1 rounded-ds-sm text-[12px] transition-colors duration-[150ms]',
                  a
                    ? 'text-ds-purple bg-ds-purple/10 font-semibold'
                    : 'text-ds-comment hover:text-ds-fg hover:bg-ds-current/50'
                )
              }
            >
              {item.label}
              <StatusDot status={item.status} />
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

// ─── Search results ───────────────────────────────────────────────────────────

interface SearchResult { label: string; href: string; group: string }

function SidebarSearch({ onClose }: { onClose?: () => void }) {
  const [q, setQ] = useState('')

  const results = useMemo<SearchResult[]>(() => {
    if (!q.trim()) return []
    const lower = q.toLowerCase()
    const out: SearchResult[] = []
    for (const group of NAV) {
      for (const item of group.items) {
        if (
          item.label.toLowerCase().includes(lower) ||
          group.label.toLowerCase().includes(lower)
        ) {
          if (!out.some(r => r.href === item.href && r.label === item.label)) {
            out.push({ label: item.label, href: item.href, group: group.label })
          }
        }
      }
    }
    return out.slice(0, 8)
  }, [q])

  return (
    <div className="px-2 pb-2 flex-shrink-0">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-ds-comment pointer-events-none" />
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search…"
          className="w-full bg-ds-bg border border-ds-current rounded-ds-sm pl-7 pr-2 py-1.5 text-[11px] font-mono text-ds-fg placeholder:text-ds-comment outline-none focus:border-ds-purple transition-colors"
        />
      </div>
      {results.length > 0 && (
        <div className="mt-1 rounded-ds-sm border border-ds-current bg-ds-panel overflow-hidden">
          {results.map(r => (
            <NavLink
              key={r.href + r.label}
              to={r.href}
              onClick={() => { setQ(''); onClose?.() }}
              className={({ isActive: a }) => cn(
                'flex flex-col px-3 py-2 border-b border-ds-current last:border-0 transition-colors',
                a ? 'bg-ds-purple/10 text-ds-purple' : 'text-ds-fg hover:bg-ds-current/30'
              )}
            >
              <span className="text-[12px] font-medium">{r.label}</span>
              <span className="text-[9px] font-mono text-ds-comment uppercase tracking-widest">{r.group}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  onClose?: () => void
  mini?: boolean
  onToggleMini?: () => void
  onOpenPalette?: () => void
}

export function Sidebar({ onClose, mini = false, onToggleMini, onOpenPalette }: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-ds-bg border-r border-ds-current transition-[width] duration-[250ms] ease-[cubic-bezier(0.05,0.7,0.1,1.0)] overflow-hidden',
        mini ? 'w-[60px]' : 'w-[260px]'
      )}
    >
      {/* Brand */}
      <div className={cn(
        'flex items-center border-b border-ds-current flex-shrink-0',
        mini ? 'justify-center px-0 py-4' : 'justify-between gap-3 px-4 py-4'
      )}>
        {mini ? (
          <NavLink to="/" onClick={onClose} aria-label="Home">
            <div className="w-8 h-8 bg-ds-purple rounded flex items-center justify-center shadow-glow flex-shrink-0">
              <Shield className="h-4 w-4 text-black" />
            </div>
          </NavLink>
        ) : (
          <>
            <NavLink to="/" className="flex items-center gap-2.5" onClick={onClose}>
              <div className="w-8 h-8 bg-ds-purple rounded flex items-center justify-center shadow-glow flex-shrink-0">
                <Shield className="h-4 w-4 text-black" />
              </div>
              <div>
                <div className="font-black uppercase tracking-widest italic text-sm text-ds-comment leading-none">
                  Shield<em className="not-italic text-ds-green">AI</em>
                </div>
                <div className="font-mono text-[9px] text-ds-comment mt-0.5">Design System · v1.0</div>
              </div>
            </NavLink>
            {onClose && (
              <button onClick={onClose} className="text-ds-comment hover:text-ds-fg lg:hidden">
                <X className="h-4 w-4" />
              </button>
            )}
          </>
        )}
      </div>

      {/* Search (full mode only) */}
      {!mini && <SidebarSearch onClose={onClose} />}

      {/* Cmd+K hint (full mode only) */}
      {!mini && onOpenPalette && (
        <div className="px-2 pb-2 flex-shrink-0">
          <button
            onClick={onOpenPalette}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-ds-sm border border-ds-current text-ds-comment hover:border-ds-purple hover:text-ds-fg transition-colors"
          >
            <Search className="h-3 w-3 flex-shrink-0" />
            <span className="font-mono text-[10px] flex-1 text-left">Command palette</span>
            <kbd className="font-mono text-[9px] border border-ds-current rounded px-1 py-0.5">⌘K</kbd>
          </button>
        </div>
      )}

      {/* Navigation */}
      {mini ? (
        <nav className="flex-1 overflow-y-auto py-3 flex flex-col items-center gap-1">
          {NAV.map((group) => (
            <MiniNavItem key={group.num} group={group} />
          ))}
        </nav>
      ) : (
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
          {NAV.map((group) => (
            <NavSection key={group.num} group={group} />
          ))}
        </nav>
      )}

      {/* Footer */}
      <div className={cn(
        'border-t border-ds-current flex-shrink-0',
        mini ? 'px-0 py-3 flex flex-col items-center gap-2' : 'px-4 py-3 space-y-2'
      )}>
        <ThemeToggle mini={mini} />

        {/* Mini/full toggle (desktop only) */}
        {onToggleMini && (
          <button
            onClick={onToggleMini}
            aria-label={mini ? 'Expand sidebar' : 'Collapse sidebar'}
            className={cn(
              'flex items-center justify-center rounded-ds-sm border border-ds-current text-ds-comment',
              'hover:border-ds-purple hover:text-ds-fg transition-colors duration-[150ms]',
              mini ? 'w-8 h-8' : 'w-full gap-2 px-2 py-1.5 text-[11px] font-mono'
            )}
          >
            {mini
              ? <PanelLeftOpen className="h-3.5 w-3.5" />
              : <><PanelLeftClose className="h-3.5 w-3.5" /><span>Collapse</span></>
            }
          </button>
        )}

        {!mini && (
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ds-green animate-pulse-glow" />
            <span className="font-mono text-[9px] text-ds-comment uppercase tracking-widest">
              97 done · 7 agent types
            </span>
          </div>
        )}
      </div>
    </aside>
  )
}

// ─── Mobile toggle ────────────────────────────────────────────────────────────

export function MobileSidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed top-4 left-4 z-sticky bg-ds-panel border border-ds-current rounded-ds-md p-2 text-ds-comment hover:text-ds-fg shadow-neu-sm"
      aria-label="Open navigation"
    >
      <Menu className="h-4 w-4" />
    </button>
  )
}
