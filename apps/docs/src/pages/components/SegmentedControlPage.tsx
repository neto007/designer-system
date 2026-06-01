import { SegmentedControl } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { SegmentedControl } from '@shieldai/ds'

<SegmentedControl
  defaultValue="preview"
  items={[
    { value: 'preview', label: 'Preview' },
    { value: 'code',    label: 'Code' },
    { value: 'props',   label: 'Props' },
  ]}
/>

// Small size
<SegmentedControl
  size="sm"
  defaultValue="day"
  items={[
    { value: 'day',   label: '24h' },
    { value: 'week',  label: '7d' },
    { value: 'month', label: '30d' },
  ]}
/>`

const PROPS = [
  { name: 'items', type: 'SegmentItem[]', required: true, description: 'Segment options with value and label' },
  { name: 'value', type: 'string', description: 'Controlled active segment' },
  { name: 'defaultValue', type: 'string', description: 'Initial active segment (uncontrolled)' },
  { name: 'onValueChange', type: '(value: string) => void', description: 'Called when selection changes' },
  { name: 'size', type: '"sm" | "md"', default: '"md"', description: 'Segment size' },
]

export default function SegmentedControlPage() {
  return (
    <ComponentBlock
      num="02.22"
      title="Segmented Control"
      tag="Radix ToggleGroup · 2 sizes"
      description="Mutually exclusive button group for switching views. Active segment gets a purple fill. Built on Radix ToggleGroup."
      preview={
        <div className="space-y-4">
          <PreviewRow label="medium">
            <SegmentedControl
              defaultValue="preview"
              items={[
                { value: 'preview', label: 'Preview' },
                { value: 'code', label: 'Code' },
                { value: 'props', label: 'Props' },
              ]}
            />
          </PreviewRow>
          <PreviewRow label="small · time range">
            <SegmentedControl
              size="sm"
              defaultValue="week"
              items={[
                { value: 'day', label: '24h' },
                { value: 'week', label: '7d' },
                { value: 'month', label: '30d' },
                { value: 'year', label: '1y' },
              ]}
            />
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="SegmentedControl.tsx"
      props={PROPS}
    />
  )
}
