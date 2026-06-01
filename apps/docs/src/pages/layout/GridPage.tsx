import { Grid, GridItem, NeuCard } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { Grid, GridItem } from '@shieldai/ds'

// 12-column base grid
<Grid cols={12} gap="md">
  <GridItem span={6}><Card>Half</Card></GridItem>
  <GridItem span={3}><Card>Quarter</Card></GridItem>
  <GridItem span={3}><Card>Quarter</Card></GridItem>
</Grid>

// Responsive spans
<Grid cols={12} gap="lg">
  <GridItem span={12} spanSm={6} spanLg={4}>
    <Card />
  </GridItem>
  <GridItem span={12} spanSm={6} spanLg={4}>
    <Card />
  </GridItem>
  <GridItem span={12} spanLg={4}>
    <Card />
  </GridItem>
</Grid>

// Simple even columns
<Grid cols={3} gap="sm">
  <Card /><Card /><Card />
</Grid>`

const PROPS_GRID = [
  { name: 'cols', type: '1 | 2 | 3 | 4 | 6 | 12', default: '12', description: 'Number of equal columns' },
  { name: 'gap', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Gap between cells' },
]

const PROPS_ITEM = [
  { name: 'span', type: '1|2|3|4|6|8|12', default: '—', description: 'Column span at the default breakpoint' },
  { name: 'spanSm', type: '1|2|3|4|6|12', default: '—', description: 'Column span at the sm breakpoint' },
  { name: 'spanLg', type: '1|2|3|4|6|8|12', default: '—', description: 'Column span at the lg breakpoint' },
]

function Cell({ label, color = 'ds-purple' }: { label: string; color?: string }) {
  return (
    <NeuCard className={`p-3 text-center text-xs font-mono text-${color}`}>
      {label}
    </NeuCard>
  )
}

export default function GridPage() {
  return (
    <ComponentBlock
      num="03.G"
      title="Grid"
      tag="12-col · responsive spans · 5 gap sizes"
      description="12-column CSS grid with responsive GridItem spans. Use span for default, spanSm for ≥640px, spanLg for ≥1024px. Combine with ColumnLayout for simple equal-column layouts."
      preview={
        <div className="space-y-6 w-full">
          <div>
            <div className="text-[10px] font-mono uppercase text-ds-comment mb-2">12 cols — 6+3+3</div>
            <Grid cols={12} gap="sm">
              <GridItem span={6}><Cell label="span 6" /></GridItem>
              <GridItem span={3}><Cell label="span 3" color="ds-green" /></GridItem>
              <GridItem span={3}><Cell label="span 3" color="ds-green" /></GridItem>
            </Grid>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-ds-comment mb-2">12 cols — 4+4+4 / 8+4</div>
            <Grid cols={12} gap="sm">
              <GridItem span={4}><Cell label="span 4" color="ds-cyan" /></GridItem>
              <GridItem span={4}><Cell label="span 4" color="ds-cyan" /></GridItem>
              <GridItem span={4}><Cell label="span 4" color="ds-cyan" /></GridItem>
              <GridItem span={8}><Cell label="span 8" color="ds-pink" /></GridItem>
              <GridItem span={4}><Cell label="span 4" color="ds-pink" /></GridItem>
            </Grid>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-ds-comment mb-2">simple 3-col grid</div>
            <Grid cols={3} gap="md">
              {['A', 'B', 'C'].map((l) => <Cell key={l} label={l} color="ds-yellow" />)}
            </Grid>
          </div>
        </div>
      }
      code={CODE}
      filename="Grid.tsx"
      props={[...PROPS_GRID, ...PROPS_ITEM]}
    />
  )
}
