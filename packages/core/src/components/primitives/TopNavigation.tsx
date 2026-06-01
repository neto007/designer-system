import { type ReactNode, useState } from 'react'
import { Menu, X, Shield } from 'lucide-react'
import { cn } from '../../lib/cn'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TopNavItem {
  id: string
  label: ReactNode
  href?: string
  active?: boolean
  onClick?: () => void
}

export interface TopNavigationProps {
  logo?: ReactNode
  title?: ReactNode
  items?: TopNavItem[]
  utility?: ReactNode
  search?: ReactNode
  className?: string
  sticky?: boolean
  blurred?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TopNavigation({
  logo,
  title,
  items = [],
  utility,
  search,
  className,
  sticky = true,
  blurred = true,
}: TopNavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header
        className={cn(
          'h-16 flex items-center border-b border-ds-current z-sticky',
          sticky && 'sticky top-0',
          blurred && 'backdrop-blur-md bg-ds-bg/80',
          !blurred && 'bg-ds-bg',
          className
        )}
      >
        <div className="flex items-center w-full px-4 gap-4">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {logo ?? (
              <div className="w-7 h-7 bg-ds-purple rounded flex items-center justify-center shadow-glow">
                <Shield className="h-3.5 w-3.5 text-ds-on-accent" />
              </div>
            )}
            {title && (
              <span className="font-black uppercase tracking-widest italic text-sm text-ds-fg">
                {title}
              </span>
            )}
          </div>

          {/* Primary nav links — desktop */}
          {items.length > 0 && (
            <nav className="hidden md:flex items-center gap-1 ml-2">
              {items.map((item) => (
                <NavLink key={item.id} item={item} />
              ))}
            </nav>
          )}

          {/* Search slot */}
          {search && (
            <div className="flex-1 max-w-sm hidden md:block">{search}</div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Utility area */}
          {utility && (
            <div className="hidden md:flex items-center gap-2">{utility}</div>
          )}

          {/* Mobile hamburger */}
          {items.length > 0 && (
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden text-ds-comment hover:text-ds-fg transition-colors p-1"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && items.length > 0 && (
        <div className="md:hidden border-b border-ds-current bg-ds-panel px-4 py-3 space-y-1 z-sticky sticky top-16">
          {items.map((item) => (
            <NavLink key={item.id} item={item} mobile onClick={() => setMobileOpen(false)} />
          ))}
          {utility && <div className="pt-2 border-t border-ds-current/40">{utility}</div>}
        </div>
      )}
    </>
  )
}

// ─── NavLink sub-component ────────────────────────────────────────────────────

function NavLink({
  item,
  mobile,
  onClick,
}: {
  item: TopNavItem
  mobile?: boolean
  onClick?: () => void
}) {
  const Tag = item.href ? 'a' : 'button'
  return (
    <Tag
      href={item.href}
      onClick={() => { item.onClick?.(); onClick?.() }}
      className={cn(
        'transition-colors cursor-pointer border-0 bg-transparent text-sm',
        mobile
          ? 'flex w-full px-3 py-2 rounded-ds-sm'
          : 'px-3 py-1.5 rounded-ds-sm',
        item.active
          ? 'text-ds-purple bg-ds-purple/10 font-semibold'
          : 'text-ds-comment hover:text-ds-fg hover:bg-ds-current/50'
      )}
    >
      {item.label}
    </Tag>
  )
}

// ─── TopNavSearch ─────────────────────────────────────────────────────────────

export interface TopNavSearchProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export function TopNavSearch({
  value,
  onChange,
  placeholder = 'Search…',
  className,
}: TopNavSearchProps) {
  return (
    <div className={cn('relative', className)}>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full h-8 pl-3 pr-8 text-sm rounded-ds-md border border-ds-current bg-ds-panel',
          'text-ds-fg placeholder:text-ds-comment',
          'focus:outline-none focus:ring-2 focus:ring-ds-purple/50 focus:border-ds-purple',
          'transition-colors'
        )}
      />
      <kbd className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[9px] text-ds-comment border border-ds-current rounded px-1 py-0.5">
        ⌘K
      </kbd>
    </div>
  )
}
