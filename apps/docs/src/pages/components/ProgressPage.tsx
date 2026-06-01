import { Progress } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { Progress } from '@shieldai/ds'

<Progress value={75} color="purple" showLabel />
<Progress value={50} color="green"  showLabel />
<Progress value={30} color="cyan"   showLabel />
<Progress value={85} color="orange" showLabel />
<Progress value={20} color="red"    showLabel />

// Without label
<Progress value={60} color="purple" />`

const PROPS = [
  { name: 'value', type: 'number', required: true, description: 'Progress value 0–100' },
  { name: 'color', type: '"purple" | "green" | "cyan" | "orange" | "red"', default: '"purple"', description: 'Bar color and glow' },
  { name: 'showLabel', type: 'boolean', default: 'false', description: 'Shows percentage label above the bar' },
  { name: 'max', type: 'number', default: '100', description: 'Maximum value for aria-valuemax' },
]

export default function ProgressPage() {
  return (
    <ComponentBlock
      num="02.08"
      title="Progress"
      tag="5 glow colors · Radix · accessible"
      description="Accessible progress bar built on Radix Progress. Each color variant applies a matching neon glow to the indicator."
      preview={
        <div className="space-y-4 max-w-sm w-full">
          <Progress value={75} color="purple" showLabel />
          <Progress value={50} color="green"  showLabel />
          <Progress value={30} color="cyan"   showLabel />
          <Progress value={85} color="orange" showLabel />
          <Progress value={20} color="red"    showLabel />
        </div>
      }
      code={CODE}
      filename="Progress.tsx"
      props={PROPS}
    />
  )
}
