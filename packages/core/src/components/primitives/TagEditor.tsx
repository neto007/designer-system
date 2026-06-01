import { useState, useRef, type KeyboardEvent } from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface TagEntry {
  key: string
  value: string
}

export interface TagEditorProps {
  value?: TagEntry[]
  onChange?: (entries: TagEntry[]) => void
  keyPlaceholder?: string
  valuePlaceholder?: string
  disabled?: boolean
  maxRows?: number
  className?: string
}

export function TagEditor({
  value: controlled,
  onChange,
  keyPlaceholder = 'key',
  valuePlaceholder = 'value',
  disabled,
  maxRows = 20,
  className,
}: TagEditorProps) {
  const [internal, setInternal] = useState<TagEntry[]>([{ key: '', value: '' }])
  const rows = controlled ?? internal
  const keyRefs = useRef<(HTMLInputElement | null)[]>([])

  const update = (next: TagEntry[]) => {
    if (!controlled) setInternal(next)
    onChange?.(next)
  }

  const setRow = (index: number, field: 'key' | 'value', val: string) => {
    const next = rows.map((r, i) => (i === index ? { ...r, [field]: val } : r))
    update(next)
  }

  const addRow = () => {
    if (rows.length >= maxRows) return
    const next = [...rows, { key: '', value: '' }]
    update(next)
    setTimeout(() => keyRefs.current[next.length - 1]?.focus(), 0)
  }

  const removeRow = (index: number) => {
    const next = rows.filter((_, i) => i !== index)
    update(next.length === 0 ? [{ key: '', value: '' }] : next)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number, field: 'key' | 'value') => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (field === 'key') {
        const el = e.currentTarget.closest('li')?.querySelector<HTMLInputElement>('input:last-of-type')
        el?.focus()
      } else {
        if (index === rows.length - 1) addRow()
        else keyRefs.current[index + 1]?.focus()
      }
    }
    if (e.key === 'Backspace' && !rows[index]?.key && !rows[index]?.value && rows.length > 1) {
      e.preventDefault()
      removeRow(index)
      setTimeout(() => keyRefs.current[Math.max(0, index - 1)]?.focus(), 0)
    }
  }

  return (
    <div className={cn('space-y-1', className)}>
      <ul className="space-y-1">
        {rows.map((row, i) => (
          <li key={i} className="flex items-center gap-2">
            <input
              ref={(el) => { keyRefs.current[i] = el }}
              type="text"
              value={row.key}
              onChange={(e) => setRow(i, 'key', e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i, 'key')}
              placeholder={keyPlaceholder}
              disabled={disabled}
              className={cn(
                'flex-1 h-8 px-3 text-xs rounded-ds-sm border border-ds-current bg-ds-panel',
                'text-ds-fg placeholder:text-ds-comment font-mono',
                'focus:outline-none focus:ring-2 focus:ring-ds-purple focus:border-transparent',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            />
            <span className="text-ds-comment text-xs flex-shrink-0">:</span>
            <input
              type="text"
              value={row.value}
              onChange={(e) => setRow(i, 'value', e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i, 'value')}
              placeholder={valuePlaceholder}
              disabled={disabled}
              className={cn(
                'flex-1 h-8 px-3 text-xs rounded-ds-sm border border-ds-current bg-ds-panel',
                'text-ds-fg placeholder:text-ds-comment font-mono',
                'focus:outline-none focus:ring-2 focus:ring-ds-purple focus:border-transparent',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            />
            <button
              type="button"
              onClick={() => removeRow(i)}
              disabled={disabled || (rows.length === 1 && !row.key && !row.value)}
              className="flex-shrink-0 p-1 rounded text-ds-comment hover:text-ds-red hover:bg-ds-red/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Remove row"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={addRow}
        disabled={disabled || rows.length >= maxRows}
        className={cn(
          'flex items-center gap-1.5 text-xs text-ds-purple hover:text-ds-pink transition-colors',
          'disabled:opacity-40 disabled:cursor-not-allowed'
        )}
      >
        <Plus className="h-3.5 w-3.5" />
        Add row
      </button>
    </div>
  )
}
