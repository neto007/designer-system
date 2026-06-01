import { useState } from 'react'
import { X, Plus, Search } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface FilterProperty {
  key: string
  label: string
  operators?: string[]
  values?: string[]
}

export interface FilterToken {
  id: string
  property: string
  operator: string
  value: string
}

export interface PropertyFilterProps {
  properties: FilterProperty[]
  value?: FilterToken[]
  onChange?: (tokens: FilterToken[]) => void
  placeholder?: string
  className?: string
}

const DEFAULT_OPS = ['=', '!=', 'contains', 'starts with', '>', '<']

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export function PropertyFilter({
  properties,
  value: controlled,
  onChange,
  placeholder = 'Filter by property…',
  className,
}: PropertyFilterProps) {
  const [internal, setInternal] = useState<FilterToken[]>([])
  const [building, setBuilding] = useState<Partial<FilterToken>>({})
  const [step, setStep] = useState<'property' | 'operator' | 'value' | null>(null)

  const tokens = controlled ?? internal

  const update = (next: FilterToken[]) => {
    if (!controlled) setInternal(next)
    onChange?.(next)
  }

  const remove = (id: string) => update(tokens.filter((t) => t.id !== id))
  const clear = () => update([])

  const selectedProp = properties.find((p) => p.key === building.property)
  const operators = selectedProp?.operators ?? DEFAULT_OPS

  const commit = (value: string) => {
    if (!building.property || !building.operator) return
    const token: FilterToken = {
      id: uid(),
      property: building.property,
      operator: building.operator,
      value,
    }
    update([...tokens, token])
    setBuilding({})
    setStep(null)
  }

  const propLabel = (key: string) => properties.find((p) => p.key === key)?.label ?? key

  return (
    <div className={cn('space-y-2', className)}>
      {/* Token bar */}
      <div className={cn(
        'flex flex-wrap items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-ds-md border border-ds-current bg-ds-panel',
        'focus-within:ring-2 focus-within:ring-ds-purple focus-within:border-transparent transition-all'
      )}>
        <Search className="h-4 w-4 text-ds-comment flex-shrink-0" />

        {/* Existing tokens */}
        {tokens.map((t) => (
          <span
            key={t.id}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-ds-pill text-[11px] font-mono border border-ds-purple/30 bg-ds-purple/10 text-ds-purple"
          >
            <span className="text-ds-fg/70">{propLabel(t.property)}</span>
            <span className="text-ds-comment">{t.operator}</span>
            <span className="font-semibold">{t.value}</span>
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="ml-0.5 hover:text-ds-pink transition-colors"
              aria-label="Remove filter"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        {/* Building state */}
        {step === 'property' && (
          <span className="text-xs text-ds-comment">pick property →</span>
        )}
        {step === 'operator' && building.property && (
          <span className="text-xs text-ds-purple font-mono">{propLabel(building.property)} …</span>
        )}
        {step === 'value' && building.property && building.operator && (
          <span className="text-xs text-ds-purple font-mono">
            {propLabel(building.property)} {building.operator} …
          </span>
        )}

        {/* Add button */}
        {step === null && (
          <button
            type="button"
            onClick={() => setStep('property')}
            className="inline-flex items-center gap-1 text-xs text-ds-comment hover:text-ds-purple transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            {tokens.length === 0 ? placeholder : 'Add filter'}
          </button>
        )}

        {tokens.length > 0 && step === null && (
          <button
            type="button"
            onClick={clear}
            className="ml-auto text-[10px] text-ds-comment hover:text-ds-red transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Step popover */}
      {step === 'property' && (
        <div className="bg-ds-panel border border-ds-current rounded-ds-md shadow-lg overflow-hidden">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-ds-comment border-b border-ds-current">
            Select property
          </div>
          <ul>
            {properties.map((p) => (
              <li key={p.key}>
                <button
                  type="button"
                  onClick={() => { setBuilding({ property: p.key }); setStep('operator') }}
                  className="w-full text-left px-3 py-2 text-sm text-ds-fg hover:bg-ds-purple/10 hover:text-ds-purple transition-colors"
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => { setBuilding({}); setStep(null) }}
            className="w-full text-left px-3 py-1.5 text-xs text-ds-comment hover:text-ds-fg border-t border-ds-current transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {step === 'operator' && (
        <div className="bg-ds-panel border border-ds-current rounded-ds-md shadow-lg overflow-hidden">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-ds-comment border-b border-ds-current">
            Select operator
          </div>
          <ul>
            {operators.map((op) => (
              <li key={op}>
                <button
                  type="button"
                  onClick={() => { setBuilding((b) => ({ ...b, operator: op })); setStep('value') }}
                  className="w-full text-left px-3 py-2 text-sm font-mono text-ds-fg hover:bg-ds-purple/10 hover:text-ds-purple transition-colors"
                >
                  {op}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === 'value' && (
        <div className="bg-ds-panel border border-ds-current rounded-ds-md shadow-lg overflow-hidden">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-ds-comment border-b border-ds-current">
            Enter value
          </div>
          {selectedProp?.values ? (
            <ul>
              {selectedProp.values.map((v) => (
                <li key={v}>
                  <button
                    type="button"
                    onClick={() => commit(v)}
                    className="w-full text-left px-3 py-2 text-sm text-ds-fg hover:bg-ds-purple/10 hover:text-ds-purple transition-colors"
                  >
                    {v}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const fd = new FormData(e.currentTarget)
                const val = fd.get('value') as string
                if (val.trim()) commit(val.trim())
              }}
              className="flex gap-2 p-2"
            >
              <input
                name="value"
                autoFocus
                placeholder="Type a value…"
                className={cn(
                  'flex-1 h-8 px-2 text-sm rounded-ds-sm border border-ds-current bg-ds-bg',
                  'text-ds-fg placeholder:text-ds-comment focus:outline-none focus:ring-1 focus:ring-ds-purple'
                )}
              />
              <button
                type="submit"
                className="px-3 h-8 text-xs rounded-ds-sm bg-ds-purple/20 text-ds-purple border border-ds-purple/30 hover:bg-ds-purple/30 transition-colors"
              >
                Apply
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
