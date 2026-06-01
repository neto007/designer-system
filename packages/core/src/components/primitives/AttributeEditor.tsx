import { useState, type ReactNode } from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface AttributeField {
  key: string
  label: string
  type?: 'text' | 'number' | 'select' | 'boolean'
  options?: string[]
  placeholder?: string
}

export interface AttributeRow {
  id: string
  values: Record<string, string>
}

export interface AttributeEditorProps {
  fields: AttributeField[]
  value?: AttributeRow[]
  onChange?: (rows: AttributeRow[]) => void
  disabled?: boolean
  maxRows?: number
  addLabel?: string
  className?: string
}

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export function AttributeEditor({
  fields,
  value: controlled,
  onChange,
  disabled,
  maxRows = 20,
  addLabel = 'Add row',
  className,
}: AttributeEditorProps) {
  const [internal, setInternal] = useState<AttributeRow[]>([])
  const rows = controlled ?? internal

  const update = (next: AttributeRow[]) => {
    if (!controlled) setInternal(next)
    onChange?.(next)
  }

  const addRow = () => {
    if (rows.length >= maxRows) return
    const empty: Record<string, string> = {}
    fields.forEach((f) => { empty[f.key] = '' })
    update([...rows, { id: uid(), values: empty }])
  }

  const removeRow = (id: string) => update(rows.filter((r) => r.id !== id))

  const setCell = (id: string, key: string, val: string) => {
    update(rows.map((r) => r.id === id ? { ...r, values: { ...r.values, [key]: val } } : r))
  }

  const cellClass = cn(
    'w-full h-8 px-2 text-xs rounded-ds-sm border border-ds-current bg-ds-panel',
    'text-ds-fg placeholder:text-ds-comment font-mono',
    'focus:outline-none focus:ring-1 focus:ring-ds-purple focus:border-transparent',
    disabled && 'opacity-50 cursor-not-allowed'
  )

  const renderCell = (row: AttributeRow, field: AttributeField): ReactNode => {
    const val = row.values[field.key] ?? ''
    if (field.type === 'select' && field.options) {
      return (
        <select
          value={val}
          disabled={disabled}
          onChange={(e) => setCell(row.id, field.key, e.target.value)}
          className={cellClass}
        >
          <option value="">—</option>
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      )
    }
    if (field.type === 'boolean') {
      return (
        <select
          value={val}
          disabled={disabled}
          onChange={(e) => setCell(row.id, field.key, e.target.value)}
          className={cellClass}
        >
          <option value="">—</option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      )
    }
    return (
      <input
        type={field.type === 'number' ? 'number' : 'text'}
        value={val}
        placeholder={field.placeholder ?? field.label}
        disabled={disabled}
        onChange={(e) => setCell(row.id, field.key, e.target.value)}
        className={cellClass}
      />
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      {/* Header */}
      {rows.length > 0 && (
        <div className="flex gap-2 pr-8">
          {fields.map((f) => (
            <div key={f.key} className="flex-1 text-[10px] font-mono uppercase tracking-wider text-ds-comment px-1">
              {f.label}
            </div>
          ))}
        </div>
      )}

      {/* Rows */}
      <ul className="space-y-1.5">
        {rows.map((row) => (
          <li key={row.id} className="flex items-center gap-2">
            {fields.map((field) => (
              <div key={field.key} className="flex-1">
                {renderCell(row, field)}
              </div>
            ))}
            <button
              type="button"
              onClick={() => removeRow(row.id)}
              disabled={disabled}
              className="flex-shrink-0 p-1 rounded text-ds-comment hover:text-ds-red hover:bg-ds-red/10 transition-colors disabled:opacity-30"
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
        className="flex items-center gap-1.5 text-xs text-ds-purple hover:text-ds-pink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </button>
    </div>
  )
}
