import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const iconVariants = cva('inline-flex flex-shrink-0', {
  variants: {
    size: {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
  defaultVariants: { size: 'md' },
})

export interface IconProps
  extends VariantProps<typeof iconVariants> {
  icon: ReactNode
  className?: string
}

export function Icon({ className, size, icon }: IconProps) {
  return (
    <span className={cn(iconVariants({ size }), className)}>
      {icon}
    </span>
  )
}

Icon.displayName = 'Icon'