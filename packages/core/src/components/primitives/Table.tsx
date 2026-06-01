import { useState, useCallback, type ReactNode, type CSSProperties } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Skeleton } from './Skeleton'
import { Checkbox } from './Checkbox'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TableColumn<T = Record<string, unknown>> {
  id: string
  header: ReactNode
  cell: (item: T, index: number) => ReactNode
  sortingField?: keyof T
  width?: number | string
  minWidth?: number | string
  align?: 'left' | 'center' | 'right'
}

export interface SortingState<T = Record<string, unknown>> {
  column: TableColumn<T>
  direction: 'asc' | 'desc'
}

export interface TableProps<T = Record<string, unknown>> {
  items: T[]
  columns: TableColumn<T>[]
  selectionType?: 'none' | 'single' | 'multi'
  selectedItems?: T[]
  onSelectionChange?: (items: T[]) => void
  trackBy?: keyof T | ((item: T) => string)
  sorting?: SortingState<T>
  onSortingChange?: (state: SortingState<T>) => void
  loading?: boolean
  loadingText?: string
  empty?: ReactNode
  header?: ReactNode
  footer?: ReactNode
  stickyHeader?: boolean
  stripedRows?: boolean
  compact?: boolean
  className?: string
  resizableColumns?: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getItemKey<T>(item: T, trackBy: TableProps<T>['trackBy'], index: number): string {
  if (!trackBy) return String(index)
  if (typeof trackBy === 'function') return trackBy(item)
  return String((item as Record<string, unknown>)[trackBy as string])
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SortIcon<T>({ column, sorting }: { column: TableColumn<T>; sorting?: SortingState<T> }) {
  if (!column.sortingField) return null
  const active = sorting?.column.id === column.id
  const desc = active && sorting?.direction === 'desc'

  return (
    <span className="ml-1 inline-flex flex-col items-center opacity-60 group-hover:opacity-100 transition-opacity">
      {active ? (
        desc ? (
          <ChevronDown className="h-3.5 w-3.5 text-ds-purple" />
        ) : (
          <ChevronUp className="h-3.5 w-3.5 text-ds-purple" />
        )
      ) : (
        <ChevronsUpDown className="h-3.5 w-3.5" />
      )}
    </span>
  )
}

function LoadingRows({ columns, rows = 5 }: { columns: number; rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, ri) => (
        <tr key={ri} className="border-b border-ds-current/30">
          {Array.from({ length: columns }).map((_, ci) => (
            <td key={ci} className="px-4 py-3">
              <Skeleton className="h-4 w-full" style={{ width: `${60 + Math.random() * 40}%` }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Table<T = Record<string, unknown>>({
  items,
  columns,
  selectionType = 'none',
  selectedItems = [],
  onSelectionChange,
  trackBy,
  sorting,
  onSortingChange,
  loading = false,
  loadingText = 'Loading…',
  empty,
  header,
  footer,
  stickyHeader = false,
  stripedRows = false,
  compact = false,
  className,
}: TableProps<T>) {
  const cellPy = compact ? 'py-2' : 'py-3'
  const allSelected = items.length > 0 && items.every((item) => selectedItems.includes(item))
  const someSelected = items.some((item) => selectedItems.includes(item))

  const handleHeaderCheckbox = useCallback(() => {
    if (!onSelectionChange) return
    if (allSelected) {
      onSelectionChange([])
    } else {
      onSelectionChange([...items])
    }
  }, [allSelected, items, onSelectionChange])

  const handleRowCheckbox = useCallback(
    (item: T) => {
      if (!onSelectionChange) return
      if (selectionType === 'single') {
        onSelectionChange([item])
        return
      }
      const isSelected = selectedItems.includes(item)
      if (isSelected) {
        onSelectionChange(selectedItems.filter((i) => i !== item))
      } else {
        onSelectionChange([...selectedItems, item])
      }
    },
    [onSelectionChange, selectionType, selectedItems]
  )

  const handleSort = useCallback(
    (column: TableColumn<T>) => {
      if (!column.sortingField || !onSortingChange) return
      const isActive = sorting?.column.id === column.id
      const newDirection = isActive && sorting?.direction === 'asc' ? 'desc' : 'asc'
      onSortingChange({ column, direction: newDirection })
    },
    [onSortingChange, sorting]
  )

  const totalCols = columns.length + (selectionType !== 'none' ? 1 : 0)

  return (
    <div className={cn('w-full', className)}>
      {/* Optional header slot */}
      {header && <div className="mb-2">{header}</div>}

      <div className="w-full overflow-x-auto rounded-ds-lg border border-ds-current bg-ds-panel">
        <table className="w-full border-collapse text-sm">
          {/* Column widths */}
          <colgroup>
            {selectionType !== 'none' && <col style={{ width: 48 }} />}
            {columns.map((col) => (
              <col
                key={col.id}
                style={
                  col.width
                    ? ({ width: col.width, minWidth: col.minWidth } as CSSProperties)
                    : col.minWidth
                      ? ({ minWidth: col.minWidth } as CSSProperties)
                      : undefined
                }
              />
            ))}
          </colgroup>

          {/* Header */}
          <thead
            className={cn(
              'bg-ds-bg border-b border-ds-current',
              stickyHeader && 'sticky top-0 z-10'
            )}
          >
            <tr>
              {selectionType === 'multi' && (
                <th className="px-4 py-3 text-left w-12">
                  <Checkbox
                    checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                    onCheckedChange={handleHeaderCheckbox}
                  />
                </th>
              )}
              {selectionType === 'single' && <th className="w-12" />}

              {columns.map((col) => (
                <th
                  key={col.id}
                  className={cn(
                    'px-4 py-3 font-semibold text-ds-comment text-[11px] uppercase tracking-wider',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right',
                    col.sortingField && 'cursor-pointer select-none group hover:text-ds-fg',
                    'transition-colors'
                  )}
                  onClick={() => handleSort(col)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    <SortIcon column={col} {...(sorting !== undefined ? { sorting } : {})} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              <LoadingRows columns={totalCols} rows={5} />
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={totalCols} className="px-4 py-12 text-center text-ds-comment">
                  {empty ?? <span className="text-sm">No items found.</span>}
                </td>
              </tr>
            ) : (
              items.map((item, index) => {
                const key = getItemKey(item, trackBy, index)
                const isSelected = selectedItems.includes(item)

                return (
                  <tr
                    key={key}
                    onClick={
                      selectionType !== 'none'
                        ? () => handleRowCheckbox(item)
                        : undefined
                    }
                    className={cn(
                      'border-b border-ds-current/30 transition-colors',
                      selectionType !== 'none' && 'cursor-pointer',
                      isSelected
                        ? 'bg-ds-purple/10 hover:bg-ds-purple/15'
                        : stripedRows && index % 2 === 1
                          ? 'bg-ds-current/5 hover:bg-ds-current/20'
                          : 'hover:bg-ds-current/10',
                      'last:border-b-0'
                    )}
                  >
                    {selectionType === 'multi' && (
                      <td
                        className={cn('px-4 w-12', cellPy)}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRowCheckbox(item)
                        }}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleRowCheckbox(item)}
                        />
                      </td>
                    )}
                    {selectionType === 'single' && (
                      <td className={cn('px-4 w-12', cellPy)}>
                        <span
                          className={cn(
                            'block w-3.5 h-3.5 rounded-full border-2 transition-all mx-auto',
                            isSelected
                              ? 'border-ds-purple bg-ds-purple shadow-glow'
                              : 'border-ds-comment'
                          )}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className={cn(
                          'px-4 text-ds-fg',
                          cellPy,
                          col.align === 'center' && 'text-center',
                          col.align === 'right' && 'text-right'
                        )}
                      >
                        {col.cell(item, index)}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

        {/* Loading overlay text */}
        {loading && (
          <div className="px-4 py-2 text-center text-xs text-ds-comment border-t border-ds-current/30">
            {loadingText}
          </div>
        )}
      </div>

      {/* Optional footer slot */}
      {footer && <div className="mt-2">{footer}</div>}
    </div>
  )
}

// ─── Controlled sorting hook ──────────────────────────────────────────────────

export function useTableSorting<T>(
  items: T[],
  initialState?: SortingState<T>
): {
  sorting: SortingState<T> | undefined
  setSorting: (state: SortingState<T>) => void
  sortedItems: T[]
} {
  const [sorting, setSorting] = useState<SortingState<T> | undefined>(initialState)

  const sortedItems = sorting?.column.sortingField
    ? [...items].sort((a, b) => {
        const field = sorting.column.sortingField as keyof T
        const av = a[field]
        const bv = b[field]
        const cmp =
          typeof av === 'string' && typeof bv === 'string'
            ? av.localeCompare(bv)
            : (av as number) < (bv as number)
              ? -1
              : (av as number) > (bv as number)
                ? 1
                : 0
        return sorting.direction === 'desc' ? -cmp : cmp
      })
    : items

  return { sorting, setSorting, sortedItems }
}
