import { cn } from '../../lib/cn'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  label?: string
  className?: string
}

export function Divider({ orientation = 'horizontal', label, className }: DividerProps) {
  if (orientation === 'vertical') {
    return <div role="separator" aria-orientation="vertical" className={cn('w-px self-stretch bg-ds-current', className)} />
  }

  if (label) {
    return (
      <div role="separator" className={cn('flex items-center gap-3', className)}>
        <span className="flex-1 h-px bg-ds-current" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-ds-comment flex-shrink-0">{label}</span>
        <span className="flex-1 h-px bg-ds-current" />
      </div>
    )
  }

  return <hr role="separator" className={cn('border-none h-px bg-ds-current w-full', className)} />
}
