import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface CheckboxProps {
  id?: string
  label?: string
  description?: string
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  disabled?: boolean
  required?: boolean
  className?: string
}

export function Checkbox({
  id,
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  required,
  className,
}: CheckboxProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className={cn('flex items-start gap-2.5', className)}>
      <RadixCheckbox.Root
        id={inputId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        required={required}
        className={cn(
          'flex-shrink-0 h-4 w-4 rounded-ds-sm border border-ds-current bg-ds-panel',
          'transition-all duration-fast',
          'data-[state=checked]:bg-ds-purple data-[state=checked]:border-ds-purple data-[state=checked]:shadow-[0_0_8px_rgba(189,147,249,.4)]',
          'data-[state=indeterminate]:bg-ds-panel data-[state=indeterminate]:border-ds-purple',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ds-purple focus-visible:ring-offset-1 focus-visible:ring-offset-ds-bg',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'cursor-pointer'
        )}
      >
        <RadixCheckbox.Indicator className="flex items-center justify-center text-ds-on-accent">
          {checked === 'indeterminate' ? (
            <Minus className="h-3 w-3" />
          ) : (
            <Check className="h-3 w-3" strokeWidth={3} />
          )}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>

      {(label || description) && (
        <div className="space-y-0.5">
          {label && (
            <label
              htmlFor={inputId}
              className={cn('text-sm text-ds-fg leading-none cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}
            >
              {label}
              {required && <span className="text-ds-red ml-0.5">*</span>}
            </label>
          )}
          {description && (
            <p className="text-[12px] text-ds-comment">{description}</p>
          )}
        </div>
      )}
    </div>
  )
}
