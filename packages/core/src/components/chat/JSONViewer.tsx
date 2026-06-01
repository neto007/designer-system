import { useState, type ReactNode } from 'react'
import { ChevronRight, Copy, Check } from 'lucide-react'
import { cn } from '../../lib/cn'

// ─── Types ────────────────────────────────────────────────────────────────────

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }

export interface JSONViewerProps {
  data: JSONValue
  initialDepth?: number
  className?: string
  label?: string
}

// ─── Color helpers ────────────────────────────────────────────────────────────

function ValueNode({ value }: { value: JSONValue }): ReactNode {
  if (value === null) return <span className="text-ds-comment italic">null</span>
  if (typeof value === 'boolean') return <span className="text-ds-orange">{String(value)}</span>
  if (typeof value === 'number') return <span className="text-ds-cyan">{value}</span>
  if (typeof value === 'string') return <span className="text-ds-green">"{value}"</span>
  return null
}

// ─── Tree node ────────────────────────────────────────────────────────────────

function TreeNode({
  label,
  value,
  depth = 0,
  initialDepth = 1,
}: {
  label?: string | number
  value: JSONValue
  depth?: number
  initialDepth?: number
}): ReactNode {
  const [open, setOpen] = useState(depth < initialDepth)
  const [copied, setCopied] = useState(false)

  const isObject = typeof value === 'object' && value !== null
  const isArray = Array.isArray(value)

  const childCount = isObject ? Object.keys(value as object).length : 0

  const copyNode = async () => {
    await navigator.clipboard.writeText(JSON.stringify(value, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (!isObject) {
    return (
      <div className="flex items-baseline gap-1 py-0.5 group/leaf">
        {label !== undefined && (
          <span className="text-ds-purple font-medium text-[12px] flex-shrink-0">
            {typeof label === 'number' ? label : `"${label}"`}
            <span className="text-ds-comment">: </span>
          </span>
        )}
        <ValueNode value={value} />
      </div>
    )
  }

  const entries = isArray
    ? (value as JSONValue[]).map((v, i) => [i, v] as [number, JSONValue])
    : Object.entries(value as Record<string, JSONValue>)

  return (
    <div className="group/node">
      <div
        className={cn(
          'flex items-center gap-0.5 py-0.5 cursor-pointer select-none rounded-sm',
          'hover:bg-ds-current/30 px-1 -mx-1 group/toggle'
        )}
        onClick={() => setOpen((o) => !o)}
      >
        <ChevronRight
          className={cn(
            'h-3 w-3 text-ds-comment flex-shrink-0 transition-transform duration-fast',
            open && 'rotate-90'
          )}
        />
        {label !== undefined && (
          <span className="text-ds-purple font-medium text-[12px]">
            {typeof label === 'number' ? label : `"${label}"`}
            <span className="text-ds-comment">: </span>
          </span>
        )}
        <span className="text-ds-comment text-[12px]">
          {isArray ? '[' : '{'}
          {!open && (
            <>
              <span className="mx-1 text-ds-comment/50">…</span>
              {childCount > 0 && (
                <span className="text-ds-comment/70">{childCount} {childCount === 1 ? 'item' : 'items'}</span>
              )}
              <span>{isArray ? ']' : '}'}</span>
            </>
          )}
        </span>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); copyNode() }}
          className="ml-auto opacity-0 group-hover/node:opacity-100 transition-opacity p-0.5 rounded text-ds-comment hover:text-ds-fg"
          aria-label="Copy node"
        >
          {copied
            ? <Check className="h-3 w-3 text-ds-green" />
            : <Copy className="h-3 w-3" />
          }
        </button>
      </div>

      {open && (
        <div className="ml-4 pl-3 border-l border-ds-current/30 mt-0.5 space-y-0.5">
          {entries.map(([k, v]) => (
            <TreeNode
              key={k}
              label={k}
              value={v}
              depth={depth + 1}
              initialDepth={initialDepth}
            />
          ))}
        </div>
      )}

      {open && (
        <div className="pl-0.5 text-[12px] text-ds-comment py-0.5">
          {isArray ? ']' : '}'}
        </div>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function JSONViewer({ data, initialDepth = 1, className, label }: JSONViewerProps) {
  const [copiedAll, setCopiedAll] = useState(false)

  const copyAll = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 1500)
  }

  return (
    <div className={cn('rounded-ds-md border border-ds-current bg-ds-bg overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-ds-current bg-ds-panel/50">
        <span className="font-mono text-[10px] text-ds-comment uppercase tracking-wider">
          {label ?? 'JSON'}
        </span>
        <button
          type="button"
          onClick={copyAll}
          className="flex items-center gap-1 text-[10px] text-ds-comment hover:text-ds-fg transition-colors"
        >
          {copiedAll
            ? <><Check className="h-3 w-3 text-ds-green" /> Copied</>
            : <><Copy className="h-3 w-3" /> Copy</>
          }
        </button>
      </div>

      {/* Tree */}
      <div className="p-3 font-mono text-[12px] leading-relaxed overflow-x-auto">
        <TreeNode value={data} initialDepth={initialDepth} />
      </div>
    </div>
  )
}
