import { Tabs, TabsList, TabsTrigger, TabsContent, CodeBlock } from '@shieldai/ds'
import { PropsTable } from './PropsTable'
import type { ReactNode } from 'react'

interface PropRow {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

interface ComponentBlockProps {
  num: string
  title: string
  tag?: string
  description?: string
  preview: ReactNode
  code: string
  lang?: string
  filename?: string
  props?: PropRow[]
  children?: ReactNode
}

export function ComponentBlock({
  num,
  title,
  tag,
  description,
  preview,
  code,
  lang = 'tsx',
  filename,
  props,
  children,
}: ComponentBlockProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">{num}</span>
          {tag && (
            <span className="font-mono text-[9px] text-ds-comment uppercase tracking-widest border border-ds-current rounded px-1.5 py-0.5">
              {tag}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">{title}</h1>
        {description && (
          <p className="text-ds-comment text-[14px] leading-relaxed max-w-2xl">{description}</p>
        )}
      </div>

      {/* Preview + Code tabs */}
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div className="mt-3 rounded-ds-lg border border-ds-current bg-ds-bg p-8 flex flex-wrap gap-4 items-center justify-center min-h-[120px]">
            {preview}
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="mt-3">
            <CodeBlock code={code} lang={lang} filename={filename} showLineNumbers />
          </div>
        </TabsContent>
      </Tabs>

      {/* Props table */}
      {props && props.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Props</h2>
          <PropsTable props={props} />
        </div>
      )}

      {/* Extra sections (DocSection blocks) */}
      {children}
    </div>
  )
}

interface SectionProps {
  title: string
  children: ReactNode
}

export function DocSection({ title, children }: SectionProps) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return (
    <div id={slug} className="space-y-4 pt-8 border-t border-ds-current scroll-mt-8">
      <div className="flex items-center gap-2 group">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">{title}</h2>
        <a
          href={`#${slug}`}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-ds-comment hover:text-ds-purple"
          aria-label={`Link to ${title}`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </a>
      </div>
      {children}
    </div>
  )
}

export function PreviewRow({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      {label && <p className="font-mono text-[9px] uppercase tracking-widest text-ds-comment">{label}</p>}
      <div className="flex flex-wrap gap-3 items-center">{children}</div>
    </div>
  )
}
