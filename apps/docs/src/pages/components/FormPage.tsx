import { useState } from 'react'
import { Form, FormField, FormSection, FormActions, Input, Textarea, Select, Button, Multiselect } from '@shieldai/ds'
import { ComponentBlock, DocSection } from '../../components/docs'

const CODE = `import { Form, FormField, FormSection, FormActions, Input, Select, Button } from '@shieldai/ds'

<Form onSubmit={(e) => { e.preventDefault(); /* handle */ }}>
  <FormSection title="Agent Identity" description="Basic agent configuration.">
    <FormField id="name" label="Agent name" required description="Unique identifier for this agent">
      <Input id="name" placeholder="e.g. orchestrator-prod" />
    </FormField>
    <FormField id="type" label="Agent type" required>
      <Select id="type" placeholder="Select type…" items={[
        { value: 'orchestrator', label: 'Orchestrator' },
        { value: 'coder', label: 'Coder' },
      ]} />
    </FormField>
  </FormSection>

  <FormActions>
    <Button variant="ghost">Cancel</Button>
    <Button type="submit">Create Agent</Button>
  </FormActions>
</Form>`

const CODE_FIELD = `// FormField with error
<FormField id="email" label="Email" error="Must be a valid email address" required>
  <Input id="email" variant="error" value="not-an-email" />
</FormField>

// Left-label layout
<FormField id="name" label="Name" labelPlacement="left" description="Shown in the agent registry">
  <Input id="name" />
</FormField>`

const PROPS_FIELD = [
  { name: 'id', type: 'string', default: '—', description: 'Wires label htmlFor and aria-describedby' },
  { name: 'label', type: 'string', default: '—', description: 'Field label text' },
  { name: 'description', type: 'string', default: '—', description: 'Helper text below label' },
  { name: 'error', type: 'string', default: '—', description: 'Error message; also visually marks label red' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Adds * marker and aria-required' },
  { name: 'labelPlacement', type: '"top" | "left"', default: '"top"', description: 'Label position relative to control' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'The form control (Input, Select, etc.)' },
]

const AGENT_TYPES = [
  { value: 'orchestrator', label: 'Orchestrator' },
  { value: 'coder', label: 'Coder' },
  { value: 'executor', label: 'Executor' },
  { value: 'retriever', label: 'Retriever' },
]

function BasicForm() {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [nameError, setNameError] = useState('')

  const validate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setNameError('Agent name is required')
    } else {
      setNameError('')
      alert(`Agent "${name}" created!`)
    }
  }

  return (
    <Form onSubmit={validate} className="max-w-md w-full">
      <FormSection title="Agent Identity" description="Configure the agent's basic properties.">
        <FormField
          id="agent-name"
          label="Agent name"
          required
          error={nameError}
          description="Must be unique within your workspace"
        >
          <Input
            id="agent-name"
            value={name}
            onChange={(e) => { setName(e.target.value); setNameError('') }}
            placeholder="e.g. orchestrator-prod"
            variant={nameError ? 'error' : 'default'}
          />
        </FormField>
        <FormField id="agent-type" label="Agent type" required>
          <Select
            placeholder="Select type…"
            items={AGENT_TYPES}
          />
        </FormField>
        <FormField id="agent-desc" label="Description" description="What does this agent do?">
          <Textarea
            id="agent-desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Describe the agent's role…"
            rows={2}
          />
        </FormField>
      </FormSection>
      <FormActions>
        <Button variant="ghost" type="button">Cancel</Button>
        <Button type="submit">Create Agent</Button>
      </FormActions>
    </Form>
  )
}

export default function FormPage() {
  return (
    <ComponentBlock
      num="02.20"
      title="Form & FormField"
      tag="scaffold · validation · label · error"
      description="Page-level form scaffold with sections and actions. FormField wires label, description, error, and required marker around any control."
      preview={<BasicForm />}
      code={CODE}
      props={PROPS_FIELD}
    >
      <DocSection title="Label placements">
        <div className="max-w-lg w-full space-y-4">
          <p className="text-xs text-ds-comment font-mono">top (default)</p>
          <FormField id="top-ex" label="Model endpoint" description="REST endpoint or model ID" required>
            <Input id="top-ex" placeholder="https://api.example.com/v1" />
          </FormField>
          <p className="text-xs text-ds-comment font-mono mt-4">left</p>
          <FormField id="left-ex" label="Max tokens" labelPlacement="left" description="Per-request limit">
            <Input id="left-ex" type="number" placeholder="4096" />
          </FormField>
        </div>
        <div className="mt-3 font-mono text-xs text-ds-comment whitespace-pre">{CODE_FIELD}</div>
      </DocSection>

      <DocSection title="Error state">
        <div className="max-w-xs w-full">
          <FormField id="err-ex" label="Email" error="Must be a valid email address" required>
            <Input id="err-ex" variant="error" defaultValue="not-valid" />
          </FormField>
        </div>
      </DocSection>

      <DocSection title="Complex field — Multiselect">
        <div className="max-w-sm w-full">
          <FormField id="regions" label="Deploy regions" required description="At least one region required">
            <Multiselect
              options={[
                { value: 'us-east', label: 'US East' },
                { value: 'eu-west', label: 'EU West' },
                { value: 'ap-south', label: 'AP South' },
              ]}
              value={[]}
              onChange={() => {}}
              placeholder="Select regions…"
            />
          </FormField>
        </div>
      </DocSection>
    </ComponentBlock>
  )
}
