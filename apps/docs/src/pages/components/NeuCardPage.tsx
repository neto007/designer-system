import { NeuCard } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { NeuCard } from '@shieldai/ds'

<NeuCard variant="default">
  <p className="font-mono text-[10px] text-ds-comment">variant</p>
  <p className="font-black text-ds-fg">default</p>
</NeuCard>

<NeuCard variant="purple">Purple</NeuCard>
<NeuCard variant="green">Green</NeuCard>
<NeuCard variant="pink">Pink</NeuCard>
<NeuCard variant="red">Red</NeuCard>
<NeuCard variant="cyan">Cyan</NeuCard>
<NeuCard variant="orange">Orange</NeuCard>

// Polymorphic — renders as any element
<NeuCard as="button" variant="purple" onClick={handleClick}>
  Clickable card
</NeuCard>`

const PROPS = [
  { name: 'variant', type: '"default" | "purple" | "green" | "pink" | "red" | "cyan" | "orange"', default: '"default"', description: 'Color accent and shadow color' },
  { name: 'as', type: 'ElementType', default: '"div"', description: 'Renders as any HTML element or component' },
]

const VARIANTS = ['default', 'purple', 'green', 'pink', 'red', 'cyan', 'orange'] as const

export default function NeuCardPage() {
  return (
    <ComponentBlock
      num="02.04"
      title="NeuCard"
      tag="7 color variants · polymorphic"
      description="Neobrutalism card with offset shadow and thick border. Color variant controls both the border accent and the glow shadow. Polymorphic via the `as` prop."
      preview={
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
          {VARIANTS.map((v) => (
            <NeuCard key={v} variant={v}>
              <p className="font-mono text-[9px] uppercase tracking-widest text-ds-comment mb-1">variant</p>
              <p className="font-black text-ds-fg text-sm">{v}</p>
            </NeuCard>
          ))}
        </div>
      }
      code={CODE}
      filename="NeuCard.tsx"
      props={PROPS}
    />
  )
}
