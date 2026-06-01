import * as RadixSlider from '@radix-ui/react-slider'
import { cn } from '../../lib/cn'

const colorMap = {
  purple: 'bg-ds-purple shadow-glow',
  green: 'bg-ds-green shadow-glow-green',
  orange: 'bg-ds-orange',
  red: 'bg-ds-red shadow-glow-red',
  cyan: 'bg-ds-cyan',
} as const

const sizeMap = { sm: 'h-4', md: 'h-5', lg: 'h-6' } as const

export interface SliderProps {
  value?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
  color?: keyof typeof colorMap
  size?: keyof typeof sizeMap
  showValue?: boolean
  label?: string
  marks?: boolean
  formatValue?: (value: number) => string
  className?: string
  name?: string
  id?: string
}

export function Slider({
  color = 'purple',
  size = 'md',
  showValue,
  label,
  marks,
  formatValue = (v) => String(v),
  className,
  disabled,
  step = 1,
  min = 0,
  max = 100,
  value,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  name,
  id,
}: SliderProps) {
  const trackColor = colorMap[color]
  const currentValues = value ?? defaultValue ?? [min]
  const isVertical = orientation === 'vertical'
  const range = max - min
  const markPositions =
    marks && step
      ? Array.from({ length: Math.floor(range / step) + 1 }, (_, i) => min + i * step)
      : []

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-ds-fg font-medium">{label}</span>}
          {showValue && (
            <span className="font-mono text-ds-comment text-xs">
              {Array.isArray(currentValues)
                ? currentValues.map(formatValue).join(' – ')
                : formatValue(currentValues as number)}
            </span>
          )}
        </div>
      )}

      <RadixSlider.Root
        className={cn(
          'relative flex items-center select-none touch-none',
          sizeMap[size],
          isVertical ? 'flex-col h-full w-5' : 'w-full',
          disabled && 'opacity-50 pointer-events-none'
        )}
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={defaultValue ?? [min]}
        onValueChange={onValueChange}
        disabled={disabled}
        orientation={orientation}
        name={name}
        id={id}
      >
        <RadixSlider.Track className="bg-ds-current rounded-full relative flex-1 h-1.5">
          <RadixSlider.Range className={cn('absolute rounded-full h-full', trackColor)} />

          {marks &&
            markPositions.map((pos) => {
              const pct = ((pos - min) / range) * 100
              return (
                <span
                  key={pos}
                  className="absolute top-1/2 -translate-y-1/2 w-0.5 h-2 bg-ds-comment/40 rounded-full"
                  style={{ left: `${pct}%` }}
                />
              )
            })}
        </RadixSlider.Track>

        {(Array.isArray(currentValues) ? currentValues : [currentValues]).map((_, i) => (
          <RadixSlider.Thumb
            key={i}
            className={cn(
              'block w-4 h-4 rounded-full border-2 border-ds-bg',
              'shadow-neu-sm transition-all duration-fast',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
              'focus-visible:ring-ds-purple focus-visible:ring-offset-ds-bg',
              'hover:scale-110 active:scale-95 cursor-grab active:cursor-grabbing',
              trackColor
            )}
            aria-label={`Slider thumb ${i + 1}`}
          />
        ))}
      </RadixSlider.Root>

      {marks && (
        <div className="flex justify-between text-[10px] text-ds-comment font-mono">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      )}
    </div>
  )
}
