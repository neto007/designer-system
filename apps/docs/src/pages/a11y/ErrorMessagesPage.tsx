import { Alert, Badge, FormField, Input, Divider } from '@shieldai/ds'
import { AlertTriangle, Info } from 'lucide-react'

function SectionTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="font-mono text-[10px] text-ds-comment opacity-60">{num}</span>
      <h2 className="font-black uppercase tracking-widest text-sm text-ds-fg">{title}</h2>
    </div>
  )
}

const FORMAT_RULES = [
  { label: 'Say what happened',     do: 'Failed to deploy agent', dont: 'Error 500' },
  { label: 'Say why (if useful)',   do: 'Name is taken — try a different one', dont: 'Invalid value' },
  { label: 'Say what to do next',  do: 'Check your network and try again', dont: 'Please contact support' },
  { label: 'One sentence max',      do: 'Must be 3–64 characters', dont: 'The name field must contain between 3 and 64 characters in length' },
  { label: 'No blame',             do: 'That didn\'t work. Try again.', dont: 'You entered an invalid email address' },
]

const EXAMPLES = [
  { field: 'Agent name (required)',  error: 'Agent name is required' },
  { field: 'Agent name (too short)', error: 'Must be at least 3 characters' },
  { field: 'Deploy region',          error: 'Select at least one region' },
  { field: 'API key',                error: 'Key format is invalid — must start with sk-' },
  { field: 'Max tokens',             error: 'Must be between 1 and 128,000' },
]

export default function ErrorMessagesPage() {
  return (
    <div className="space-y-12 max-w-3xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">07.03</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Error Messages</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Good errors help users recover. They say what happened, why it happened (when useful), and what to do next — all in one sentence.
        </p>
      </div>

      {/* Format */}
      <section>
        <SectionTitle num="01" title="Format rules" />
        <div className="space-y-2">
          {FORMAT_RULES.map((rule) => (
            <div key={rule.label} className="grid grid-cols-3 gap-3 py-2.5 border-b border-ds-current/20 text-sm">
              <span className="text-ds-fg font-medium text-xs">{rule.label}</span>
              <span className="text-ds-green text-xs font-mono">✓ {rule.do}</span>
              <span className="text-ds-red text-xs font-mono line-through opacity-60">✕ {rule.dont}</span>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Field errors */}
      <section>
        <SectionTitle num="02" title="Inline field errors" />
        <p className="text-xs text-ds-comment mb-4">
          Use <code className="text-ds-purple">FormField error=""</code> + <code className="text-ds-purple">Input variant="error"</code>. Error appears below the field in red.
        </p>
        <div className="space-y-4 max-w-sm">
          {EXAMPLES.slice(0, 3).map((ex) => (
            <FormField key={ex.field} id={ex.field} label={ex.field} error={ex.error}>
              <Input id={ex.field} variant="error" />
            </FormField>
          ))}
        </div>
      </section>

      <Divider />

      {/* Alert errors */}
      <section>
        <SectionTitle num="03" title="Page-level alerts" />
        <p className="text-xs text-ds-comment mb-4">
          Use <code className="text-ds-purple">Alert variant="destructive"</code> for errors that affect the whole operation.
        </p>
        <div className="space-y-3">
          <Alert variant="error">
            <AlertTriangle className="h-4 w-4" />
            <div>
              <div className="font-semibold text-sm">Failed to deploy agent</div>
              <div className="text-xs mt-0.5 opacity-80">Connection timed out. Check your network and try again.</div>
            </div>
          </Alert>
          <Alert variant="warning">
            <Info className="h-4 w-4" />
            <div>
              <div className="font-semibold text-sm">Approaching rate limit</div>
              <div className="text-xs mt-0.5 opacity-80">You've used 85% of your hourly token quota. Requests may slow down soon.</div>
            </div>
          </Alert>
        </div>
      </section>

      <Divider />

      {/* Severity map */}
      <section>
        <SectionTitle num="04" title="Severity → component mapping" />
        <div className="overflow-x-auto rounded-ds-lg border border-ds-current bg-ds-panel">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ds-current bg-ds-bg">
                {['Severity', 'Component', 'When to use'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-ds-comment">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { sev: 'Field error',   comp: 'FormField error prop', when: 'Single field validation failure' },
                { sev: 'Error',         comp: 'Alert destructive',    when: 'Operation failed, page-level' },
                { sev: 'Warning',       comp: 'Alert warning',        when: 'Non-blocking issue, user should know' },
                { sev: 'Info',          comp: 'Alert info',           when: 'Contextual tip, not an error' },
                { sev: 'Toast error',   comp: 'useToast error',       when: 'Background operation failure' },
              ].map((row) => (
                <tr key={row.sev} className="border-b border-ds-current/30 last:border-0">
                  <td className="px-4 py-2.5">
                    <Badge
                      variant={row.sev.includes('Error') || row.sev.includes('error') ? 'solid-red' : row.sev === 'Warning' ? 'solid-orange' : 'cyan'}
                      className="text-[9px]"
                    >{row.sev}</Badge>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-ds-purple">{row.comp}</td>
                  <td className="px-4 py-2.5 text-xs text-ds-comment">{row.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
