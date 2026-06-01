import { DSLineChart, DSAreaChart, DSBarChart } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { DSLineChart, DSAreaChart, DSBarChart } from '@shieldai/ds'

// Line chart
<DSLineChart
  data={data}
  xKey="hour"
  series={[
    { key: 'threats', label: 'Threats',  color: 'red' },
    { key: 'blocked', label: 'Blocked',  color: 'green' },
  ]}
  height={200}
/>

// Area chart (with gradient fill)
<DSAreaChart
  data={data}
  xKey="day"
  series={[{ key: 'agents', label: 'Active agents', color: 'purple' }]}
/>

// Bar chart
<DSBarChart
  data={data}
  xKey="region"
  series={[{ key: 'count', label: 'Agents', color: 'cyan' }]}
/>`

const PROPS = [
  { name: 'data', type: 'Record<string, string | number>[]', default: '—', description: 'Array of data points — each object is one X position' },
  { name: 'series', type: 'ChartSeries[]', default: '—', description: 'Array of { key, label?, color? } — key must match a property in each data object' },
  { name: 'xKey', type: 'string', default: '"x"', description: 'Data property to use as the X-axis label' },
  { name: 'height', type: 'number', default: '200', description: 'Chart height in pixels' },
  { name: 'grid', type: 'boolean', default: 'true', description: 'Show the background grid lines' },
  { name: 'className', type: 'string', default: '—', description: 'Additional classes on the container div' },
]

// ─── Demo data ────────────────────────────────────────────────────────────────

const HOURLY = Array.from({ length: 12 }, (_, i) => ({
  hour: `${(i * 2).toString().padStart(2, '0')}:00`,
  threats: Math.floor(Math.random() * 80 + 10),
  blocked: Math.floor(Math.random() * 60 + 5),
}))

const DAILY = Array.from({ length: 14 }, (_, i) => ({
  day: `May ${i + 18}`,
  agents: Math.floor(Math.random() * 8 + 4),
  workflows: Math.floor(Math.random() * 5 + 1),
}))

const REGIONS = [
  { region: 'us-east-1', count: 12, errors: 2 },
  { region: 'us-west-2', count: 8,  errors: 0 },
  { region: 'eu-west-1', count: 6,  errors: 1 },
  { region: 'ap-east-1', count: 4,  errors: 0 },
  { region: 'sa-east-1', count: 2,  errors: 1 },
]

export default function ChartsPage() {
  return (
    <ComponentBlock
      num="02.CH"
      title="Charts"
      tag="line · area · bar · recharts · DS colors"
      description="Recharts-powered chart components styled with the ShieldAI design token palette. All charts use the neon-on-dark color scheme with custom tooltip and grid. Three chart types: DSLineChart, DSAreaChart, DSBarChart."
      preview={
        <div className="space-y-8 w-full">
          <div>
            <div className="text-[10px] font-mono uppercase text-ds-comment mb-3">Line chart — threats vs blocked (last 24h)</div>
            <div className="bg-ds-panel border border-ds-current rounded-ds-xl p-4">
              <DSLineChart
                data={HOURLY}
                xKey="hour"
                series={[
                  { key: 'threats', label: 'Threats', color: 'red' },
                  { key: 'blocked', label: 'Blocked', color: 'green' },
                ]}
                height={180}
              />
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-ds-comment mb-3">Area chart — agent + workflow activity (14 days)</div>
            <div className="bg-ds-panel border border-ds-current rounded-ds-xl p-4">
              <DSAreaChart
                data={DAILY}
                xKey="day"
                series={[
                  { key: 'agents',    label: 'Agents',    color: 'purple' },
                  { key: 'workflows', label: 'Workflows', color: 'cyan' },
                ]}
                height={180}
              />
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-ds-comment mb-3">Bar chart — agents by region</div>
            <div className="bg-ds-panel border border-ds-current rounded-ds-xl p-4">
              <DSBarChart
                data={REGIONS}
                xKey="region"
                series={[
                  { key: 'count',  label: 'Agents', color: 'cyan' },
                  { key: 'errors', label: 'Errors', color: 'red' },
                ]}
                height={180}
              />
            </div>
          </div>
        </div>
      }
      code={CODE}
      filename="Charts.tsx"
      props={PROPS}
    />
  )
}
