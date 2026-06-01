import { useState } from 'react'
import { TagEditor } from '@shieldai/ds'
import type { TagEntry } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { TagEditor } from '@shieldai/ds'
import type { TagEntry } from '@shieldai/ds'

// Uncontrolled — manages rows internally
<TagEditor
  keyPlaceholder="key"
  valuePlaceholder="value"
  onChange={(entries) => console.log(entries)}
/>

// Controlled
const [tags, setTags] = useState<TagEntry[]>([
  { key: 'env',    value: 'production' },
  { key: 'region', value: 'us-east-1' },
])

<TagEditor
  value={tags}
  onChange={setTags}
  keyPlaceholder="label"
  valuePlaceholder="value"
  maxRows={10}
/>

// Keyboard: Enter moves to next field, Backspace on empty row removes it`

const PROPS = [
  { name: 'value', type: 'TagEntry[]', default: '—', description: 'Controlled list of { key, value } pairs' },
  { name: 'onChange', type: '(entries: TagEntry[]) => void', default: '—', description: 'Called on every edit' },
  { name: 'keyPlaceholder', type: 'string', default: '"key"', description: 'Placeholder for the key column' },
  { name: 'valuePlaceholder', type: 'string', default: '"value"', description: 'Placeholder for the value column' },
  { name: 'maxRows', type: 'number', default: '20', description: 'Maximum number of rows allowed' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all inputs and controls' },
]

function LiveDemo() {
  const [envVars, setEnvVars] = useState<TagEntry[]>([
    { key: 'NODE_ENV',    value: 'production' },
    { key: 'API_BASE_URL',value: 'https://api.shieldai.io' },
    { key: 'LOG_LEVEL',   value: 'warn' },
  ])
  const [labels, setLabels] = useState<TagEntry[]>([
    { key: 'team',   value: 'platform' },
    { key: 'region', value: 'us-east-1' },
  ])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
      <div>
        <div className="text-[10px] font-mono uppercase text-ds-comment mb-3">Environment variables</div>
        <TagEditor
          value={envVars}
          onChange={setEnvVars}
          keyPlaceholder="KEY"
          valuePlaceholder="value"
        />
        <div className="mt-3 p-3 bg-ds-panel border border-ds-current rounded-ds-md">
          <div className="text-[10px] font-mono uppercase text-ds-comment mb-1">output</div>
          <pre className="text-[10px] font-mono text-ds-green whitespace-pre-wrap">
            {envVars.filter(e => e.key).map(e => `${e.key}=${e.value}`).join('\n') || '(empty)'}
          </pre>
        </div>
      </div>

      <div>
        <div className="text-[10px] font-mono uppercase text-ds-comment mb-3">Resource labels</div>
        <TagEditor
          value={labels}
          onChange={setLabels}
          keyPlaceholder="label"
          valuePlaceholder="value"
          maxRows={6}
        />
        <div className="mt-3">
          <div className="text-[10px] font-mono uppercase text-ds-comment mb-1">disabled</div>
          <TagEditor
            value={[{ key: 'owner', value: 'team-alpha' }, { key: 'env', value: 'prod' }]}
            disabled
          />
        </div>
      </div>
    </div>
  )
}

export default function TagEditorPage() {
  return (
    <ComponentBlock
      num="02.TE"
      title="Tag Editor"
      tag="key:value rows · keyboard nav · add/remove"
      description="Repeating key:value row editor for environment variables, resource labels, and metadata. Enter moves between fields and adds new rows. Backspace on an empty row removes it. Controlled or uncontrolled."
      preview={<LiveDemo />}
      code={CODE}
      filename="TagEditor.tsx"
      props={PROPS}
    />
  )
}
