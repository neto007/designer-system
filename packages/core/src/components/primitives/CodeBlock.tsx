import { useState, useEffect, useCallback } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  lang?: string
  filename?: string
  showLineNumbers?: boolean
}

/* ── Dracula terminal-style traffic-light dots ── */
const MacDots = () => (
  <div className="flex items-center gap-[5px]" aria-hidden="true">
    <span className="h-[10px] w-[10px] rounded-full bg-[#ff5555]/70 transition-opacity hover:opacity-100" />
    <span className="h-[10px] w-[10px] rounded-full bg-[#f1fa8c]/70 transition-opacity hover:opacity-100" />
    <span className="h-[10px] w-[10px] rounded-full bg-[#50fa7b]/70 transition-opacity hover:opacity-100" />
  </div>
)

/**
 * Syntax-highlighted code block using Shiki with the Dracula theme.
 * Loads the highlighter lazily on first render, then renders the
 * highlighted HTML safely. Falls back to a plain `<pre>` if Shiki
 * is unavailable.
 */
export function CodeBlock({
  code,
  lang = 'tsx',
  filename,
  showLineNumbers = false,
  className,
  ...props
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function highlight() {
      try {
        const { codeToHtml } = await import('shiki')
        const result = await codeToHtml(code.trim(), {
          lang,
          theme: 'dracula',
        })
        if (!cancelled) setHtml(result)
      } catch {
        // Fallback: plain pre
        if (!cancelled) setHtml('')
      }
    }

    void highlight()
    return () => { cancelled = true }
  }, [code, lang])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore clipboard errors */
    }
  }, [code])

  const lines = code.trim().split('\n')

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-ds-lg border',
        'border-ds-selection bg-ds-panel text-sm',
        'transition-all duration-slow',
        'hover:border-ds-selection',
        'focus-within:ring-1 focus-within:ring-ds-purple/40',
        className
      )}
      {...props}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 border-b border-ds-selection/50 bg-ds-current/30 px-4 py-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <MacDots />
          <div className="flex items-center gap-2 min-w-0">
            {filename && (
              <span className="truncate font-mono text-[11px] font-medium text-ds-fg/80">
                <Terminal className="mr-1.5 inline h-3 w-3 text-ds-purple/60" />
                {filename}
              </span>
            )}
            <span className="shrink-0 rounded-ds-sm bg-ds-selection/60 px-1.5 py-[1px] font-mono text-[9px] font-medium uppercase tracking-[0.15em] text-ds-comment">
              {lang}
            </span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={cn(
            'flex shrink-0 items-center gap-1.5 rounded-ds-md px-2.5 py-1',
            'font-mono text-[10px] font-medium uppercase tracking-[0.12em]',
            'border border-transparent',
            'transition-all duration-fast',
            copied
              ? 'border-ds-green/30 bg-ds-green/10 text-ds-green'
              : 'border-ds-selection/40 text-ds-comment hover:border-ds-purple/30 hover:bg-ds-purple/10 hover:text-ds-fg'
          )}
          aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              <span>copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>copy</span>
            </>
          )}
        </button>
      </div>

      {/* ── Code body ── */}
      <div className="overflow-x-auto">
        {html ? (
          <div
            className={cn(
              '[&>pre]:m-0 [&>pre]:p-4 [&>pre]:bg-transparent [&>pre]:text-[13px]',
              '[&>pre]:font-mono [&>pre]:leading-relaxed [&>pre]:overflow-visible',
              showLineNumbers &&
                '[&_.line]:before:mr-4 [&_.line]:before:inline-block [&_.line]:before:w-6 [&_.line]:before:text-right [&_.line]:before:text-ds-comment/40 [&_.line]:before:content-[counter(line)] [&_.line]:before:counter-increment-[line]',
            )}
            // shiki output is sanitized HTML from a controlled library
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="overflow-visible m-0 p-4 font-mono text-[13px] leading-relaxed text-ds-fg">
            {showLineNumbers
              ? lines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="shrink-0 w-6 select-none text-right font-mono text-[11px] text-ds-comment/40">
                      {String(i + 1).padStart(String(lines.length).length, ' ')}
                    </span>
                    <span className="ml-4">{line}</span>
                  </div>
                ))
              : code.trim()}
          </pre>
        )}
      </div>
    </div>
  )
}
