import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { ChevronRight, Shield, Menu, X, Sun, Moon } from 'lucide-react'
import { NAV, type NavGroup } from './nav'
import { cn, useTheme } from '@shieldai/ds'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'w-full flex items-center gap-2 px-2 py-1.5 rounded-ds-sm text-[11px] font-mono',
        'border border-ds-current transition-colors duration-fast',
        'hover:border-ds-purple hover:text-ds-fg text-ds-comment'
      )}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <Sun className="h-3.5 w-3.5 flex-shrink-0" /> : <Moon className="h-3.5 w-3.5 flex-shrink-0" />}
      <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
    </button>
  )
}

function StatusDot({ status }: { status?: string }) {
  if (status === 'done') return null
  if (status === 'wip')
    return <span className="ml-auto w-1.5 h-1.5 rounded-full bg-ds-orange flex-shrink-0" />
  return <span className="ml-auto w-1.5 h-1.5 rounded-full bg-ds-current flex-shrink-0" />
}

function NavSection({ group }: { group: NavGroup }) {
  const location = useLocation()
  const isActive = group.items.some((i) => location.pathname === i.href || location.pathname.startsWith(i.href + '/'))
  const [open, setOpen] = useState(isActive || group.num === '02')

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex items-center w-full gap-2 px-3 py-1.5 rounded-ds-sm',
          'text-[11px] font-black uppercase tracking-widest',
          'transition-colors duration-fast cursor-pointer border-0 bg-transparent',
          isActive ? 'text-ds-purple' : 'text-ds-comment hover:text-ds-fg'
        )}
      >
        <span className="font-mono text-[9px] opacity-60 w-5">{group.num}</span>
        {group.label}
        <ChevronRight
          className={cn(
            'ml-auto h-3 w-3 transition-transform duration-fast flex-shrink-0',
            open && 'rotate-90'
          )}
        />
      </button>

      {open && (
        <div className="ml-3 pl-3 border-l border-ds-current space-y-0.5 mt-0.5 mb-2">
          {group.items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive: a }) =>
                cn(
                  'flex items-center gap-2 px-2 py-1 rounded-ds-sm text-[12px] transition-colors duration-fast',
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

export function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <aside className="flex flex-col h-full bg-ds-bg border-r border-ds-current">
      {/* Brand */}
      <div className="flex items-center justify-between gap-3 px-4 py-4 border-b border-ds-current flex-shrink-0">
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
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-0.5">
        {NAV.map((group) => (
          <NavSection key={group.num} group={group} />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-ds-current flex-shrink-0 space-y-2">
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ds-green animate-pulse-glow" />
          <span className="font-mono text-[9px] text-ds-comment uppercase tracking-widest">
            113 done · 0 planned · 7 agent types
          </span>
        </div>
      </div>
    </aside>
  )
}

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
