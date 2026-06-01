import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface SideNavItem {
  label: string
  href?: string
  icon?: ReactNode
  badge?: string | number
  active?: boolean
  onClick?: () => void
  children?: SideNavItem[]
}

export interface SideNavSection {
  label?: string
  items: SideNavItem[]
}

export interface SideNavigationProps {
  sections: SideNavSection[]
  header?: ReactNode
  footer?: ReactNode
  className?: string
  width?: number | string
}

function NavItemRow({
  item,
  depth = 0,
}: {
  item: SideNavItem
  depth?: number
}) {
  const [open, setOpen] = useState(item.children?.some((c) => c.active) ?? false)
  const hasChildren = item.children && item.children.length > 0

  const handleClick = () => {
    if (hasChildren) setOpen((o) => !o)
    item.onClick?.()
  }

  const Tag = item.href && !hasChildren ? 'a' : 'button'

  return (
    <li>
      <Tag
        href={item.href}
        type={Tag === 'button' ? 'button' : undefined}
        onClick={handleClick}
        className={cn(
          'w-full flex items-center gap-2.5 rounded-ds-md text-sm font-medium transition-all duration-fast',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-purple',
          depth === 0 ? 'px-3 py-2' : 'pl-8 pr-3 py-1.5',
          item.active
            ? 'bg-ds-purple/15 text-ds-purple border-l-2 border-ds-purple pl-[10px]'
            : 'text-ds-fg/70 hover:bg-ds-panel hover:text-ds-fg'
        )}
      >
        {item.icon && (
          <span className={cn('flex-shrink-0 h-4 w-4', item.active ? 'text-ds-purple' : 'text-ds-comment')}>
            {item.icon}
          </span>
        )}
        <span className="flex-1 truncate text-left">{item.label}</span>
        {item.badge !== undefined && (
          <span className={cn(
            'flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-mono font-bold flex items-center justify-center',
            item.active ? 'bg-ds-purple/30 text-ds-purple' : 'bg-ds-current text-ds-comment'
          )}>
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 flex-shrink-0 text-ds-comment transition-transform duration-fast',
              open && 'rotate-180'
            )}
          />
        )}
      </Tag>
      {hasChildren && open && (
        <ul className="mt-0.5 space-y-0.5">
          {item.children!.map((child, i) => (
            <NavItemRow key={i} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function SideNavigation({
  sections,
  header,
  footer,
  className,
  width = 240,
}: SideNavigationProps) {
  return (
    <nav
      style={{ width: typeof width === 'number' ? `${width}px` : width }}
      className={cn(
        'flex flex-col h-full bg-ds-panel border-r border-ds-current overflow-y-auto flex-shrink-0',
        className
      )}
    >
      {header && (
        <div className="px-4 py-3 border-b border-ds-current flex-shrink-0">
          {header}
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {sections.map((section, si) => (
          <div key={si}>
            {section.label && (
              <div className="px-3 mb-1 text-[10px] font-mono uppercase tracking-widest text-ds-comment">
                {section.label}
              </div>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item, ii) => (
                <NavItemRow key={ii} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {footer && (
        <div className="px-4 py-3 border-t border-ds-current flex-shrink-0">
          {footer}
        </div>
      )}
    </nav>
  )
}
