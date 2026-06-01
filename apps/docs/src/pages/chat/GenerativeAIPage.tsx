import { useState } from 'react'
import { StreamingBubble, ThinkingIndicator, SourcesList, FeedbackBar, PromptInput } from '@shieldai/ds'
import type { FeedbackValue } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import {
  StreamingBubble, ThinkingIndicator,
  SourcesList, FeedbackBar, PromptInput,
} from '@shieldai/ds'

// Streaming cursor blink
<StreamingBubble content={text} isStreaming={true} />

// Thinking dots
<ThinkingIndicator label="Analyzing threat data…" />

// Citation sources
<SourcesList sources={[
  { title: 'CVE-2025-1234', url: 'https://cve.mitre.org/...', index: 1 },
  { title: 'NIST Advisory',  url: 'https://nvd.nist.gov/...',  index: 2 },
]} />

// Thumbs feedback
const [feedback, setFeedback] = useState<FeedbackValue>(null)
<FeedbackBar value={feedback} onChange={setFeedback} />

// Prompt input with suggestions
<PromptInput
  value={prompt}
  onChange={setPrompt}
  onSubmit={send}
  suggestions={[
    { label: 'Summarize threats', prompt: 'Summarize the top threats from today' },
    { label: 'Deploy agent',      prompt: 'Deploy a new scanner agent to us-east-1' },
  ]}
/>`

const SOURCES = [
  { title: 'CVE-2025-1234',       index: 1, snippet: 'SQL injection in nginx module...' },
  { title: 'NIST NVD Advisory',   index: 2, snippet: 'CVSS 9.8 critical vulnerability...' },
  { title: 'ShieldAI Threat DB',  index: 3, snippet: 'Internal database match...' },
]

const SUGGESTIONS = [
  { label: 'Summarize threats',  prompt: 'Summarize the top threats from today' },
  { label: 'Deploy agent',       prompt: 'Deploy a new scanner agent to us-east-1' },
  { label: 'Show active alerts', prompt: 'Show me all active critical alerts' },
  { label: 'Explain this CVE',   prompt: 'Explain CVE-2025-1234 in plain English' },
]

const FULL_RESPONSE = `Based on today's scan, I detected **3 critical vulnerabilities** across your infrastructure:

1. **SQL injection** in the nginx reverse proxy (CVE-2025-1234, CVSS 9.8)
2. **Authentication bypass** in the agent auth module (CVE-2025-5678)
3. **RCE via log injection** in the pipeline runner (CVE-2025-9012)

I recommend immediate patching of the nginx module. Shall I initiate an automated remediation workflow?`

function LiveDemo() {
  const [streaming, setStreaming] = useState(false)
  const [shown, setShown] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackValue>(null)
  const [prompt, setPrompt] = useState('')
  const [displayText, setDisplayText] = useState('')

  const simulate = async () => {
    if (streaming) return
    setShown(true)
    setStreaming(true)
    setDisplayText('')
    setFeedback(null)

    for (let i = 0; i <= FULL_RESPONSE.length; i += 4) {
      await new Promise((r) => setTimeout(r, 16))
      setDisplayText(FULL_RESPONSE.slice(0, i))
    }
    setDisplayText(FULL_RESPONSE)
    setStreaming(false)
  }

  return (
    <div className="w-full space-y-6">
      <PreviewRow label="thinking indicator">
        <ThinkingIndicator label="Analyzing threat data…" />
      </PreviewRow>

      <div className="space-y-3">
        <div className="text-[10px] font-mono uppercase text-ds-comment">streaming bubble (click to simulate)</div>
        {!shown ? (
          <button
            onClick={simulate}
            className="px-4 py-2 text-xs rounded-ds-md border border-ds-purple text-ds-purple hover:bg-ds-purple/10 transition-colors"
          >
            Simulate AI response
          </button>
        ) : (
          <div className="space-y-3">
            <StreamingBubble content={displayText} isStreaming={streaming} />
            {!streaming && (
              <>
                <SourcesList sources={SOURCES} />
                <FeedbackBar value={feedback} onChange={setFeedback} />
              </>
            )}
            {!streaming && (
              <button
                onClick={simulate}
                className="text-xs text-ds-comment hover:text-ds-fg transition-colors"
              >
                Replay
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase text-ds-comment">prompt input with suggestions</div>
        <PromptInput
          value={prompt}
          onChange={setPrompt}
          onSubmit={() => { if (prompt.trim()) { setPrompt(''); simulate() } }}
          suggestions={SUGGESTIONS}
          placeholder="Ask about your agent fleet…"
        />
      </div>
    </div>
  )
}

export default function GenerativeAIPage() {
  return (
    <ComponentBlock
      num="05.G"
      title="Generative AI Components"
      tag="streaming · thinking · sources · feedback · prompt"
      description="UI primitives for generative AI interfaces: a streaming text bubble with cursor blink, an animated thinking indicator, a cited sources list, a thumbs up/down feedback bar, and a prompt input with suggestion chips."
      preview={<LiveDemo />}
      code={CODE}
      filename="GenerativeAI.tsx"
      props={[
        { name: 'StreamingBubble.content', type: 'string', default: '—', description: 'Text content to display' },
        { name: 'StreamingBubble.isStreaming', type: 'boolean', default: 'false', description: 'Shows blinking cursor when true' },
        { name: 'ThinkingIndicator.label', type: 'string', default: '"Thinking…"', description: 'Message shown next to dots' },
        { name: 'SourcesList.sources', type: 'Source[]', default: '—', description: 'Array of { title, url?, snippet?, index? }' },
        { name: 'FeedbackBar.value', type: '"up" | "down" | null', default: 'null', description: 'Controlled feedback state' },
        { name: 'FeedbackBar.onChange', type: '(v) => void', default: '—', description: 'Toggle handler — receives null when same button clicked twice' },
        { name: 'PromptInput.suggestions', type: 'PromptSuggestion[]', default: '[]', description: 'Shown when input is empty — clicking fires onSubmit immediately' },
      ]}
    />
  )
}
