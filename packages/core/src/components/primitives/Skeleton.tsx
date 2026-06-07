import { cn } from '../../lib/cn'

const BASE =
  'bg-ds-current animate-shimmer bg-[length:200%_100%] [background-image:linear-gradient(90deg,var(--ds-current)_0%,var(--ds-selection)_50%,var(--ds-current)_100%)]'

// ─── Primitive ────────────────────────────────────────────────────────────────

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('rounded-ds-sm', BASE, className)}
      aria-hidden="true"
      {...props}
    />
  )
}

// ─── Text lines ───────────────────────────────────────────────────────────────

export interface SkeletonTextProps {
  lines?: number
  lastLineWidth?: string  // e.g. '60%'
  className?: string
}

export function SkeletonText({ lines = 3, lastLineWidth = '60%', className }: SkeletonTextProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn('h-3 rounded-ds-sm', BASE)}
          style={i === lines - 1 && lines > 1 ? { width: lastLineWidth } : undefined}
        />
      ))}
    </div>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

export interface SkeletonAvatarProps {
  size?: number
  className?: string
}

export function SkeletonAvatar({ size = 40, className }: SkeletonAvatarProps) {
  return (
    <div
      className={cn('rounded-full flex-shrink-0', BASE, className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  )
}

// ─── Image / rect ─────────────────────────────────────────────────────────────

export interface SkeletonImageProps {
  width?: number | string
  height?: number | string
  aspect?: string          // CSS aspect-ratio, e.g. '16/9'
  className?: string
}

export function SkeletonImage({ width = '100%', height, aspect = '16/9', className }: SkeletonImageProps) {
  return (
    <div
      className={cn('rounded-ds-md', BASE, className)}
      style={{ width, height, aspectRatio: height ? undefined : aspect }}
      aria-hidden="true"
    />
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export interface SkeletonCardProps {
  showImage?: boolean
  lines?: number
  className?: string
}

export function SkeletonCard({ showImage = true, lines = 3, className }: SkeletonCardProps) {
  return (
    <div className={cn('rounded-ds-xl border border-ds-current overflow-hidden', className)} aria-hidden="true">
      {showImage && <SkeletonImage height={160} aspect={undefined} className="rounded-none" />}
      <div className="p-4 flex flex-col gap-3">
        <div className={cn('h-4 w-3/4 rounded-ds-sm', BASE)} />
        <SkeletonText lines={lines} />
        <div className="flex gap-2 mt-1">
          <div className={cn('h-7 w-20 rounded-ds-sm', BASE)} />
          <div className={cn('h-7 w-16 rounded-ds-sm', BASE)} />
        </div>
      </div>
    </div>
  )
}

// ─── List item ────────────────────────────────────────────────────────────────

export interface SkeletonListItemProps {
  showAvatar?: boolean
  className?: string
}

export function SkeletonListItem({ showAvatar = true, className }: SkeletonListItemProps) {
  return (
    <div className={cn('flex items-center gap-3 py-2.5', className)} aria-hidden="true">
      {showAvatar && <SkeletonAvatar size={36} />}
      <div className="flex-1 flex flex-col gap-2">
        <div className={cn('h-3 w-1/2 rounded-ds-sm', BASE)} />
        <div className={cn('h-2.5 w-3/4 rounded-ds-sm', BASE)} />
      </div>
    </div>
  )
}
