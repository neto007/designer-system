import { Alert, Badge } from '@shieldai/ds'
import { CheckCircle2, XCircle } from 'lucide-react'
import { DocSection } from '../../components/docs'

function DoDont({ do: doText, dont, context }: { do: string; dont: string; context?: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-ds-xl border border-ds-green/30 bg-ds-green/5 p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-ds-green flex-shrink-0" />
          <span className="text-[10px] font-mono uppercase text-ds-green">Do</span>
          {context && <Badge variant="green" className="ml-auto">{context}</Badge>}
        </div>
        <p className="text-sm text-ds-fg leading-relaxed">"{doText}"</p>
      </div>
      <div className="rounded-ds-xl border border-ds-red/30 bg-ds-red/5 p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <XCircle className="h-3.5 w-3.5 text-ds-red flex-shrink-0" />
          <span className="text-[10px] font-mono uppercase text-ds-red">Don't</span>
        </div>
        <p className="text-sm text-ds-fg/70 leading-relaxed line-through decoration-ds-red/40">"{dont}"</p>
      </div>
    </div>
  )
}

function ToneTable({ rows }: { rows: { context: string; wrong: string; right: string; why: string }[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-ds-current text-ds-comment">
            <th className="text-left py-2 pr-4 font-mono w-32">Context</th>
            <th className="text-left py-2 pr-4 font-mono text-ds-red">Wrong tone</th>
            <th className="text-left py-2 pr-4 font-mono text-ds-green">Right tone</th>
            <th className="text-left py-2 font-mono">Why</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ds-current/50">
          {rows.map((r) => (
            <tr key={r.context}>
              <td className="py-2.5 pr-4 font-mono text-ds-comment">{r.context}</td>
              <td className="py-2.5 pr-4 text-ds-red/80 line-through decoration-ds-red/30">{r.wrong}</td>
              <td className="py-2.5 pr-4 text-ds-green">{r.right}</td>
              <td className="py-2.5 text-ds-fg/70">{r.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ToneInPracticePage() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-ds-purple mb-1">07 · Voice & A11y</div>
        <h1 className="text-3xl font-bold text-ds-fg mb-3">Tone in Practice</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Side-by-side examples of correct vs. incorrect tone by context. Grounded in the five ShieldAI voice principles: precise, calm, direct, human, and confident.
        </p>
      </div>

      <Alert variant="info">
        <strong>Rule of thumb:</strong> If you can delete a word without losing meaning, delete it. If a sentence sounds like it came from a corporate lawyer, rewrite it.
      </Alert>

      <DocSection title="Errors & failures">
        <div className="space-y-3">
          <DoDont
            context="agent crash"
            do="Agent stopped responding. Check the logs or restart it."
            dont="An unexpected error has occurred in the agent execution module. Please contact your system administrator."
          />
          <DoDont
            context="auth failure"
            do="Wrong password. Try again or reset it."
            dont="Authentication failed due to invalid credentials. Please verify your input and retry."
          />
          <DoDont
            context="network error"
            do="Can't reach the server. Check your connection."
            dont="A network connectivity issue has been detected. The remote endpoint is unreachable at this time."
          />
        </div>
      </DocSection>

      <DocSection title="Loading & progress">
        <div className="space-y-3">
          <DoDont
            context="agent startup"
            do="Starting scanner…"
            dont="Initializing agent execution environment. Please wait."
          />
          <DoDont
            context="long operation"
            do="Analyzing 12,000 log entries. About 30 seconds left."
            dont="Processing is currently in progress. This operation may take some time to complete."
          />
          <DoDont
            context="first load"
            do="Loading your agents…"
            dont="Fetching agent data from the remote server. Please stand by."
          />
        </div>
      </DocSection>

      <DocSection title="Success & confirmations">
        <div className="space-y-3">
          <DoDont
            context="deployment"
            do="Agent deployed to us-east-1."
            dont="The agent deployment process has been successfully completed to the us-east-1 region."
          />
          <DoDont
            context="save"
            do="Saved."
            dont="Your changes have been successfully saved to the system."
          />
          <DoDont
            context="delete"
            do="Deleted 3 agents."
            dont="The selected agent instances have been permanently removed from the system."
          />
        </div>
      </DocSection>

      <DocSection title="Empty states">
        <div className="space-y-3">
          <DoDont
            context="no agents"
            do="No agents yet. Deploy one to get started."
            dont="There are currently no agent instances configured in your workspace."
          />
          <DoDont
            context="no results"
            do='No agents match "scanner". Try a different search.'
            dont="Your search query returned no results. Please modify your search criteria and try again."
          />
          <DoDont
            context="no alerts"
            do="No alerts. Everything looks good."
            dont="There are no active alert notifications at this time."
          />
        </div>
      </DocSection>

      <DocSection title="Tone by context — reference table">
        <ToneTable rows={[
          {
            context: 'Buttons',
            wrong: 'Click here to proceed',
            right: 'Deploy agent',
            why: 'Label the action, not the mechanic',
          },
          {
            context: 'Tooltips',
            wrong: 'This feature allows you to configure…',
            right: 'Set the max retries for failed runs',
            why: 'Start with the outcome, skip "This feature"',
          },
          {
            context: 'Placeholders',
            wrong: 'Enter your search query here',
            right: 'Search agents…',
            why: 'Match what the user types, not meta-commentary',
          },
          {
            context: 'Confirmations',
            wrong: 'Are you sure you want to delete this?',
            right: 'Delete "threat-scanner"? This can\'t be undone.',
            why: 'Name the thing, state the consequence',
          },
          {
            context: 'Help text',
            wrong: 'Please note that this field is required.',
            right: 'Required',
            why: 'Mark it; don\'t announce the marking',
          },
          {
            context: 'Onboarding',
            wrong: 'Welcome to ShieldAI! We\'re so excited to have you.',
            right: 'Deploy your first agent to start monitoring.',
            why: 'Direct users to action, not your feelings',
          },
        ]} />
      </DocSection>

      <DocSection title="The 5-second rewrite test">
        <div className="space-y-3 text-sm text-ds-fg/80 leading-relaxed">
          <p>Before shipping copy, ask:</p>
          <ol className="list-decimal list-inside space-y-1.5 text-ds-comment pl-2">
            <li><span className="text-ds-fg">Can I delete any word?</span> If yes, delete it.</li>
            <li><span className="text-ds-fg">Does it start with "Please", "This", or "In order to"?</span> Rewrite it.</li>
            <li><span className="text-ds-fg">Is the action buried at the end?</span> Move it to the start.</li>
            <li><span className="text-ds-fg">Does it say "successfully"?</span> Delete that word — success is implied.</li>
            <li><span className="text-ds-fg">Does it sound like a lawyer wrote it?</span> Rewrite for a person, not a policy.</li>
          </ol>
        </div>
      </DocSection>
    </div>
  )
}
