import { useState } from 'react'
import { EmptyChatState, ChatInput, ChatMessage } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { EmptyChatState } from '@shieldai/ds'

// Default state
<EmptyChatState />

// Custom title and suggestions
<EmptyChatState
  title="How can I help?"
  description="Ask about your agent fleet, run workflows, or analyze data."
  suggestions={[
    'Show agent health dashboard',
    'Deploy new orchestrator',
    'Explain this error log',
    'Run threat scan now',
  ]}
  onSuggestionClick={(text) => sendMessage(text)}
/>`

const PROPS = [
  { name: 'title', type: 'string', default: '"Start a conversation"', description: 'Heading above the suggestions' },
  { name: 'description', type: 'string', default: '"Ask a question or give a command to get started."', description: 'Sub-heading paragraph' },
  { name: 'suggestions', type: 'string[]', default: '4 default suggestions', description: 'Pill buttons shown as prompt starters' },
  { name: 'onSuggestionClick', type: '(suggestion: string) => void', default: '—', description: 'Called when a suggestion pill is clicked' },
  { name: 'className', type: 'string', default: '—', description: 'Additional classes' },
]

function LiveDemo() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [input, setInput] = useState('')

  const send = (text: string) => {
    if (!text.trim()) return
    const userMsg = { role: 'user' as const, content: text }
    const botMsg = { role: 'assistant' as const, content: `Got it: "${text}". I'm processing your request…` }
    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput('')
  }

  return (
    <div className="w-full border border-ds-current rounded-ds-xl overflow-hidden bg-ds-bg" style={{ height: 460 }}>
      <div className="flex flex-col h-full">
        {/* Message area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <EmptyChatState
              title="How can I help?"
              description="Ask about your agent fleet, run workflows, or analyze data."
              suggestions={[
                'Show agent health dashboard',
                'Deploy new orchestrator',
                'Explain this error log',
                'Run threat scan now',
              ]}
              onSuggestionClick={send}
            />
          ) : (
            <div className="p-4 space-y-4">
              {messages.map((msg, i) => (
                <ChatMessage
                  key={i}
                  role={msg.role}
                  content={msg.content}
                  timestamp={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                />
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-ds-current p-3">
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={() => send(input)}
            placeholder="Type a message or click a suggestion above…"
          />
        </div>
      </div>
    </div>
  )
}

export default function EmptyChatPage() {
  return (
    <ComponentBlock
      num="05.E"
      title="Empty Chat State"
      tag="prompt suggestions · onSuggestionClick · composable"
      description="Initial state shown in a chat interface before any messages exist. Renders a centered illustration, heading, and pill-style suggestion buttons. Clicking a suggestion fires onSuggestionClick so the parent can seed the first message."
      preview={<LiveDemo />}
      code={CODE}
      filename="EmptyChatState.tsx"
      props={PROPS}
    />
  )
}
