import { Divider, Badge } from '@shieldai/ds'
import { CheckCircle, XCircle } from 'lucide-react'

function ExamplePair({ do: doText, dont }: { do: string; dont: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-ds-md border border-ds-green/30 bg-ds-green/5 p-3 space-y-1.5">
        <div className="flex items-center gap-1 text-ds-green text-[10px] font-black uppercase tracking-widest">
          <CheckCircle className="h-3 w-3" /> DO
        </div>
        <p className="text-sm text-ds-fg">"{doText}"</p>
      </div>
      <div className="rounded-ds-md border border-ds-red/30 bg-ds-red/5 p-3 space-y-1.5">
        <div className="flex items-center gap-1 text-ds-red text-[10px] font-black uppercase tracking-widest">
          <XCircle className="h-3 w-3" /> DON'T
        </div>
        <p className="text-sm text-ds-comment line-through">"{dont}"</p>
      </div>
    </div>
  )
}

const PRINCIPLES = [
  {
    name: 'Clear',
    color: 'text-ds-purple',
    border: 'border-ds-purple/30',
    desc: 'Say exactly what will happen. Avoid jargon, acronyms, and technical internals.',
    examples: [
      { do: 'Agent deployed successfully', dont: 'Operation completed with exit code 0' },
      { do: 'Select a region to deploy to', dont: 'Choose AWS infrastructure endpoint' },
    ],
  },
  {
    name: 'Direct',
    color: 'text-ds-green',
    border: 'border-ds-green/30',
    desc: 'Use active voice. Lead with the action. Put the most important information first.',
    examples: [
      { do: 'Deploy agent', dont: 'Agent can be deployed using the button below' },
      { do: 'Stop all running agents?', dont: 'Are you sure you want to initiate the stop procedure?' },
    ],
  },
  {
    name: 'Human',
    color: 'text-ds-cyan',
    border: 'border-ds-cyan/30',
    desc: 'Write like a knowledgeable colleague. Friendly but never cute. Avoid robotic phrasing.',
    examples: [
      { do: 'Something went wrong. Try again.', dont: 'Error code 500: Internal server exception' },
      { do: 'No agents running', dont: 'The agent list is currently empty' },
    ],
  },
  {
    name: 'Concise',
    color: 'text-ds-orange',
    border: 'border-ds-orange/30',
    desc: 'Every word earns its place. Cut filler words. Labels are 1–3 words.',
    examples: [
      { do: 'Name', dont: 'Please enter the name of the agent' },
      { do: 'Confirm delete?', dont: 'Are you absolutely sure you want to permanently delete this agent?' },
    ],
  },
  {
    name: 'Consistent',
    color: 'text-ds-pink',
    border: 'border-ds-pink/30',
    desc: 'Same concept, same word. Never "delete" in one place and "remove" in another.',
    examples: [
      { do: 'Delete agent (everywhere)', dont: 'Delete here, Remove there, Destroy elsewhere' },
      { do: 'Agent (always)', dont: 'Agent / Bot / Assistant used interchangeably' },
    ],
  },
]

export default function VoicePrinciplesPage() {
  return (
    <div className="space-y-12 max-w-3xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">07.01</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Voice Principles</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          ShieldAI speaks like a sharp, knowledgeable colleague — not a corporate chatbot. Five principles guide every word in the UI.
        </p>
      </div>

      <div className="space-y-10">
        {PRINCIPLES.map((p, i) => (
          <section key={p.name} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] opacity-50">0{i + 1}</span>
              <h2 className={`font-black text-xl uppercase tracking-widest ${p.color}`}>{p.name}</h2>
            </div>
            <p className="text-ds-comment text-sm leading-relaxed">{p.desc}</p>
            <div className="space-y-3">
              {p.examples.map((ex, j) => (
                <ExamplePair key={j} do={ex.do} dont={ex.dont} />
              ))}
            </div>
            {i < PRINCIPLES.length - 1 && <Divider className="mt-6" />}
          </section>
        ))}
      </div>

      <Divider />

      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Tone spectrum</h2>
        <div className="rounded-ds-lg border border-ds-current bg-ds-panel overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-ds-current">
            {[
              { label: 'Informational',  color: 'text-ds-cyan',   desc: 'Status messages, labels, descriptions. Neutral, precise.' },
              { label: 'Encouraging',    color: 'text-ds-green',  desc: 'Success states, onboarding. Warm but not cheerleader.' },
              { label: 'Urgent',         color: 'text-ds-red',    desc: 'Errors, destructive actions. Clear, calm, not alarming.' },
            ].map((t) => (
              <div key={t.label} className="p-4 space-y-2">
                <Badge
                  variant={
                    t.color === 'text-ds-green' ? 'solid-green' :
                    t.color === 'text-ds-red' ? 'solid-red' : 'cyan'
                  }
                  className="text-[9px]"
                >{t.label}</Badge>
                <p className="text-xs text-ds-comment leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
