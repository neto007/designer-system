import * as RadixRadio from '@radix-ui/react-radio-group'
import { cn } from '../../lib/cn'

export interface RadioItem {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  items: RadioItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function RadioGroup({
  items,
  value,
  defaultValue,
  onValueChange,
  disabled,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  return (
    <RadixRadio.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      orientation={orientation}
      className={cn(
        'flex gap-2',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        className
      )}
    >
      {items.map((item) => {
        const id = `radio-${item.value}`
        return (
          <div key={item.value} className="flex items-start gap-2.5">
            <RadixRadio.Item
              id={id}
              value={item.value}
              disabled={item.disabled}
              className={cn(
                'flex-shrink-0 h-4 w-4 rounded-full border border-ds-current bg-ds-panel mt-0.5',
                'transition-all duration-fast',
                'data-[state=checked]:border-ds-purple',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ds-purple focus-visible:ring-offset-1 focus-visible:ring-offset-ds-bg',
                'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
              )}
            >
              <RadixRadio.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-ds-purple after:shadow-[0_0_6px_rgba(189,147,249,.6)]" />
            </RadixRadio.Item>
            <div className="space-y-0.5">
              <label
                htmlFor={id}
                className={cn('text-sm text-ds-fg leading-none cursor-pointer', item.disabled && 'opacity-50 cursor-not-allowed')}
              >
                {item.label}
              </label>
              {item.description && (
                <p className="text-[12px] text-ds-comment">{item.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </RadixRadio.Root>
  )
}
