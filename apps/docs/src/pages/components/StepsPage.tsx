import { Steps } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Steps } from '@shieldai/ds'

// Horizontal (auto-derived from current index)
<Steps
  current={2}
  steps={[
    { label: 'Configure' },
    { label: 'Review' },
    { label: 'Deploy' },
    { label: 'Monitor' },
  ]}
/>

// Vertical with descriptions
<Steps
  orientation="vertical"
  current={1}
  steps={[
    { label: 'Initialize',   description: 'Agent pool created.' },
    { label: 'Orchestrate',  description: 'Routing tasks to agents.' },
    { label: 'Aggregate',    description: 'Merging results.' },
  ]}
/>

// Manual status override
<Steps
  steps={[
    { label: 'Build',  status: 'completed' },
    { label: 'Test',   status: 'error' },
    { label: 'Deploy', status: 'pending' },
  ]}
/>`

const PROPS = [
  { name: 'steps', type: 'Step[]', required: true, description: 'Step definitions with label, optional description and status' },
  { name: 'current', type: 'number', description: 'Index of the current step — derives status automatically when step.status is unset' },
  { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Layout direction' },
]

const WORKFLOW_STEPS = [
  { label: 'Intake',      description: 'Task received from orchestrator.' },
  { label: 'Plan',        description: 'Decompose into sub-tasks.' },
  { label: 'Execute',     description: 'Run agents in parallel.' },
  { label: 'Aggregate',   description: 'Merge and validate results.' },
  { label: 'Return',      description: 'Send response upstream.' },
]

export default function StepsPage() {
  return (
    <ComponentBlock
      num="02.28"
      title="Steps"
      tag="horizontal · vertical · status override"
      description="Step-by-step progress indicator for multi-stage workflows. Status auto-derives from the current index, or can be set manually per step."
      preview={
        <div className="space-y-8 w-full">
          <PreviewRow label="horizontal · current=2">
            <Steps
              current={2}
              steps={[
                { label: 'Configure' },
                { label: 'Review' },
                { label: 'Deploy' },
                { label: 'Monitor' },
              ]}
            />
          </PreviewRow>
          <PreviewRow label="horizontal · error state">
            <Steps
              steps={[
                { label: 'Build',   status: 'completed' },
                { label: 'Test',    status: 'error' },
                { label: 'Deploy',  status: 'pending' },
                { label: 'Release', status: 'pending' },
              ]}
            />
          </PreviewRow>
          <PreviewRow label="vertical · with descriptions · current=1">
            <Steps orientation="vertical" current={1} steps={WORKFLOW_STEPS} />
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="Steps.tsx"
      props={PROPS}
    />
  )
}
