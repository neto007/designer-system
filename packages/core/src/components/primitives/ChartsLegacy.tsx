/* eslint-disable @typescript-eslint/no-explicit-any */
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts'
import { cn } from '../../lib/cn'
import { CHART_COLORS } from './Charts'
import type { ChartColor } from './Charts'

// ─── Sparkline ────────────────────────────────────────────────────────────────

export interface SparklineProps {
  data: number[]
  color?: ChartColor
  height?: number
  showDot?: boolean
  className?: string
}

export function Sparkline({
  data,
  color = 'purple',
  height = 40,
  showDot = true,
  className,
}: SparklineProps) {
  const hex = CHART_COLORS[color]
  const chartData = data.map((v, i) => ({ i, v }))

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Tooltip
            content={({ active, payload }: any) =>
              active && payload?.length ? (
                <div className="bg-ds-panel border border-ds-current rounded px-2 py-1 text-xs font-mono" style={{ color: hex }}>
                  {payload[0].value}
                </div>
              ) : null
            }
          />
          <Line
            type="monotone"
            dataKey="v"
            stroke={hex}
            strokeWidth={1.5}
            dot={false}
            activeDot={showDot ? { r: 3, fill: hex, strokeWidth: 0 } : false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── MiniBarChart ─────────────────────────────────────────────────────────────

export interface MiniBarChartProps {
  data: number[]
  color?: ChartColor
  height?: number
  className?: string
}

export function MiniBarChart({
  data,
  color = 'cyan',
  height = 40,
  className,
}: MiniBarChartProps) {
  const hex = CHART_COLORS[color]
  const chartData = data.map((v, i) => ({ i, v }))

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barCategoryGap="20%">
          <Tooltip
            content={({ active, payload }: any) =>
              active && payload?.length ? (
                <div className="bg-ds-panel border border-ds-current rounded px-2 py-1 text-xs font-mono" style={{ color: hex }}>
                  {payload[0].value}
                </div>
              ) : null
            }
            cursor={{ fill: 'rgba(98,114,164,.1)' }}
          />
          <Bar dataKey="v" fill={hex} radius={[2, 2, 0, 0]} maxBarSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

export interface StatCardProps {
  label: string
  value: string | number
  delta?: string
  deltaPositive?: boolean
  sparkline?: number[]
  sparklineColor?: ChartColor
  className?: string
}

export function StatCard({
  label,
  value,
  delta,
  deltaPositive,
  sparkline,
  sparklineColor = 'purple',
  className,
}: StatCardProps) {
  return (
    <div className={cn(
      'bg-ds-panel border border-ds-current rounded-ds-lg p-4 space-y-2',
      className
    )}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">{label}</p>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-2xl font-black text-ds-fg leading-none">{value}</p>
          {delta && (
            <p className={cn(
              'text-[11px] font-mono mt-1',
              deltaPositive ? 'text-ds-green' : 'text-ds-red'
            )}>
              {deltaPositive ? '↑' : '↓'} {delta}
            </p>
          )}
        </div>
        {sparkline && (
          <div className="flex-1 max-w-[80px]">
            <Sparkline data={sparkline} color={sparklineColor} height={36} showDot={false} />
          </div>
        )}
      </div>
    </div>
  )
}
