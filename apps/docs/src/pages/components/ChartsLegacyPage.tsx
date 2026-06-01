import { Sparkline, MiniBarChart, StatCard } from '@shieldai/ds'
import { ComponentBlock, DocSection, PreviewRow } from '../../components/docs'

const SPARKLINE_DATA = [12, 18, 15, 24, 20, 28, 22, 30, 26, 35, 32, 40]
const BAR_DATA       = [4, 8, 6, 12, 9, 15, 11, 18, 14, 20, 16, 24]

const STAT_CARDS = [
  {
    label: 'Active Agents', value: '24', delta: '3 this week', deltaPositive: true,
    sparkline: SPARKLINE_DATA, sparklineColor: 'purple' as const,
  },
  {
    label: 'Tasks / hour', value: '1,204', delta: '8.2% vs yesterday', deltaPositive: true,
    sparkline: BAR_DATA.map((v) => v * 3), sparklineColor: 'green' as const,
  },
  {
    label: 'Error rate', value: '0.4%', delta: '0.1% vs yesterday', deltaPositive: false,
    sparkline: [2, 3, 2, 4, 3, 2, 5, 3, 2, 4, 3, 4], sparklineColor: 'red' as const,
  },
  {
    label: 'Avg latency', value: '142ms', delta: '12ms vs baseline', deltaPositive: false,
    sparkline: [80, 90, 85, 100, 95, 110, 105, 120, 115, 130, 125, 142], sparklineColor: 'orange' as const,
  },
]

const SPARKLINE_CODE = `import { Sparkline } from '@shieldai/ds'

// Simple sparkline — just pass an array of numbers
<Sparkline
  data={[12, 18, 15, 24, 20, 28, 35, 32, 40]}
  color="purple"
  height={40}
/>`

const MINIBAR_CODE = `import { MiniBarChart } from '@shieldai/ds'

// Mini bar chart — for frequency/histogram style data
<MiniBarChart
  data={[4, 8, 6, 12, 9, 15, 11, 18]}
  color="cyan"
  height={40}
/>`

const STATCARD_CODE = `import { StatCard } from '@shieldai/ds'

<StatCard
  label="Active Agents"
  value="24"
  delta="3 this week"
  deltaPositive
  sparkline={[12, 18, 15, 24, 20, 28, 35, 40]}
  sparklineColor="purple"
/>`

const SPARKLINE_PROPS = [
  { name: 'data',         type: 'number[]',   default: '[]',       description: 'Array of numeric values to plot' },
  { name: 'color',        type: 'ChartColor', default: '"purple"', description: 'One of the 7 DS chart colors' },
  { name: 'height',       type: 'number',     default: '40',       description: 'Height of the chart in px' },
  { name: 'showDot',      type: 'boolean',    default: 'true',     description: 'Show active dot on hover' },
  { name: 'className',    type: 'string',     default: '—',        description: 'Additional wrapper className' },
]

const STATCARD_PROPS = [
  { name: 'label',          type: 'string',     default: '—',        description: 'Metric name displayed above value' },
  { name: 'value',          type: 'string | number', default: '—',   description: 'Primary metric value' },
  { name: 'delta',          type: 'string',     default: '—',        description: 'Change text — shown with arrow' },
  { name: 'deltaPositive',  type: 'boolean',    default: 'false',    description: 'Green arrow up vs red arrow down' },
  { name: 'sparkline',      type: 'number[]',   default: '—',        description: 'Optional inline sparkline data' },
  { name: 'sparklineColor', type: 'ChartColor', default: '"purple"', description: 'Sparkline color token' },
]

export default function ChartsLegacyPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">02.Charts</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Charts Legacy</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Lightweight embedded chart primitives with a frozen API. Use for inline metrics, sparklines inside table cells, and stat cards. For full-featured charts use the main <code className="text-ds-purple">Charts</code> components.
        </p>
      </div>

      {/* Stat card grid */}
      <DocSection title="StatCard — with embedded sparkline">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STAT_CARDS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </DocSection>

      <ComponentBlock
        num="CL.1"
        title="Sparkline"
        tag="inline · number[] · hover tooltip"
        description="Ultra-compact line chart for inline use — inside table cells, stat cards, or dashboards. API is a single number array."
        preview={
          <div className="space-y-4 w-full max-w-sm">
            <PreviewRow label="purple">
              <Sparkline data={SPARKLINE_DATA} color="purple" height={40} />
            </PreviewRow>
            <PreviewRow label="green">
              <Sparkline data={SPARKLINE_DATA} color="green" height={40} />
            </PreviewRow>
            <PreviewRow label="orange">
              <Sparkline data={SPARKLINE_DATA} color="orange" height={40} />
            </PreviewRow>
          </div>
        }
        code={SPARKLINE_CODE}
        props={SPARKLINE_PROPS}
      />

      <ComponentBlock
        num="CL.2"
        title="MiniBarChart"
        tag="inline · number[] · hover tooltip"
        description="Compact bar chart for frequency and histogram data. Same simple API as Sparkline."
        preview={
          <div className="space-y-4 w-full max-w-sm">
            <PreviewRow label="cyan">
              <MiniBarChart data={BAR_DATA} color="cyan" height={40} />
            </PreviewRow>
            <PreviewRow label="pink">
              <MiniBarChart data={BAR_DATA} color="pink" height={40} />
            </PreviewRow>
          </div>
        }
        code={MINIBAR_CODE}
        props={SPARKLINE_PROPS.map((p) => p.name === 'showDot' ? { ...p, description: 'N/A for bar chart' } : p)}
      />

      <ComponentBlock
        num="CL.3"
        title="StatCard"
        tag="metric · delta · sparkline"
        description="Pre-composed stat card with label, primary value, delta arrow, and optional inline sparkline."
        preview={
          <div className="grid grid-cols-2 gap-3 w-full">
            {STAT_CARDS.slice(0, 2).map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        }
        code={STATCARD_CODE}
        props={STATCARD_PROPS}
      />

      <DocSection title="When to use Charts Legacy vs Charts">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-ds-green/30 bg-ds-green/5 rounded-ds-lg space-y-2">
            <p className="text-xs font-bold text-ds-green font-mono">Use ChartsLegacy when…</p>
            <ul className="text-xs text-ds-comment space-y-1 list-disc list-inside">
              <li>Embedding a chart inside a table cell</li>
              <li>Building a stats dashboard card</li>
              <li>Data is a flat <code>number[]</code></li>
              <li>You need &lt;50px height</li>
            </ul>
          </div>
          <div className="p-4 border border-ds-purple/30 bg-ds-purple/5 rounded-ds-lg space-y-2">
            <p className="text-xs font-bold text-ds-purple font-mono">Use Charts when…</p>
            <ul className="text-xs text-ds-comment space-y-1 list-disc list-inside">
              <li>Multiple named series</li>
              <li>X/Y axis labels needed</li>
              <li>Area or complex bar charts</li>
              <li>Height &gt; 120px, full-width</li>
            </ul>
          </div>
        </div>
      </DocSection>
    </div>
  )
}
