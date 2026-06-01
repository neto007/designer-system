import { cn } from '../../lib/cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-ds-sm bg-ds-current animate-shimmer',
        'bg-[length:200%_100%]',
        '[background-image:linear-gradient(90deg,var(--ds-current)_0%,var(--ds-selection)_50%,var(--ds-current)_100%)]',
        className
      )}
      aria-hidden="true"
      {...props}
    />
  )
}
