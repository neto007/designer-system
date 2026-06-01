import { SplitPanel } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { SplitPanel } from '@shieldai/ds'

// Horizontal (left|right) — default
<SplitPanel
  defaultSplit={40}
  first={<FileTree />}
  second={<Editor />}
/>

// Vertical (top|bottom)
<SplitPanel
  direction="vertical"
  defaultSplit={60}
  minFirst={20}
  minSecond={15}
  first={<Results />}
  second={<Console />}
/>`

const PROPS = [
  { name: 'first', type: 'ReactNode', default: '—', description: 'Content for the first pane' },
  { name: 'second', type: 'ReactNode', default: '—', description: 'Content for the second pane' },
  { name: 'direction', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Split axis' },
  { name: 'defaultSplit', type: 'number', default: '50', description: 'Initial first-pane percentage (0–100)' },
  { name: 'minFirst', type: 'number', default: '20', description: 'Minimum percentage for the first pane' },
  { name: 'minSecond', type: 'number', default: '20', description: 'Minimum percentage for the second pane' },
]

function Pane({ label, color }: { label: string; color: string }) {
  return (
    <div className={`h-full flex items-center justify-center text-sm font-mono text-${color} bg-ds-bg p-4`}>
      {label}
    </div>
  )
}

export default function SplitPanelPage() {
  return (
    <ComponentBlock
      num="03.SP"
      title="Split Panel"
      tag="horizontal · vertical · drag handle · min sizes"
      description="Resizable two-pane layout. Drag the divider to resize. minFirst and minSecond prevent panes from collapsing below a percentage threshold. Works in both horizontal and vertical orientations."
      preview={
        <div className="space-y-4 w-full">
          <div>
            <div className="text-[10px] font-mono uppercase text-ds-comment mb-2">horizontal (drag divider)</div>
            <div className="border border-ds-current rounded-ds-xl overflow-hidden" style={{ height: 180 }}>
              <SplitPanel
                defaultSplit={35}
                first={<Pane label="File tree" color="ds-purple" />}
                second={<Pane label="Editor" color="ds-green" />}
              />
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-ds-comment mb-2">vertical</div>
            <div className="border border-ds-current rounded-ds-xl overflow-hidden" style={{ height: 200 }}>
              <SplitPanel
                direction="vertical"
                defaultSplit={65}
                first={<Pane label="Results" color="ds-cyan" />}
                second={<Pane label="Console" color="ds-orange" />}
              />
            </div>
          </div>
        </div>
      }
      code={CODE}
      filename="SplitPanel.tsx"
      props={PROPS}
    />
  )
}
