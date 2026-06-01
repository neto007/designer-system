import * as RadixPopover from '@radix-ui/react-popover'
import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

export const Popover = RadixPopover.Root
export const PopoverTrigger = RadixPopover.Trigger
export const PopoverAnchor = RadixPopover.Anchor

export function PopoverContent({
  className,
  sideOffset = 6,
  align = 'start',
  ...props
}: RadixPopover.PopoverContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          'z-dropdown min-w-[200px] p-1.5',
          'bg-ds-panel border border-ds-current rounded-ds-md',
          'shadow-[0_8px_32px_rgba(0,0,0,.6)]',
          'animate-in fade-in-0 zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=top]:slide-in-from-bottom-2',
          'outline-none',
          className
        )}
        {...props}
      />
    </RadixPopover.Portal>
  )
}
PopoverContent.displayName = 'PopoverContent'

export interface PopoverItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean
  icon?: React.ReactNode
}

export const PopoverItem = forwardRef<HTMLButtonElement, PopoverItemProps>(
  ({ className, danger, icon, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'flex items-center gap-2.5 w-full px-2.5 py-2 rounded-ds-sm',
        'text-xs font-bold text-left cursor-pointer border-0 bg-transparent',
        'transition-colors duration-fast',
        danger
          ? 'text-ds-red hover:bg-ds-red/10'
          : 'text-ds-fg hover:bg-ds-current hover:text-ds-purple',
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0 opacity-70">{icon}</span>}
      {children}
    </button>
  )
)
PopoverItem.displayName = 'PopoverItem'

export function PopoverSeparator({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('h-px bg-ds-current my-1 -mx-1.5', className)} />
}
