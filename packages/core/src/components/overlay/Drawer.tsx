import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'

const drawerVariants = cva(
  [
    'fixed z-modal bg-ds-panel flex flex-col',
    'border-ds-current',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
  ],
  {
    variants: {
      side: {
        right:  'inset-y-0 right-0 w-[360px] border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
        left:   'inset-y-0 left-0  w-[360px] border-r data-[state=open]:slide-in-from-left  data-[state=closed]:slide-out-to-left',
        bottom: 'inset-x-0 bottom-0 h-[50vh]  border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
      },
    },
    defaultVariants: { side: 'right' },
  }
)

export interface DrawerProps extends VariantProps<typeof drawerVariants> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
  trigger?: ReactNode
}

export function Drawer({ open, onOpenChange, side, children, trigger }: DrawerProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-overlay bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <RadixDialog.Content className={drawerVariants({ side })}>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

export function DrawerHeader({ children, onClose }: { children?: ReactNode; onClose?: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-ds-current flex-shrink-0">
      <div className="flex-1">{children}</div>
      {onClose && (
        <RadixDialog.Close asChild>
          <button onClick={onClose} className="text-ds-comment hover:text-ds-fg transition-colors ml-4">
            <X className="h-4 w-4" />
          </button>
        </RadixDialog.Close>
      )}
    </div>
  )
}

export function DrawerTitle({ children }: { children: ReactNode }) {
  return <RadixDialog.Title className="font-black uppercase tracking-tight text-ds-fg text-base">{children}</RadixDialog.Title>
}

export function DrawerDescription({ children }: { children: ReactNode }) {
  return <RadixDialog.Description className="text-ds-comment text-sm mt-0.5">{children}</RadixDialog.Description>
}

export function DrawerBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex-1 overflow-y-auto px-5 py-4', className)}>{children}</div>
}

export function DrawerFooter({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-ds-current flex-shrink-0">{children}</div>
}

export { RadixDialog as DrawerPrimitive }
