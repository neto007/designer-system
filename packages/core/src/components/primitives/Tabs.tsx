import * as RadixTabs from '@radix-ui/react-tabs'
import { cn } from '../../lib/cn'

export const Tabs = RadixTabs.Root

export const TabsList = ({ className, ...props }: RadixTabs.TabsListProps) => (
  <RadixTabs.List
    className={cn(
      'inline-flex gap-1 p-1 rounded-ds-md bg-ds-current',
      className
    )}
    {...props}
  />
)
TabsList.displayName = 'TabsList'

export const TabsTrigger = ({ className, ...props }: RadixTabs.TabsTriggerProps) => (
  <RadixTabs.Trigger
    className={cn(
      'h-8 px-3 rounded-ds-sm text-[13px] font-medium',
      'text-ds-comment bg-transparent border-0',
      'cursor-pointer select-none transition-all duration-fast',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-purple',
      'disabled:opacity-50 disabled:pointer-events-none',
      'data-[state=active]:bg-ds-bg data-[state=active]:text-ds-purple',
      'hover:text-ds-fg',
      className
    )}
    {...props}
  />
)
TabsTrigger.displayName = 'TabsTrigger'

export const TabsContent = ({ className, ...props }: RadixTabs.TabsContentProps) => (
  <RadixTabs.Content
    className={cn(
      'mt-3 focus-visible:outline-none',
      'data-[state=inactive]:hidden',
      className
    )}
    {...props}
  />
)
TabsContent.displayName = 'TabsContent'
