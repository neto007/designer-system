import { Divider } from '@shieldai/ds'

interface MicrocopyEntry {
  context: string
  examples: string[]
  note?: string
}

const SECTIONS: { title: string; color: string; entries: MicrocopyEntry[] }[] = [
  {
    title: 'Labels',
    color: 'text-ds-purple',
    entries: [
      { context: 'Buttons — primary action', examples: ['Deploy', 'Run workflow', 'Save changes', 'Create agent'] },
      { context: 'Buttons — secondary', examples: ['Cancel', 'Discard', 'Go back'] },
      { context: 'Buttons — destructive', examples: ['Delete', 'Stop agent', 'Remove access'] },
      { context: 'Form field labels', examples: ['Agent name', 'Deploy region', 'Max tokens', 'Model ID'], note: '1–3 words, no trailing colon' },
    ],
  },
  {
    title: 'Placeholders',
    color: 'text-ds-cyan',
    entries: [
      { context: 'Text inputs', examples: ['e.g. orchestrator-prod', 'Enter agent name', 'Search agents…'] },
      { context: 'Selects', examples: ['Select region', 'Choose model', 'Pick agent type'] },
      { context: 'Textarea', examples: ['Describe the agent\'s role and capabilities…'] },
      { context: 'Search', examples: ['Search agents…', 'Filter by name or type'] },
    ],
  },
  {
    title: 'Confirmations & success',
    color: 'text-ds-green',
    entries: [
      { context: 'Toast — success', examples: ['Agent deployed', 'Changes saved', 'Workflow started', 'Access removed'] },
      { context: 'Inline success', examples: ['Copied!', 'Saved', '✓ Connected'] },
      { context: 'Confirmation dialogs', examples: ['Delete "orchestrator-prod"?', 'Stop all running agents?', 'Remove access for user@example.com?'] },
    ],
  },
  {
    title: 'Errors & warnings',
    color: 'text-ds-red',
    entries: [
      { context: 'Field errors', examples: ['Name is required', 'Must be 3–64 characters', 'Must be a valid URL'] },
      { context: 'Toast — error', examples: ['Failed to deploy agent. Try again.', 'Connection timed out.', 'Insufficient permissions.'] },
      { context: 'Empty states', examples: ['No agents deployed', 'No results for "xyz"', 'Nothing here yet'] },
    ],
  },
  {
    title: 'Loading & progress',
    color: 'text-ds-orange',
    entries: [
      { context: 'Button loading', examples: ['Deploying…', 'Saving…', 'Loading…', 'Processing…'] },
      { context: 'Page/table loading', examples: ['Fetching agents…', 'Loading workflow…'] },
      { context: 'Status', examples: ['Running', 'Stopped', 'Pending', 'Failed', 'Healthy'] },
    ],
  },
]

export default function MicrocopyPage() {
  return (
    <div className="space-y-12 max-w-3xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">07.02</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Microcopy Library</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Reusable strings for common UI moments. Copy-paste or adapt — stay consistent across the product.
        </p>
      </div>

      {SECTIONS.map((section, i) => (
        <section key={section.title} className="space-y-5">
          <h2 className={`font-black uppercase tracking-widest text-sm ${section.color}`}>{section.title}</h2>
          <div className="space-y-4">
            {section.entries.map((entry) => (
              <div key={entry.context} className="space-y-2">
                <div className="text-xs text-ds-comment font-mono">{entry.context}</div>
                <div className="flex flex-wrap gap-2">
                  {entry.examples.map((ex) => (
                    <span key={ex} className="text-xs text-ds-fg bg-ds-panel border border-ds-current rounded-ds-sm px-2.5 py-1 font-mono">
                      {ex}
                    </span>
                  ))}
                </div>
                {entry.note && <p className="text-[11px] text-ds-comment italic">{entry.note}</p>}
              </div>
            ))}
          </div>
          {i < SECTIONS.length - 1 && <Divider className="mt-6" />}
        </section>
      ))}

      <Divider />

      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Formatting rules</h2>
        <div className="space-y-2 text-sm">
          {[
            ['Sentence case', 'Deploy agent — not Deploy Agent or DEPLOY AGENT'],
            ['No trailing periods', 'Labels and toasts end without punctuation'],
            ['Bold the noun', 'Delete "orchestrator-prod"? — quotes the thing being deleted'],
            ['Match the verb to the outcome', 'Delete (permanent) vs Remove (reversible)'],
            ['Avoid "please"', '"Select a region" not "Please select a region"'],
          ].map(([rule, example]) => (
            <div key={rule} className="flex gap-3 py-2 border-b border-ds-current/20">
              <span className="text-ds-fg font-medium text-xs w-36 flex-shrink-0">{rule}</span>
              <span className="text-ds-comment text-xs">{example}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
