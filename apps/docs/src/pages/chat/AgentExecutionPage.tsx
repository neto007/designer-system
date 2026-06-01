import { AgentExecutionView } from '@shieldai/ds'
import type { ExecutionStep } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { AgentExecutionView } from '@shieldai/ds'

<AgentExecutionView
  title="Threat detection pipeline"
  steps={[
    {
      id: 'ingest',
      label: 'Log ingest',
      status: 'success',
      durationMs: 48,
      timestamp: '10:42:01',
    },
    {
      id: 'classify',
      label: 'GPT-4o classification',
      status: 'success',
      durationMs: 1342,
      toolCalls: [
        {
          name: 'run_classifier',
          input:  { model: 'gpt-4o', temperature: 0 },
          output: { label: 'threat', confidence: 0.97 },
          status: 'success',
          durationMs: 1280,
        },
      ],
    },
    {
      id: 'report',
      label: 'Report writer',
      status: 'running',
    },
  ]}
/>`

const PROPS = [
  { name: 'steps', type: 'ExecutionStep[]', default: '—', description: 'Ordered list of execution steps — each may contain nested toolCalls' },
  { name: 'title', type: 'string', default: '"Execution trace"', description: 'Header label' },
  { name: 'defaultExpanded', type: 'boolean', default: 'true', description: 'Whether the step list starts open' },
]

const STEP_PROPS = [
  { name: 'id', type: 'string', default: '—', description: 'Unique key' },
  { name: 'label', type: 'string', default: '—', description: 'Step name' },
  { name: 'status', type: '"pending" | "running" | "success" | "error"', default: '—', description: 'Drives icon and line color' },
  { name: 'timestamp', type: 'string', default: '—', description: 'Shown on the right edge' },
  { name: 'durationMs', type: 'number', default: '—', description: 'Execution time in ms' },
  { name: 'toolCalls', type: 'ToolCall[]', default: '—', description: 'Nested tool invocations — expandable with input/output' },
  { name: 'log', type: 'string', default: '—', description: 'Raw log text shown below the step' },
]

const STEPS: ExecutionStep[] = [
  {
    id: 'ingest',
    label: 'Log ingest — 2,847 events',
    status: 'success',
    durationMs: 48,
    timestamp: '10:42:01',
  },
  {
    id: 'classify',
    label: 'GPT-4o threat classification',
    status: 'success',
    durationMs: 1342,
    timestamp: '10:42:01',
    toolCalls: [
      {
        name: 'run_classifier',
        input:  { model: 'gpt-4o', temperature: 0, max_tokens: 512 },
        output: { label: 'threat', confidence: 0.97, category: 'sql-injection' },
        status: 'success',
        durationMs: 1280,
      },
    ],
  },
  {
    id: 'scan',
    label: 'CVE deep scan',
    status: 'success',
    durationMs: 892,
    timestamp: '10:42:02',
    toolCalls: [
      {
        name: 'search_cve_db',
        input:  { query: 'sql-injection 2025', limit: 10 },
        output: 'Found 3 matching CVEs: CVE-2025-1234, CVE-2025-5678, CVE-2025-9012',
        status: 'success',
        durationMs: 440,
      },
      {
        name: 'fetch_exploit_details',
        input:  { cve_id: 'CVE-2025-1234' },
        output: { severity: 'critical', cvss: 9.8 },
        status: 'success',
        durationMs: 390,
      },
    ],
  },
  {
    id: 'report',
    label: 'Write executive summary',
    status: 'running',
    timestamp: '10:42:03',
    toolCalls: [
      {
        name: 'write_report',
        input: { format: 'markdown', audience: 'executive' },
        status: 'running',
      },
    ],
  },
  {
    id: 'notify',
    label: 'Send Slack alert',
    status: 'pending',
  },
]

export default function AgentExecutionPage() {
  return (
    <ComponentBlock
      num="05.EX"
      title="Agent Execution View"
      tag="expandable · tool calls · nested · live status"
      description="Collapsible execution trace for agent pipelines. Shows steps with status icons and timings, with nested tool call rows that expand to reveal input/output payloads. Running steps start expanded automatically."
      preview={
        <div className="w-full max-w-lg">
          <AgentExecutionView
            title="Threat detection pipeline"
            steps={STEPS}
          />
        </div>
      }
      code={CODE}
      filename="AgentExecutionView.tsx"
      props={[...PROPS, ...STEP_PROPS]}
    />
  )
}
