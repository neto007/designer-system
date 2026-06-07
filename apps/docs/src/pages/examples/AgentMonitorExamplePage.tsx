import { useState } from 'react'
import { Play, Square, RefreshCw, Terminal, Cpu, Clock } from 'lucide-react'
import {
  Button, StatusDot, AgentBadge, Progress, AgentExecutionView,
  JSONViewer, Tabs, TabsList, TabsTrigger, TabsContent,
} from '@shieldai/ds'
import { cn } from '@shieldai/ds'
import { ExampleShell } from './ExampleShell'

const AGENTS = [
  { id: 'llm-01',  type: 'llm'        as const, label: 'GPT-4 Analyst',   status: 'live'  as const, model: 'gpt-4-turbo', cpu: 72, mem: 2.1, uptime: '2h 14m', tokens: '48,291' },
  { id: 'seq-01',  type: 'sequential' as const, label: 'Network Scanner', status: 'live'  as const, model: 'nmap/masscan', cpu: 45, mem: 0.8, uptime: '5h 32m', tokens: '—'     },
  { id: 'wf-01',   type: 'workflow'   as const, label: 'Threat Pipeline', status: 'live'  as const, model: 'internal',    cpu: 31, mem: 1.2, uptime: '1h 05m', tokens: '12,440' },
  { id: 'par-01',  type: 'parallel'   as const, label: 'Log Correlator',  status: 'idle'  as const, model: 'internal',    cpu: 3,  mem: 0.4, uptime: '8h 00m', tokens: '—'     },
  { id: 'task-01', type: 'task'       as const, label: 'IOC Extractor',   status: 'error' as const, model: 'gpt-3.5',     cpu: 0,  mem: 0,   uptime: '—',      tokens: '—'     },
]

const EXECUTION_STEPS = [
  {
    id: 's1', label: 'Search threat database', status: 'success' as const, durationMs: 210,
    toolCalls: [{ name: 'search_threat_db', status: 'success' as const, input: { query: 'CVE-2024-1234', scope: 'global' }, output: 'Found 3 matches — severity: critical' }],
  },
  {
    id: 's2', label: 'Analyze IOCs with LLM', status: 'success' as const, durationMs: 1840,
    log: 'Analysis complete. Verdict: HIGH_RISK (confidence: 0.94). Recommendations: isolate_host, rotate_credentials.',
  },
  {
    id: 's3', label: 'Create incident report', status: 'running' as const,
    toolCalls: [{ name: 'create_incident', status: 'running' as const, input: { severity: 'critical', auto_assign: true } }],
  },
]

const LOG_LINES = [
  { t: '21:14:03', lvl: 'INFO',  msg: '[llm-01] Starting threat analysis run #4821' },
  { t: '21:14:04', lvl: 'INFO',  msg: '[seq-01] Scanning subnet 10.0.1.0/24 — 254 hosts' },
  { t: '21:14:07', lvl: 'WARN',  msg: '[llm-01] High token usage: 48k/128k limit' },
  { t: '21:14:11', lvl: 'ERROR', msg: '[task-01] IOC extraction failed: rate limit exceeded' },
  { t: '21:14:12', lvl: 'INFO',  msg: '[wf-01] Pipeline step 3/5 complete' },
  { t: '21:14:15', lvl: 'INFO',  msg: '[seq-01] 3 open ports detected on 10.0.1.45' },
  { t: '21:14:18', lvl: 'WARN',  msg: '[llm-01] Anomaly: unusual lateral movement pattern' },
  { t: '21:14:20', lvl: 'INFO',  msg: '[wf-01] Triggering incident creation workflow' },
]

const LOG_COLOR: Record<string, string> = {
  INFO: 'text-ds-comment', WARN: 'text-ds-yellow', ERROR: 'text-ds-red',
}

