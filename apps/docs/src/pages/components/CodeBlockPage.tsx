import { CodeBlock } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const SNIPPET = `import { Button, Badge } from '@shieldai/ds'

export function AgentCard({ type, status }: Props) {
  return (
    <div className="flex items-center gap-3 p-4 bg-ds-panel rounded-ds-xl">
      <Badge variant={type === 'llm' ? 'green' : 'purple'} dot>
        {type.toUpperCase()}
      </Badge>
      <Button variant="neu-purple" size="sm">
        Run Agent
      </Button>
    </div>
  )
}`

const CODE = `import { CodeBlock } from '@shieldai/ds'

<CodeBlock
  code={snippet}
  lang="tsx"
  filename="AgentCard.tsx"
  showLineNumbers
/>

// Without line numbers
<CodeBlock code={snippet} lang="tsx" />`

const PROPS = [
  { name: 'code', type: 'string', required: true, description: 'Source code to highlight' },
  { name: 'lang', type: 'string', default: '"tsx"', description: 'Language for Shiki syntax highlighting' },
  { name: 'filename', type: 'string', description: 'File name shown in the header tab' },
  { name: 'showLineNumbers', type: 'boolean', default: 'false', description: 'Prefixes each line with its line number' },
]

export default function CodeBlockPage() {
  return (
    <ComponentBlock
      num="02.16"
      title="CodeBlock"
      tag="Shiki · Dracula · copy button"
      description="Syntax-highlighted code block using Shiki with the Dracula theme. Loads the highlighter lazily on first render. Includes a copy-to-clipboard button that confirms with a check icon."
      preview={
        <div className="w-full">
          <CodeBlock code={SNIPPET} lang="tsx" filename="AgentCard.tsx" showLineNumbers />
        </div>
      }
      code={CODE}
      filename="CodeBlock.tsx"
      props={PROPS}
    />
  )
}
