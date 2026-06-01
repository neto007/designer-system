import { Spinner } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Spinner } from '@shieldai/ds'

// Sizes
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />

// Colors
<Spinner color="purple" />
<Spinner color="green" />
<Spinner color="cyan" />
<Spinner color="orange" />
<Spinner color="red" />

// With label
<Spinner label="Loading agents..." />`

const PROPS = [
  { name: 'size', type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Spinner diameter' },
  { name: 'color', type: '"default" | "purple" | "green" | "cyan" | "orange" | "red" | "muted"', default: '"default"', description: 'Spinner color' },
  { name: 'label', type: 'string', default: '"Loading..."', description: 'Accessible label (aria-label). When non-default, also renders as visible text.' },
]

export default function SpinnerPage() {
  return (
    <ComponentBlock
      num="02.17"
      title="Spinner"
      tag="7 colors · 4 sizes · aria-label"
      description="CSS border-based spinner. Accessible via role='status' and aria-label. Color uses the signal palette."
      preview={
        <div className="space-y-4 w-full">
          <PreviewRow label="sizes">
            <Spinner size="sm" color="purple" />
            <Spinner size="md" color="purple" />
            <Spinner size="lg" color="purple" />
            <Spinner size="xl" color="purple" />
          </PreviewRow>
          <PreviewRow label="colors">
            <Spinner color="default" />
            <Spinner color="purple" />
            <Spinner color="green" />
            <Spinner color="cyan" />
            <Spinner color="orange" />
            <Spinner color="red" />
          </PreviewRow>
          <PreviewRow label="with label">
            <Spinner color="purple" label="Loading agents..." />
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="Spinner.tsx"
      props={PROPS}
    />
  )
}
