import { useState } from 'react'
import { AttributeEditor } from '@shieldai/ds'
import type { AttributeRow } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { AttributeEditor } from '@shieldai/ds'

const ENV_FIELDS = [
  { key: 'key',   label: 'Key',   type: 'text' as const,   placeholder: 'VARIABLE_NAME' },
  { key: 'value', label: 'Value', type: 'text' as const,   placeholder: 'value' },
  { key: 'secret',label: 'Secret',type: 'boolean' as const },
]

<AttributeEditor
  fields={ENV_FIELDS}
  onChange={(rows) => console.log(rows)}
/>

// With select field
const RESOURCE_FIELDS = [
  { key: 'resource', label: 'Resource', type: 'select', options: ['cpu', 'memory', 'gpu'] },
  { key: 'limit',    label: 'Limit',    type: 'number', placeholder: '512' },
  { key: 'unit',     label: 'Unit',     type: 'select', options: ['Mi', 'Gi', 'cores'] },
]`

const PROPS = [
  { name: 'fields', type: 'AttributeField[]', default: '—', description: 'Column definitions: { key, label, type?, options?, placeholder? }' },
  { name: 'value', type: 'AttributeRow[]', default: '—', description: 'Controlled list of rows' },
  { name: 'onChange', type: '(rows: AttributeRow[]) => void', default: '—', description: 'Called on every change' },
  { name: 'maxRows', type: 'number', default: '20', description: 'Maximum number of rows' },
  { name: 'addLabel', type: 'string', default: '"Add row"', description: 'Label for the add-row button' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all controls' },
]

const ENV_FIELDS = [
  { key: 'key',    label: 'Key',    type: 'text' as const,    placeholder: 'ENV_VAR' },
  { key: 'value',  label: 'Value',  type: 'text' as const,    placeholder: 'value' },
  { key: 'secret', label: 'Secret', type: 'boolean' as const },
]

const RESOURCE_FIELDS = [
  { key: 'resource', label: 'Resource', type: 'select' as const, options: ['cpu', 'memory', 'gpu', 'storage'] },
  { key: 'request',  label: 'Request',  type: 'number' as const, placeholder: '256' },
  { key: 'limit',    label: 'Limit',    type: 'number' as const, placeholder: '512' },
  { key: 'unit',     label: 'Unit',     type: 'select' as const, options: ['Mi', 'Gi', 'cores', 'GB'] },
]

function LiveDemo() {
  const [envRows, setEnvRows] = useState<AttributeRow[]>([])
  const [resRows, setResRows] = useState<AttributeRow[]>([])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
      <div>
        <div className="text-[10px] font-mono uppercase text-ds-comment mb-3">Environment variables</div>
        <AttributeEditor fields={ENV_FIELDS} value={envRows} onChange={setEnvRows} />
        {envRows.length > 0 && (
          <div className="mt-3 p-2 bg-ds-panel border border-ds-current rounded-ds-md text-[10px] font-mono text-ds-green">
            {envRows.filter(r => r.values.key).map(r =>
              `${r.values.key}=${r.values.value}${r.values.secret === 'true' ? ' (secret)' : ''}`
            ).join('\n')}
          </div>
        )}
      </div>

      <div>
        <div className="text-[10px] font-mono uppercase text-ds-comment mb-3">Resource limits</div>
        <AttributeEditor
          fields={RESOURCE_FIELDS}
          value={resRows}
          onChange={setResRows}
          addLabel="Add resource"
        />
      </div>
    </div>
  )
}

export default function AttributeEditorPage() {
  return (
    <ComponentBlock
      num="02.AE"
      title="Attribute Editor"
      tag="repeating rows · text · number · select · boolean"
      description="Generic repeating-row form for structured attribute lists. Each column is defined by a field spec that controls the input type (text, number, select, boolean). Rows can be added and removed. Controlled or uncontrolled."
      preview={<LiveDemo />}
      code={CODE}
      filename="AttributeEditor.tsx"
      props={PROPS}
    />
  )
}
