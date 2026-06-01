import { ColumnLayout, NeuCard } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { ColumnLayout } from '@shieldai/ds'

// 2 columns (default)
<ColumnLayout columns={2}>
  <Card>A</Card>
  <Card>B</Card>
</ColumnLayout>

// 3 columns with larger gap
<ColumnLayout columns={3} gap="lg">
  <Card>A</Card>
  <Card>B</Card>
  <Card>C</Card>
</ColumnLayout>

// 4 columns — collapses to 2 on sm, 1 on xs
<ColumnLayout columns={4} gap="sm">
  <Card>A</Card>
  <Card>B</Card>
  <Card>C</Card>
  <Card>D</Card>
</ColumnLayout>`

const PROPS = [
  { name: 'columns', type: '1 | 2 | 3 | 4', default: '2', description: 'Number of equal columns — auto-collapses on smaller breakpoints' },
  { name: 'gap', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Grid gap between cells — sm=8px md=16px lg=32px' },
  { name: 'children', type: 'ReactNode', default: '—', description: 'Column content — each direct child occupies one cell' },
  { name: 'className', type: 'string', default: '—', description: 'Additional classes' },
]

function Cell({ label, color = 'purple' }: { label: string; color?: string }) {
  return (
    <NeuCard className={`p-4 text-center text-ds-${color} text-sm font-mono`}>
      {label}
    </NeuCard>
  )
}

export default function ColumnLayoutPage() {
  return (
    <ComponentBlock
      num="02.P6"
      title="Column Layout"
      tag="1–4 cols · responsive collapse · gap variants"
      description="Responsive equal-column grid. 4-column layouts collapse to 2 on sm and 1 on xs. 3-column to 2 on sm. Use for dashboards, card grids, and form rows."
      preview={
        <div className="space-y-6 w-full">
          {([2, 3, 4] as const).map((cols) => (
            <div key={cols}>
              <div className="text-[10px] font-mono uppercase text-ds-comment mb-2">{cols} columns</div>
              <ColumnLayout columns={cols} gap="md">
                {Array.from({ length: cols }, (_, i) => (
                  <Cell key={i} label={String.fromCharCode(65 + i)} />
                ))}
              </ColumnLayout>
            </div>
          ))}
        </div>
      }
      code={CODE}
      filename="ColumnLayout.tsx"
      props={PROPS}
    />
  )
}
