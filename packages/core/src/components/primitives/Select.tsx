import * as RadixSelect from '@radix-ui/react-select'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface SelectItem {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectGroup {
  label: string
  items: SelectItem[]
}

export interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  items?: SelectItem[]
  groups?: SelectGroup[]
  className?: string
  triggerClassName?: string
}

export function Select({
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select…',
  disabled,
  items,
  groups,
  triggerClassName,
}: SelectProps) {
  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <RadixSelect.Trigger
        className={cn(
          'flex items-center justify-between gap-2',
          'w-full h-10 px-3 text-sm rounded-ds-md',
          'border border-ds-current bg-ds-bg text-ds-fg',
          'transition-all duration-fast',
          'focus:outline-none focus:border-ds-purple focus:shadow-[0_0_0_2px_rgba(189,147,249,.2)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'data-[placeholder]:text-ds-comment',
          triggerClassName
        )}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon asChild>
          <ChevronDown className="h-4 w-4 text-ds-comment flex-shrink-0" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className={cn(
            'relative z-tooltip overflow-hidden',
            'bg-ds-panel border border-ds-current rounded-ds-md',
            'shadow-[0_8px_32px_rgba(0,0,0,.6)]',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          )}
          position="popper"
          sideOffset={4}
        >
          <RadixSelect.ScrollUpButton className="flex items-center justify-center py-1 text-ds-comment">
            <ChevronUp className="h-4 w-4" />
          </RadixSelect.ScrollUpButton>

          <RadixSelect.Viewport className="p-1">
            {groups
              ? groups.map((g) => (
                  <RadixSelect.Group key={g.label}>
                    <RadixSelect.Label className="px-2 py-1.5 text-[10px] font-black uppercase tracking-widest text-ds-comment">
                      {g.label}
                    </RadixSelect.Label>
                    {g.items.map((item) => (
                      <SelectItemEl key={item.value} {...item} />
                    ))}
                  </RadixSelect.Group>
                ))
              : items?.map((item) => <SelectItemEl key={item.value} {...item} />)}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton className="flex items-center justify-center py-1 text-ds-comment">
            <ChevronDown className="h-4 w-4" />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

function SelectItemEl({ value, label, disabled }: SelectItem) {
  return (
    <RadixSelect.Item
      value={value}
      disabled={disabled}
      className={cn(
        'relative flex items-center gap-2 px-2 py-1.5 pr-8',
        'text-sm text-ds-fg rounded-ds-sm',
        'cursor-pointer select-none outline-none',
        'data-[highlighted]:bg-ds-current data-[highlighted]:text-ds-purple',
        'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
        'transition-colors duration-fast',
      )}
    >
      <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute right-2 flex items-center">
        <Check className="h-3.5 w-3.5 text-ds-purple" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
}
