import { Box } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Box } from '@shieldai/ds'

// Variants
<Box variant="panel">Panel</Box>
<Box variant="neu">Neu</Box>
<Box variant="neu-purple">Purple neu</Box>
<Box variant="neu-green">Green neu</Box>

// Padding
<Box padding="sm">Small padding</Box>
<Box padding="md">Medium padding</Box>
<Box padding="lg">Large padding</Box>

// Rounded
<Box rounded="sm">Small radius</Box>
<Box rounded="lg">Large radius</Box>

// Polymorphic
<Box as="section" variant="panel">section element</Box>
<Box as="article" variant="neu-cyan">article element</Box>`

const PROPS = [
  { name: 'variant', type: '"none" | "panel" | "neu" | "neu-purple" | "neu-green" | "neu-pink" | "neu-cyan"', default: '"none"', description: 'Background and border style' },
  { name: 'padding', type: '"none" | "sm" | "md" | "lg"', default: '"md"', description: 'Inner padding' },
  { name: 'rounded', type: '"none" | "sm" | "md" | "lg"', default: '"md"', description: 'Border radius' },
  { name: 'as', type: 'ElementType', default: '"div"', description: 'Polymorphic element override' },
  { name: 'className', type: 'string', default: '—', description: 'Additional classes' },
]

export default function BoxPage() {
  return (
    <ComponentBlock
      num="02.P1"
      title="Box"
      tag="polymorphic · 6 variants · padding · radius"
      description="Primitive container with CVA variants for background, border, padding, and radius. Polymorphic via the as prop."
      preview={
        <div className="space-y-4 w-full">
          <PreviewRow label="variants">
            <Box variant="panel" padding="sm" className="text-ds-fg text-xs">panel</Box>
            <Box variant="neu" padding="sm" className="text-ds-fg text-xs">neu</Box>
            <Box variant="neu-purple" padding="sm" className="text-ds-purple text-xs">neu-purple</Box>
            <Box variant="neu-green" padding="sm" className="text-ds-green text-xs">neu-green</Box>
            <Box variant="neu-pink" padding="sm" className="text-ds-pink text-xs">neu-pink</Box>
            <Box variant="neu-cyan" padding="sm" className="text-ds-cyan text-xs">neu-cyan</Box>
          </PreviewRow>
          <PreviewRow label="padding">
            <Box variant="panel" padding="sm" className="text-ds-fg text-xs">sm</Box>
            <Box variant="panel" padding="md" className="text-ds-fg text-xs">md</Box>
            <Box variant="panel" padding="lg" className="text-ds-fg text-xs">lg</Box>
          </PreviewRow>
          <PreviewRow label="rounded">
            <Box variant="panel" rounded="none" padding="sm" className="text-ds-fg text-xs">none</Box>
            <Box variant="panel" rounded="sm" padding="sm" className="text-ds-fg text-xs">sm</Box>
            <Box variant="panel" rounded="md" padding="sm" className="text-ds-fg text-xs">md</Box>
            <Box variant="panel" rounded="lg" padding="sm" className="text-ds-fg text-xs">lg</Box>
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="Box.tsx"
      props={PROPS}
    />
  )
}
