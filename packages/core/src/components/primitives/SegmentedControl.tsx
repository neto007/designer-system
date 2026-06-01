import * as RadixToggleGroup from '@radix-ui/react-toggle-group'
import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'

export interface SegmentItem {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps {
  items: SegmentItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  size?: 'sm' | 'md'
  className?: string
}

export function SegmentedControl({
  items,
  value,
  defaultValue,
  onValueChange,
  size = 'md',
  className,
}: SegmentedControlProps) {
  return (
    <RadixToggleGroup.Root
      type="single"
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v) => { if (v) onValueChange?.(v) }}
      className={cn(
        'inline-flex p-0.5 rounded-ds-md bg-ds-panel border border-ds-current gap-0.5',
        className
      )}
    >
      {items.map((item) => (
        <RadixToggleGroup.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={cn(
            'inline-flex items-center justify-center rounded-ds-sm font-mono uppercase tracking-widest',
            'transition-all duration-fast cursor-pointer',
            'text-ds-comment hover:text-ds-fg',
            'data-[state=on]:bg-ds-purple data-[state=on]:text-ds-on-accent data-[state=on]:shadow-[0_0_8px_rgba(189,147,249,.4)]',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ds-purple',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            size === 'sm' ? 'text-[9px] px-2.5 py-1' : 'text-[10px] px-3 py-1.5'
          )}
        >
          {item.label}
        </RadixToggleGroup.Item>
      ))}
    </RadixToggleGroup.Root>
  )
}