export default function AgentMonitorExamplePage() {
  const [selected, setSelected] = useState(AGENTS[0])
  const [tab, setTab]           = useState('execution')

  return (
    <ExampleShell
      title="Agent Monitor"
      actions={
        <>
          <Button size="sm" variant="ghost" leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>Refresh</Button>
          <Button size="sm" variant="neu-green" leftIcon={<Play className="h-3.5 w-3.5" />}>Run All</Button>
        </>
      }
    >
      <div className="flex gap-4 max-w-6xl" style={{ minHeight: 'calc(100vh - 180px)' }}>

        {/* Agent list */}
        <div className="w-72 flex-shrink-0 space-y-2">
          {AGENTS.map(agent => (
            <button key={agent.id} onClick={() => setSelected(agent)}
              className={cn(
                'w-full text-left p-3.5 rounded-ds-xl border transition-all duration-[150ms]',
                selected.id === agent.id
                  ? 'border-ds-purple bg-ds-purple/10 shadow-glow'
                  : 'border-ds-current bg-ds-panel hover:border-ds-purple/40'
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <AgentBadge agentType={agent.type} size="sm" />
                <StatusDot status={agent.status} />
              </div>
              <div className="text-[13px] font-semibold text-ds-fg mb-0.5">{agent.label}</div>
              <div className="text-[10px] font-mono text-ds-comment">{agent.id}</div>
              {agent.status === 'live' && (
                <div className="mt-2.5 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-ds-comment">
                    <span>CPU</span><span>{agent.cpu}%</span>
                  </div>
                  <Progress value={agent.cpu} color={agent.cpu > 70 ? 'orange' : 'purple'} size="sm" variant="wave" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="bg-ds-panel border border-ds-current rounded-ds-xl p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <AgentBadge agentType={selected.type} />
                <div>
                  <h2 className="text-base font-bold text-ds-fg">{selected.label}</h2>
                  <span className="text-[11px] font-mono text-ds-comment">{selected.id} · {selected.model}</span>
                </div>
                <StatusDot status={selected.status} label={selected.status} />
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" leftIcon={<Square className="h-3.5 w-3.5" />}>Stop</Button>
                <Button size="sm" variant="ghost" leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>Restart</Button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[
                { icon: Cpu,     label: 'CPU',    value: `${selected.cpu}%`    },
                { icon: Terminal,label: 'Memory', value: `${selected.mem} GB`  },
                { icon: Clock,   label: 'Uptime', value: selected.uptime       },
                { icon: Terminal,label: 'Tokens', value: selected.tokens       },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <Icon className="h-4 w-4 text-ds-comment mx-auto mb-1" />
                  <div className="text-[10px] font-mono text-ds-comment">{label}</div>
                  <div className="text-sm font-bold text-ds-fg tabular-nums">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="execution">Execution</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>

            <TabsContent value="execution" className="mt-3">
              <div className="bg-ds-panel border border-ds-current rounded-ds-xl overflow-hidden">
                <AgentExecutionView steps={EXECUTION_STEPS} defaultExpanded />
              </div>
            </TabsContent>

            <TabsContent value="logs" className="mt-3">
              <div className="bg-ds-panel border border-ds-current rounded-ds-xl p-4 font-mono text-xs space-y-1.5 overflow-y-auto max-h-[320px]">
                {LOG_LINES.map((l, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-ds-comment flex-shrink-0">{l.t}</span>
                    <span className={cn('flex-shrink-0 w-12', LOG_COLOR[l.lvl])}>[{l.lvl}]</span>
                    <span className="text-ds-fg/80">{l.msg}</span>
                  </div>
                ))}
                <div className="flex gap-3 animate-pulse">
                  <span className="text-ds-comment">21:14:22</span>
                  <span className="text-ds-cyan w-12">[INFO] </span>
                  <span className="text-ds-fg/80">█</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="output" className="mt-3">
              <div className="bg-ds-panel border border-ds-current rounded-ds-xl p-4">
                <JSONViewer data={{
                  agent_id: selected.id,
                  run_id: 'run_4821',
                  status: selected.status,
                  result: { verdict: 'HIGH_RISK', confidence: 0.94, iocs_found: 7 },
                  metrics: { total_tokens: 48291, latency_ms: 2050 },
                }} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ExampleShell>
  )
}
