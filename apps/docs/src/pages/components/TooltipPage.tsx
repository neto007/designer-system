import { Tooltip, TooltipTrigger, TooltipContent, Button } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@shieldai/ds'

// TooltipProvider is included in DocsLayout — wrap once at app root
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    Tooltip content
  </TooltipContent>
</Tooltip>

// All positions
<TooltipContent side="top">Top</TooltipContent>
<TooltipContent side="bottom">Bottom</TooltipContent>
<TooltipContent side="left">Left</TooltipContent>
<TooltipContent side="right">Right</TooltipContent>`

const PROPS = [
  { name: 'side', type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: 'Preferred position relative to trigger' },
  { name: 'sideOffset', type: 'number', default: '6', description: 'Distance in px from the trigger' },
  { name: 'delayDuration', type: 'number', default: '300', description: 'Delay in ms before tooltip shows (set on TooltipProvider)' },
]

const SIDES = ['top', 'bottom', 'left', 'right'] as const

export default function TooltipPage() {
  return (
    <ComponentBlock
      num="02.12"
      title="Tooltip"
      tag="Radix UI · 4 positions · portal"
      description="Hover tooltip built on Radix Tooltip with a portal to escape overflow. Slide-in animation is direction-aware. Wrap your app once with TooltipProvider."
      preview={
        <PreviewRow label="hover each button">
          {SIDES.map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">{side}</Button>
              </TooltipTrigger>
              <TooltipContent side={side}>
                Tooltip on {side}
              </TooltipContent>
            </Tooltip>
          ))}
        </PreviewRow>
      }
      code={CODE}
      filename="Tooltip.tsx"
      props={PROPS}
    />
  )
}
