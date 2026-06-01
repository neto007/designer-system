/**
 * Strips leading blank lines and normalises indentation of a code snippet
 * so it looks clean when rendered inside a CodeBlock component.
 */
export function formatCode(raw: string): string {
  const lines = raw.split('\n')

  // Drop leading/trailing blank lines
  while (lines.length && lines[0]!.trim() === '') lines.shift()
  while (lines.length && lines.at(-1)!.trim() === '') lines.pop()

  // Find minimum indentation (ignoring blank lines)
  const minIndent = lines
    .filter((l) => l.trim().length > 0)
    .reduce((min, l) => {
      const leading = l.match(/^(\s*)/)?.[1]?.length ?? 0
      return Math.min(min, leading)
    }, Infinity)

  const indent = isFinite(minIndent) ? minIndent : 0
  return lines.map((l) => l.slice(indent)).join('\n')
}
