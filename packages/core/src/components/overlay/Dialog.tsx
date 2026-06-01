import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

export const Dialog = RadixDialog.Root
export const DialogTrigger = RadixDialog.Trigger
export const DialogClose = RadixDialog.Close
export const DialogPortal = RadixDialog.Portal

export function DialogOverlay({ className, ...props }: RadixDialog.DialogOverlayProps) {
  return (
    <RadixDialog.Overlay
      className={cn(
        'fixed inset-0 z-overlay bg-black/60 backdrop-blur-sm',
        'animate-in fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className
      )}
      {...props}
    />
  )
}

const dialogContentVariants = cva(
  [
    'fixed left-1/2 top-1/2 z-modal w-full max-w-lg',
    '-translate-x-1/2 -translate-y-1/2',
    'bg-ds-panel rounded-ds-xl p-6',
    'border',
    'shadow-[0_24px_64px_rgba(0,0,0,.8)]',
    'animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-48',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'focus:outline-none',
  ],
  {
    variants: {
      variant: {
        default: 'border-ds-current',
        neu:     'border-2 border-ds-fg shadow-neu-lg',
        purple:  'border-ds-purple shadow-glow',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface DialogContentProps
  extends RadixDialog.DialogContentProps,
    VariantProps<typeof dialogContentVariants> {
  showClose?: boolean
}

export function DialogContent({
  className,
  variant,
  showClose = true,
  children,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <RadixDialog.Content
        className={cn(dialogContentVariants({ variant }), className)}
        {...props}
      >
        {children}
        {showClose && (
          <RadixDialog.Close
            className={cn(
              'absolute right-4 top-4',
              'text-ds-comment hover:text-ds-fg',
              'transition-colors duration-fast',
              'focus:outline-none focus:ring-2 focus:ring-ds-purple focus:ring-offset-2 focus:ring-offset-ds-panel',
              'rounded-ds-sm'
            )}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </DialogPortal>
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-5', className)} {...props} />
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-end gap-2 mt-6 pt-4 border-t border-ds-current', className)}
      {...props}
    />
  )
}

export function DialogTitle({ className, ...props }: RadixDialog.DialogTitleProps) {
  return (
    <RadixDialog.Title
      className={cn('text-base font-bold text-ds-fg', className)}
      {...props}
    />
  )
}

export function DialogDescription({ className, ...props }: RadixDialog.DialogDescriptionProps) {
  return (
    <RadixDialog.Description
      className={cn('text-sm text-ds-comment mt-1', className)}
      {...props}
    />
  )
}
