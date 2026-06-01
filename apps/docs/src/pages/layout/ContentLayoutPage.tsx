import { Button, Badge, KeyValuePairs, StatusIndicator } from '@shieldai/ds'
import { DocSection } from '../../components/docs'

const CODE = `// ContentLayout is a composition pattern for page-level scaffolding.
// Combine a header band, breadcrumbs, main content, and optional secondary column:

function ContentLayout({ title, badge, actions, secondary, children }) {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between pb-4 border-b border-ds-current">
        <div>
          <div className="text-xs text-ds-comment mb-1">{breadcrumbs}</div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-ds-fg">{title}</h1>
            {badge}
          </div>
        </div>
        <div className="flex gap-2">{actions}</div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        <main className="flex-1 min-w-0">{children}</main>
        {secondary && (
          <aside className="w-72 flex-shrink-0">{secondary}</aside>
        )}
      </div>
    </div>
  )
}`

export default function ContentLayoutPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-ds-purple mb-1">03 · Layout</div>
        <h1 className="text-3xl font-bold text-ds-fg mb-3">Content Layout</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Page-level scaffold with a header band (title, badge, actions), optional breadcrumbs, main content area, and a secondary column for metadata or help.
        </p>
      </div>

      <DocSection title="Live Preview — Agent Detail Page">
        <div className="w-full border border-ds-current rounded-ds-xl p-5 bg-ds-bg space-y-5">
          {/* Header band */}
          <div className="flex items-start justify-between pb-4 border-b border-ds-current">
            <div>
              <div className="text-[10px] font-mono text-ds-comment mb-1">Agents / ml-training-agent</div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-ds-fg">ml-training-agent</h2>
                <Badge variant="green">live</Badge>
              </div>
              <StatusIndicator status="running" label="Running epoch 12 of 50" className="mt-1" />
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Logs</Button>
              <Button size="sm" variant="outline">Pause</Button>
              <Button size="sm" variant="neu-red">Stop</Button>
            </div>
          </div>

          {/* Two-column body */}
          <div className="flex gap-5">
            <main className="flex-1 min-w-0 space-y-4">
              <div className="h-32 bg-ds-panel border border-ds-current rounded-ds-lg flex items-center justify-center text-ds-comment text-sm">
                Training metrics chart placeholder
              </div>
              <div className="h-24 bg-ds-panel border border-ds-current rounded-ds-lg flex items-center justify-center text-ds-comment text-sm">
                Recent events log
              </div>
            </main>
            <aside className="w-60 flex-shrink-0">
              <KeyValuePairs
                items={[
                  { key: 'Type',    value: 'LLM' },
                  { key: 'Region',  value: 'us-east-1' },
                  { key: 'Owner',   value: 'team-alpha' },
                  { key: 'Created', value: '2026-05-01' },
                  { key: 'Memory',  value: '8 Gi' },
                  { key: 'CPU',     value: '4 cores' },
                ]}
              />
            </aside>
          </div>
        </div>
      </DocSection>

      <DocSection title="Usage">
        <pre className="bg-ds-panel border border-ds-current rounded-ds-md p-4 text-xs text-ds-fg font-mono overflow-x-auto whitespace-pre">
          {CODE}
        </pre>
      </DocSection>
    </div>
  )
}
