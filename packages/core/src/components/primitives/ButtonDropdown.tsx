import { useState, useRef, useEffect, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button } from './Button'
import type { ButtonProps } from './Button'

export interface DropdownItem {
  id: string
  label: ReactNode
  icon?: ReactNode
  description?: string
  disabled?: boolean
  danger?: boolean
  href?: string
}

export interface DropdownGroup {
  label?: string
  items: DropdownItem[]
}

export interface ButtonDropdownProps
  extends Omit<ButtonProps, 'onClick' | 'rightIcon' | 'children'> {
  label: ReactNode
  items: (DropdownItem | DropdownGroup)[]
  onItemClick?: (item: DropdownItem) => void
  placement?: 'bottom-start' | 'bottom-end'
  disabled?: boolean
}

function isGroup(item: DropdownItem | DropdownGroup): item is DropdownGroup {
  return 'items' in item && !('label' in item && 'id' in item)
}

export function ButtonDropdown({
  label,
  items,
  onItemClick,
  placement = 'bottom-start',
  disabled,
  variant = 'outline',
  size,
  className,
  ...buttonProps
}: ButtonDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const handleItem = (item: DropdownItem) => {
    if (item.disabled) return
    onItemClick?.(item)
    setOpen(false)
    if (item.href) window.location.href = item.href
  }

  const flatGroups: DropdownGroup[] = items.map((item) =>
    isGroup(item) ? item : { items: [item] }
  )

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        rightIcon={
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-fast',
              open && 'rotate-180'
            )}
          />
        }
        aria-haspopup="menu"
        aria-expanded={open}
        {...buttonProps}
      >
        {label}
      </Button>

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute z-dropdown mt-1 min-w-[10rem] rounded-ds-md border border-ds-current',
            'bg-ds-panel shadow-neu-sm overflow-hidden py-1',
            placement === 'bottom-end' ? 'right-0' : 'left-0'
          )}
        >
          {flatGroups.map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <div className="my-1 h-px bg-ds-current/50" />}
              {group.label && (
                <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ds-comment">
                  {group.label}
                </div>
              )}
              {group.items.map((item) => (
                <button
                  key={item.id}
                  role="menuitem"
                  onClick={() => handleItem(item)}
                  disabled={item.disabled}
                  className={cn(
                    'flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left',
                    'transition-colors cursor-pointer border-0 bg-transparent',
                    item.disabled
                      ? 'opacity-40 cursor-not-allowed text-ds-comment'
                      : item.danger
                        ? 'text-ds-red hover:bg-ds-red/10'
                        : 'text-ds-fg hover:bg-ds-current/50 hover:text-ds-purple'
                  )}
                >
                  {item.icon && (
                    <span className="flex-shrink-0 opacity-70">{item.icon}</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{item.label}</div>
                    {item.description && (
                      <div className="text-xs text-ds-comment truncate mt-0.5">
                        {item.description}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
