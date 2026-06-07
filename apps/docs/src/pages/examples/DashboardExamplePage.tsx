import { useState } from 'react'
import { TrendingUp, TrendingDown, Shield, Zap, AlertTriangle, Download, Plus } from 'lucide-react'
import {
  Badge, Button, Progress, StatusDot, AgentBadge,
  Tabs, TabsList, TabsTrigger, TabsContent,
  StatusIndicator, DSAreaChart,
} from '@shieldai/ds'
import { cn } from '@shieldai/ds'
import { ExampleShell } from './ExampleShell'

const STATS = [
  { label: 'Agents Active',    value: '12',    delta: '+2',   up: true,  color: 'text-ds-purple', icon: Zap },
  { label: 'Threats Blocked',  value: '1,847', delta: '+134', up: true,  color: 'text-ds-red',    icon: Shield },
  { label: 'Pipelines Running',value: '6',     delta: '-1',   up: false, color: 'text-ds-cyan',   icon: TrendingUp },
  { label: 'Uptime',           value: '99.9%', delta: 'SLA',  up: true,  color: 'text-ds-green',  icon: TrendingUp },
]

const ACTIVITY_DATA = [
  { name: '00h', threats: 12, scans: 45 },
  { name: '04h', threats: 8,  scans: 38 },
  { name: '08h', threats: 23, scans: 87 },
  { name: '12h', threats: 47, scans: 142 },
  { name: '16h', threats: 31, scans: 98  },
  { name: '20h', threats: 19, scans: 67  },
  { name: 'Now', threats: 14, scans: 53  },
]

const CHART_SERIES = [
  { key: 'threats', label: 'Threats', color: 'red'    as const },
  { key: 'scans',   label: 'Scans',   color: 'purple' as const },
]

const AGENTS = [
  { id: 'llm-01',  type: 'llm'        as const, label: 'GPT-4 Analyst',   status: 'live'  as const, tasks: 3, cpu: 72 },
  { id: 'seq-01',  type: 'sequential' as const, label: 'Network Scanner', status: 'live'  as const, tasks: 8, cpu: 45 },
  { id: 'wf-01',   type: 'workflow'   as const, label: 'Threat Pipeline', status: 'live'  as const, tasks: 2, cpu: 31 },
  { id: 'par-01',  type: 'parallel'   as const, label: 'Log Correlator',  status: 'idle'  as const, tasks: 0, cpu: 3  },
  { id: 'task-01', type: 'task'       as const, label: 'IOC Extractor',   status: 'error' as const, tasks: 0, cpu: 0  },
  { id: 'a2a-01',  type: 'a2a'        as const, label: 'SOC Assistant',   status: 'idle'  as const, tasks: 1, cpu: 12 },
]

const ALERTS = [
  { id: 1, sev: 'critical', msg: 'Lateral movement detected — host 10.0.1.45', time: '2m ago',  resolved: false },
  { id: 2, sev: 'high',     msg: 'Brute force attempt — SSH port 22',           time: '14m ago', resolved: false },
  { id: 3, sev: 'medium',   msg: 'Unusual outbound traffic — port 4444',        time: '32m ago', resolved: true  },
  { id: 4, sev: 'low',      msg: 'TLS certificate expiring in 7 days',          time: '1h ago',  resolved: true  },
]

const SEV_COLOR: Record<string, string> = {
  critical: 'text-ds-red    border-ds-red/30    bg-ds-red/10',
  high:     'text-ds-orange border-ds-orange/30 bg-ds-orange/10',
  medium:   'text-ds-yellow border-ds-yellow/30 bg-ds-yellow/10',
  low:      'text-ds-comment border-ds-current',
}

const SEV_BADGE: Record<string, 'red'|'orange'|'yellow'|'muted'> = {
  critical: 'red', high: 'orange', medium: 'yellow', low: 'muted',
}

export default function DashboardExamplePage() {
  const [tab, setTab] = useState('overview')

  return (
    <ExampleShell
      title="Dashboard"
      actions={
        <>
          <Button size="sm" variant="ghost" leftIcon={<Download className="h-3.5 w-3.5" />}>Export</Button>
          <Button size="sm" variant="neu-purple" leftIcon={<Plus className="h-3.5 w-3.5" />}>New Agent</Button>
        </>
      }
    >
      <div className="space-y-6 max-w-6xl">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ label, value, delta, up, color, icon: Icon }) => (
            <div key={label} className="bg-ds-panel border border-ds-current rounded-ds-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-ds-comment uppercase tracking-wider">{label}</span>
                <Icon className={cn('h-4 w-4', color)} />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-ds-fg tabular-nums">{value}</span>
                <span className={cn('flex items-center gap-0.5 text-[11px] font-mono mb-0.5', up ? 'text-ds-green' : 'text-ds-red')}>
                  {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="alerts">Alerts (2)</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
              <div className="lg:col-span-2 bg-ds-panel border border-ds-current rounded-ds-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-ds-fg">Threat Activity — 24h</h3>
                  <Badge variant="purple">live</Badge>
                </div>
                <DSAreaChart data={ACTIVITY_DATA} series={CHART_SERIES} xKey="name" height={200} />
              </div>

              <div className="bg-ds-panel border border-ds-current rounded-ds-xl p-4">
                <h3 className="text-sm font-semibold text-ds-fg mb-4">Agent Status</h3>
                <div className="space-y-3">
                  {AGENTS.slice(0, 4).map(a => (
                    <div key={a.id} className="flex items-center gap-2.5">
                      <StatusDot status={a.status} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-medium text-ds-fg truncate">{a.label}</div>
                        <div className="text-[10px] font-mono text-ds-comment">{a.tasks} task{a.tasks !== 1 ? 's' : ''}</div>
                      </div>
                      <Progress value={a.cpu} color={a.cpu > 70 ? 'orange' : 'purple'} size="sm" className="w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="agents">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {AGENTS.map(a => (
                <div key={a.id} className="bg-ds-panel border border-ds-current rounded-ds-xl p-4 space-y-3 hover:border-ds-purple/50 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <AgentBadge agentType={a.type} size="sm" />
                    <StatusDot status={a.status} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ds-fg group-hover:text-ds-purple transition-colors">{a.label}</div>
                    <div className="text-[11px] font-mono text-ds-comment mt-0.5">{a.id}</div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-ds-comment">
                      <span>CPU</span><span>{a.cpu}%</span>
                    </div>
                    <Progress
                      value={a.cpu}
                      color={a.cpu > 70 ? 'orange' : a.cpu > 40 ? 'cyan' : 'purple'}
                      size="sm"
                      variant={a.status === 'live' ? 'wave' : 'default'}
                    />
                  </div>
                  <StatusIndicator
                    status={a.status === 'live' ? 'running' : a.status === 'error' ? 'error' : 'idle'}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <div className="space-y-2 mt-4">
              {ALERTS.map(alert => (
                <div key={alert.id} className={cn(
                  'flex items-start gap-3 p-3.5 rounded-ds-lg border transition-opacity',
                  SEV_COLOR[alert.sev],
                  alert.resolved && 'opacity-40'
                )}>
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className={cn('text-[13px] font-medium', alert.resolved && 'line-through')}>{alert.msg}</div>
                    <div className="text-[11px] font-mono mt-0.5 opacity-70">{alert.time}</div>
                  </div>
                  <Badge variant={SEV_BADGE[alert.sev]}>{alert.sev}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ExampleShell>
  )
}
