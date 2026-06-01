import * as RadixTooltip from '@radix-ui/react-tooltip'
import { cn } from '../../lib/cn'

export const TooltipProvider = RadixTooltip.Provider

export const Tooltip = RadixTooltip.Root

export const TooltipTrigger = RadixTooltip.Trigger

export function TooltipContent({
  className,
  sideOffset = 6,
  ...props
}: RadixTooltip.TooltipContentProps) {
  return (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        sideOffset={sideOffset}
        className={cn(
          'z-tooltip px-2.5 py-1.5',
          'bg-ds-selection border border-ds-current rounded-ds-sm',
          'font-mono text-[11px] text-ds-fg',
          'shadow-[0_4px_12px_rgba(0,0,0,.5)]',
          'animate-in fade-in-0 zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          className
        )}
        {...props}
      />
    </RadixTooltip.Portal>
  )
}
TooltipContent.displayName = 'TooltipContent'
