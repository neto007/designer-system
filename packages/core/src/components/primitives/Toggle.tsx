import * as RadixSwitch from '@radix-ui/react-switch'
import { cn } from '../../lib/cn'

export interface ToggleProps {
  id?: string
  label?: string
  description?: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function Toggle({
  id,
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  size = 'md',
  className,
}: ToggleProps) {
  const inputId = id ?? (label ? `toggle-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <RadixSwitch.Root
        id={inputId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          'relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent',
          'transition-all duration-fast',
          'bg-ds-current data-[state=checked]:bg-ds-purple',
          'data-[state=checked]:shadow-[0_0_10px_rgba(189,147,249,.4)]',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ds-purple focus-visible:ring-offset-1 focus-visible:ring-offset-ds-bg',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          size === 'sm' ? 'h-4 w-7' : 'h-5 w-9'
        )}
      >
        <RadixSwitch.Thumb
          className={cn(
            'pointer-events-none block rounded-full bg-white shadow-sm',
            'transition-transform duration-fast',
            size === 'sm'
              ? 'h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0'
              : 'h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
          )}
        />
      </RadixSwitch.Root>

      {(label || description) && (
        <div>
          {label && (
            <label
              htmlFor={inputId}
              className={cn('text-sm text-ds-fg cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-[12px] text-ds-comment mt-0.5">{description}</p>
          )}
        </div>
      )}
    </div>
  )
}
