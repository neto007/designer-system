import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../overlay/Dialog'
import { Button } from '../primitives/Button'
import { Toggle } from '../primitives/Toggle'
import { cn } from '../../lib/cn'

export interface ColumnPreference {
  id: string
  label: string
  visible: boolean
  required?: boolean
}

export interface CollectionPreferencesProps {
  open: boolean
  onClose: () => void
  columns?: ColumnPreference[]
  onColumnsChange?: (columns: ColumnPreference[]) => void
  pageSize?: number
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
  title?: string
}

export function CollectionPreferences({
  open,
  onClose,
  columns = [],
  onColumnsChange,
  pageSize = 10,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  title = 'Preferences',
}: CollectionPreferencesProps) {
  const [localCols, setLocalCols] = useState(columns)
  const [localSize, setLocalSize] = useState(pageSize)

  const toggle = (id: string) => {
    setLocalCols((prev) =>
      prev.map((c) => (c.id === id && !c.required ? { ...c, visible: !c.visible } : c))
    )
  }

  const save = () => {
    onColumnsChange?.(localCols)
    onPageSizeChange?.(localSize)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Configure which columns are visible and items per page.</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          {pageSizeOptions.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-ds-fg mb-2">Items per page</div>
              <div className="flex flex-wrap gap-2">
                {pageSizeOptions.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setLocalSize(size)}
                    className={cn(
                      'px-3 py-1.5 rounded-ds-md text-xs font-mono border-2 transition-all',
                      localSize === size
                        ? 'border-ds-purple text-ds-purple bg-ds-purple/10'
                        : 'border-ds-current text-ds-comment hover:border-ds-purple/40'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {columns.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-ds-fg mb-2">Visible columns</div>
              <ul className="space-y-2">
                {localCols.map((col) => (
                  <li key={col.id} className="flex items-center justify-between">
                    <span className={cn('text-sm', col.required ? 'text-ds-comment' : 'text-ds-fg')}>
                      {col.label}
                      {col.required && <span className="ml-1 text-[10px] text-ds-comment">(required)</span>}
                    </span>
                    <Toggle
                      checked={col.visible}
                      onCheckedChange={() => toggle(col.id)}
                      disabled={col.required}
                      size="sm"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="neu-purple" size="sm" onClick={save}>Save preferences</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
