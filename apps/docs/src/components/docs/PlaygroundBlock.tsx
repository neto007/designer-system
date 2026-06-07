import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent, CodeBlock, cn } from '@shieldai/ds'
import type { ReactNode } from 'react'

// ─── Control definitions ──────────────────────────────────────────────────────

export type ControlDef =
  | { type: 'boolean'; label: string; key: string; default: boolean }
  | { type: 'select'; label: string; key: string; default: string; options: string[] }
  | { type: 'text'; label: string; key: string; default: string }
  | { type: 'number'; label: string; key: string; default: number; min?: number; max?: number; step?: number }

export type ControlValues = Record<string, boolean | string | number>

// ─── Individual control renderers ─────────────────────────────────────────────

function BoolControl({ def, value, onChange }: { def: Extract<ControlDef, { type: 'boolean' }>; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-mono text-[11px] text-ds-comment">{def.label}</span>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={cn(
          'relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border transition-colors duration-150',
          value ? 'bg-ds-purple border-ds-purple' : 'bg-ds-current/30 border-ds-current'
        )}
      >
        <span className={cn(
          'inline-block h-3.5 w-3.5 rounded-full bg-white shadow absolute top-[3px] transition-transform duration-150',
          value ? 'translate-x-[18px]' : 'translate-x-[3px]'
        )} />
      </button>
    </div>
  )
}

function SelectControl({ def, value, onChange }: { def: Extract<ControlDef, { type: 'select' }>; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <span className="font-mono text-[11px] text-ds-comment">{def.label}</span>
      <div className="flex flex-wrap gap-1">
        {def.options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              'font-mono text-[10px] px-2 py-0.5 rounded border transition-colors',
              value === opt
                ? 'border-ds-purple bg-ds-purple/15 text-ds-purple'
                : 'border-ds-current text-ds-comment hover:border-ds-fg hover:text-ds-fg'
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

function TextControl({ def, value, onChange }: { def: Extract<ControlDef, { type: 'text' }>; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <span className="font-mono text-[11px] text-ds-comment">{def.label}</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-ds-bg border border-ds-current rounded px-2 py-1 text-[12px] font-mono text-ds-fg outline-none focus:border-ds-purple transition-colors"
      />
    </div>
  )
}

function NumberControl({ def, value, onChange }: { def: Extract<ControlDef, { type: 'number' }>; value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-ds-comment">{def.label}</span>
        <span className="font-mono text-[11px] text-ds-purple">{value}</span>
      </div>
      <input
        type="range"
        min={def.min ?? 0}
        max={def.max ?? 100}
        step={def.step ?? 1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-ds-purple"
      />
    </div>
  )
}

// ─── PlaygroundBlock ──────────────────────────────────────────────────────────

interface PlaygroundBlockProps {
  controls: ControlDef[]
  render: (values: ControlValues) => ReactNode
  generateCode?: (values: ControlValues) => string
  lang?: string
  filename?: string
}

function initValues(controls: ControlDef[]): ControlValues {
  return Object.fromEntries(controls.map(c => [c.key, c.default]))
}

export function PlaygroundBlock({ controls, render, generateCode, lang = 'tsx', filename }: PlaygroundBlockProps) {
  const [values, setValues] = useState<ControlValues>(() => initValues(controls))

  function set(key: string, val: boolean | string | number) {
    setValues(prev => ({ ...prev, [key]: val }))
  }

  const code = generateCode?.(values) ?? ''

  return (
    <div className="rounded-ds-lg border border-ds-current overflow-hidden">
      <Tabs defaultValue="playground">
        <div className="border-b border-ds-current px-4 pt-2">
          <TabsList>
            <TabsTrigger value="playground">Playground</TabsTrigger>
            {code && <TabsTrigger value="code">Code</TabsTrigger>}
          </TabsList>
        </div>

        <TabsContent value="playground">
          <div className="flex flex-col lg:flex-row min-h-[260px]">
            {/* Preview area */}
            <div className="flex-1 flex items-center justify-center p-8 bg-ds-bg border-b lg:border-b-0 lg:border-r border-ds-current min-h-[180px]">
              {render(values)}
            </div>

            {/* Controls panel */}
            <div className="w-full lg:w-[220px] flex-shrink-0 p-4 space-y-4 bg-ds-panel">
              <p className="font-mono text-[9px] uppercase tracking-widest text-ds-comment">Controls</p>
              {controls.map(ctrl => {
                const val = values[ctrl.key]
                if (ctrl.type === 'boolean') return <BoolControl key={ctrl.key} def={ctrl} value={val as boolean} onChange={v => set(ctrl.key, v)} />
                if (ctrl.type === 'select') return <SelectControl key={ctrl.key} def={ctrl} value={val as string} onChange={v => set(ctrl.key, v)} />
                if (ctrl.type === 'text') return <TextControl key={ctrl.key} def={ctrl} value={val as string} onChange={v => set(ctrl.key, v)} />
                if (ctrl.type === 'number') return <NumberControl key={ctrl.key} def={ctrl} value={val as number} onChange={v => set(ctrl.key, v)} />
                return null
              })}

              <button
                onClick={() => setValues(initValues(controls))}
                className="w-full font-mono text-[9px] uppercase tracking-widest text-ds-comment border border-ds-current rounded px-2 py-1.5 hover:border-ds-fg hover:text-ds-fg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </TabsContent>

        {code && (
          <TabsContent value="code">
            <CodeBlock code={code} lang={lang} filename={filename} showLineNumbers />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
