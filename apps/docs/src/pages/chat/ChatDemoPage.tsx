import { useState, useRef, useEffect } from 'react'
import { ChatMessage, ChatInput, JSONViewer, ChatMessageSkeleton, ExpandableSection } from '@shieldai/ds'
import type { MessageRole } from '@shieldai/ds'
import { ComponentBlock, DocSection } from '../../components/docs'

interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: string
  toolName?: string
  toolData?: unknown
}

const SAMPLE_TOOL_RESULT = {
  tool: 'run_code',
  status: 'success',
  output: {
    exitCode: 0,
    stdout: 'Agent deployed successfully',
    metrics: { duration_ms: 342, tokens_used: 1847 },
  },
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Deploy a new orchestrator agent with access to the code execution tool.',
    timestamp: '10:42 AM',
  },
  {
    id: '2',
    role: 'assistant',
    content: "I'll deploy an orchestrator agent now. Let me run the deployment script.",
    timestamp: '10:42 AM',
  },
  {
    id: '3',
    role: 'tool',
    content: 'Executing deployment pipeline…',
    timestamp: '10:42 AM',
    toolName: 'deploy_agent',
    toolData: SAMPLE_TOOL_RESULT,
  },
  {
    id: '4',
    role: 'assistant',
    content: 'The orchestrator agent is live. It has been assigned ID `orch-prod-7a2f` and is ready to coordinate tasks. You can now route workflows through it or connect additional sub-agents.',
    timestamp: '10:42 AM',
  },
]

const CODE_CHAT_MSG = `import { ChatMessage, ChatInput, ChatMessageSkeleton } from '@shieldai/ds'

// User message
<ChatMessage role="user" content="Deploy a new agent." timestamp="10:42 AM" />

// Assistant message
<ChatMessage role="assistant" content="I'll deploy it now…" agentName="ShieldAI" />

// Tool call result
<ChatMessage
  role="tool"
  toolName="deploy_agent"
  content="Executing deployment pipeline…"
/>

// Streaming
<ChatMessage role="assistant" content={streamedSoFar} streaming />

// Skeleton while loading
<ChatMessageSkeleton />`

const CODE_JSON = `import { JSONViewer } from '@shieldai/ds'

<JSONViewer
  data={{ status: 'success', output: { exitCode: 0 } }}
  label="tool_result"
  initialDepth={2}
/>`

export default function ChatDemoPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [processing, setProcessing] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  const handleSubmit = (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((m) => [...m, userMsg])
    setProcessing(true)

    // Simulate streaming response
    setTimeout(() => {
      setStreaming(true)
      setTimeout(() => {
        setStreaming(false)
        setProcessing(false)
        setMessages((m) => [
          ...m,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: `Got it — I'm processing your request: "${text}". This is a demo response.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ])
      }, 2000)
    }, 500)
  }

  return (
    <ComponentBlock
      num="05.01"
      title="Chat Components"
      tag="ChatMessage · ChatInput · JSONViewer"
      description="AI-native chat primitives. ChatMessage handles all four roles (user, assistant, tool, system). ChatInput auto-resizes, supports streaming stop, and keyboard shortcuts. JSONViewer renders collapsible tool results."
      preview={
        <div className="w-full max-w-xl flex flex-col gap-3">
          <ChatMessage role="user" content="What's the status of the orchestrator?" timestamp="10:41 AM" />
          <ChatMessage role="assistant" content="Let me check the orchestrator's health metrics now." timestamp="10:41 AM" agentName="ShieldAI" />
          <ChatMessage role="tool" toolName="get_metrics" content="Querying telemetry API…" timestamp="10:41 AM" />
          <ChatMessage
            role="assistant"
            content="The orchestrator is healthy — 99.9% uptime, 142 tasks completed, no errors in the last 24h."
            timestamp="10:41 AM"
            agentName="ShieldAI"
          />
        </div>
      }
      code={CODE_CHAT_MSG}
    >
      <DocSection title="Live interactive demo">
        <div className="w-full max-w-xl border border-ds-current rounded-ds-lg overflow-hidden bg-ds-bg flex flex-col" style={{ height: 480 }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <ChatMessage
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                  toolName={msg.toolName}
                  agentName={msg.role === 'assistant' ? 'ShieldAI' : undefined}
                />
                {Boolean(msg.toolData) && (
                  <div className="ml-10">
                    <ExpandableSection header="Tool result" defaultExpanded={false}>
                      <JSONViewer data={msg.toolData as never} label="tool_result" initialDepth={2} />
                    </ExpandableSection>
                  </div>
                )}
              </div>
            ))}
            {processing && !streaming && (
              <ChatMessageSkeleton />
            )}
            {streaming && (
              <ChatMessage
                role="assistant"
                content="Processing your request"
                agentName="ShieldAI"
                streaming
              />
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-ds-current">
            <ChatInput
              onSubmit={handleSubmit}
              onStop={() => { setProcessing(false); setStreaming(false) }}
              processing={processing}
              placeholder="Message ShieldAI…"
              attachments
            />
          </div>
        </div>
      </DocSection>

      <DocSection title="JSONViewer">
        <div className="w-full max-w-md space-y-2">
          <JSONViewer data={SAMPLE_TOOL_RESULT} label="deploy_agent · result" initialDepth={2} />
          <div className="font-mono text-xs text-ds-comment whitespace-pre">{CODE_JSON}</div>
        </div>
      </DocSection>

      <DocSection title="Roles">
        <div className="w-full max-w-xl space-y-3">
          {(['user', 'assistant', 'tool', 'system'] as MessageRole[]).map((role) => (
            <ChatMessage
              key={role}
              role={role}
              content={`This is a ${role} message.`}
              toolName={role === 'tool' ? 'example_tool' : undefined}
              agentName={role === 'assistant' ? 'ShieldAI' : undefined}
            />
          ))}
        </div>
      </DocSection>

      <DocSection title="Streaming skeleton">
        <div className="w-full max-w-xl space-y-3">
          <ChatMessageSkeleton />
          <ChatMessage role="assistant" content="The answer is being generated" agentName="ShieldAI" streaming />
        </div>
      </DocSection>
    </ComponentBlock>
  )
}
