import {
  LineChart, Line,
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '../../lib/cn'

// ─── Tokens ──────────────────────────────────────────────────────────────────

export const CHART_COLORS = {
  purple: '#bd93f9',
  green:  '#50fa7b',
  pink:   '#ff79c6',
  cyan:   '#8be9fd',
  orange: '#ffb86c',
  yellow: '#f1fa8c',
  red:    '#ff5555',
} as const

export type ChartColor = keyof typeof CHART_COLORS

// ─── Shared tooltip ───────────────────────────────────────────────────────────

function DSTooltip(props: any) {
  const { active, payload, label } = props as { active: boolean; payload: any[]; label?: string }
  if (!active || !payload?.length) return null
  return (
    <div className="bg-ds-panel border border-ds-current rounded-ds-md px-3 py-2 text-xs shadow-lg">
      {label !== undefined && <p className="text-ds-comment font-mono mb-1">{label}</p>}
      {payload.map((entry: any, i: number) => (
        <p key={i} className="font-semibold" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  )
}

// ─── DSLineChart ─────────────────────────────────────────────────────────────

export interface ChartSeries {
  key: string
  label?: string
  color?: ChartColor
}

export interface DSLineChartProps {
  data: Record<string, string | number>[]
  series: ChartSeries[]
  xKey?: string
  height?: number
  grid?: boolean
  className?: string
}

export function DSLineChart({
  data, series, xKey = 'x', height = 200, grid = true, className,
}: DSLineChartProps) {
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
          {grid && <CartesianGrid stroke="rgba(98,114,164,.15)" strokeDasharray="4 2" />}
          <XAxis dataKey={xKey} tick={{ fill: '#6272a4', fontSize: 10, fontFamily: 'inherit' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6272a4', fontSize: 10, fontFamily: 'inherit' }} axisLine={false} tickLine={false} />
          <Tooltip content={(p) => <DSTooltip {...p} />} />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={CHART_COLORS[s.color ?? 'purple']}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: CHART_COLORS[s.color ?? 'purple'] }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── DSAreaChart ─────────────────────────────────────────────────────────────

export function DSAreaChart({
  data, series, xKey = 'x', height = 200, grid = true, className,
}: DSLineChartProps) {
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
          <defs>
            {series.map((s) => {
              const hex = CHART_COLORS[s.color ?? 'purple']
              return (
                <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={hex} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={hex} stopOpacity={0} />
                </linearGradient>
              )
            })}
          </defs>
          {grid && <CartesianGrid stroke="rgba(98,114,164,.15)" strokeDasharray="4 2" />}
          <XAxis dataKey={xKey} tick={{ fill: '#6272a4', fontSize: 10, fontFamily: 'inherit' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6272a4', fontSize: 10, fontFamily: 'inherit' }} axisLine={false} tickLine={false} />
          <Tooltip content={(p) => <DSTooltip {...p} />} />
          {series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={CHART_COLORS[s.color ?? 'purple']}
              strokeWidth={2}
              fill={`url(#grad-${s.key})`}
              dot={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── DSBarChart ──────────────────────────────────────────────────────────────

export function DSBarChart({
  data, series, xKey = 'x', height = 200, grid = true, className,
}: DSLineChartProps) {
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
          {grid && <CartesianGrid stroke="rgba(98,114,164,.15)" strokeDasharray="4 2" vertical={false} />}
          <XAxis dataKey={xKey} tick={{ fill: '#6272a4', fontSize: 10, fontFamily: 'inherit' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6272a4', fontSize: 10, fontFamily: 'inherit' }} axisLine={false} tickLine={false} />
          <Tooltip content={<DSTooltip />} cursor={{ fill: 'rgba(98,114,164,.1)' }} />
          {series.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label ?? s.key}
              fill={CHART_COLORS[s.color ?? 'purple']}
              radius={[3, 3, 0, 0]}
              maxBarSize={40}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
