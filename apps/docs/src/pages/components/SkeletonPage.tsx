import { Skeleton } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { Skeleton } from '@shieldai/ds'

// Card skeleton
<div className="flex items-center gap-3">
  <Skeleton className="w-10 h-10 rounded-full" />
  <div className="space-y-2 flex-1">
    <Skeleton className="h-3 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
  </div>
</div>

// Block
<Skeleton className="h-24 w-full rounded-ds-lg" />

// Text lines
<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-5/6" />
  <Skeleton className="h-4 w-4/6" />
</div>`

const PROPS = [
  { name: 'className', type: 'string', description: 'Tailwind classes for width, height, and shape — the shimmer fills whatever you provide' },
]

export default function SkeletonPage() {
  return (
    <ComponentBlock
      num="02.09"
      title="Skeleton"
      tag="CSS shimmer · aria-hidden"
      description="Loading placeholder that inherits the design token shimmer animation. Shape and size are set entirely through className — the component just adds the shimmer."
      preview={
        <div className="space-y-5 max-w-sm w-full">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-24 w-full rounded-ds-lg" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
        </div>
      }
      code={CODE}
      filename="Skeleton.tsx"
      props={PROPS}
    />
  )
}
