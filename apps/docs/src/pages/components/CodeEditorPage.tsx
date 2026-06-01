import { useState, Suspense, lazy } from 'react'
import { SegmentedControl, Spinner } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const MonacoEditor = lazy(() => import('@monaco-editor/react'))

const CODE_SNIPPET = `import { DSLineChart, AgentNode } from '@shieldai/ds'

// Deploy an agent workflow
const workflow = {
  id: 'threat-detection-v2',
  nodes: [
    { id: 'ingest',    agentType: 'sequential', label: 'Log Ingest' },
    { id: 'classify',  agentType: 'llm',        label: 'GPT-4o Classifier' },
    { id: 'fork',      agentType: 'parallel',   label: 'Parallel Scanner' },
    { id: 'report',    agentType: 'task',       label: 'Report Writer' },
  ],
}

export function ThreatPipeline() {
  return (
    <div className="flex gap-4">
      {workflow.nodes.map((node) => (
        <AgentNode
          key={node.id}
          agentType={node.agentType}
          label={node.label}
          status="idle"
        />
      ))}
    </div>
  )
}`

const CODE = `// Docs app uses @monaco-editor/react (lazy loaded)
import Editor from '@monaco-editor/react'

// Core package ships CodeBlock for read-only display:
import { CodeBlock } from '@shieldai/ds'
<CodeBlock code={snippet} language="tsx" showLineNumbers />

// For a full editable Monaco editor, use @monaco-editor/react directly:
import Editor from '@monaco-editor/react'

<Editor
  height="400px"
  language="typescript"
  theme="vs-dark"
  value={code}
  onChange={(val) => setCode(val ?? '')}
  options={{
    fontSize: 13,
    fontFamily: "'JetBrains Mono', monospace",
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    padding: { top: 16, bottom: 16 },
  }}
/>`

const LANGUAGES = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'json',       label: 'JSON' },
  { value: 'css',        label: 'CSS' },
  { value: 'bash',       label: 'Bash' },
]

const SAMPLES: Record<string, string> = {
  typescript: CODE_SNIPPET,
  json: JSON.stringify({ agentType: 'llm', model: 'gpt-4o', temperature: 0.7, maxTokens: 2048, tools: ['run_code', 'search', 'file_read'] }, null, 2),
  css: `/* ShieldAI design tokens */\n:root {\n  --ds-purple: #bd93f9;\n  --ds-green:  #50fa7b;\n  --ds-bg:     #050101;\n  --ds-panel:  #0b0b11;\n  --ds-fg:     #f8f8f2;\n}`,
  bash: `#!/usr/bin/env bash\n# Deploy ShieldAI agent\npnpm --filter packages/core build\npnpm --filter docs dev\necho "Dev server running at http://localhost:5173"`,
}

const PROPS = [
  { name: 'language', type: 'string', default: '"typescript"', description: 'Monaco language identifier — determines syntax highlighting' },
  { name: 'value', type: 'string', default: '—', description: 'Editor content' },
  { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Called on every keystroke' },
  { name: 'height', type: 'string | number', default: '"400px"', description: 'Editor height' },
  { name: 'options', type: 'object', default: '—', description: 'Monaco editor options passed through directly' },
]

function LiveDemo() {
  const [lang, setLang] = useState('typescript')
  const [code, setCode] = useState(SAMPLES.typescript)

  const handleLangChange = (l: string) => {
    setLang(l)
    setCode(SAMPLES[l] ?? '')
  }

  return (
    <div className="w-full space-y-3">
      <SegmentedControl
        items={LANGUAGES}
        value={lang}
        onValueChange={handleLangChange}
        size="sm"
      />
      <div className="border border-ds-current rounded-ds-xl overflow-hidden">
        <Suspense fallback={
          <div className="h-72 flex items-center justify-center bg-ds-panel">
            <Spinner color="purple" label="Loading editor…" />
          </div>
        }>
          <MonacoEditor
            height={288}
            language={lang}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val ?? '')}
            options={{
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 12, bottom: 12 },
              lineNumbers: 'on',
              renderLineHighlight: 'line',
              bracketPairColorization: { enabled: true },
            }}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default function CodeEditorPage() {
  return (
    <ComponentBlock
      num="02.CE"
      title="Code Editor"
      tag="Monaco · syntax highlight · multi-language · lazy loaded"
      description="Full Monaco editor (VS Code engine) lazy-loaded in the docs app. Supports TypeScript, JSON, CSS, Bash, and all Monaco languages. For read-only display, use CodeBlock from @shieldai/ds instead."
      preview={<LiveDemo />}
      code={CODE}
      filename="CodeEditor (Monaco)"
      props={PROPS}
    />
  )
}
