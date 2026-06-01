import { Link } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Link } from '@shieldai/ds'

// Variants
<Link href="#">Inline link</Link>
<Link href="#" variant="nav">Nav link</Link>
<Link href="https://example.com" variant="external">External link</Link>

// Disabled
<Link href="#" disabled>Disabled link</Link>`

const PROPS = [
  { name: 'variant', type: '"inline" | "nav" | "external"', default: '"inline"', description: 'Link style — inline adds underline, nav is unstyled but gains purple on hover, external auto-adds icon and target="_blank"' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction via aria-disabled and pointer-events-none' },
  { name: 'href', type: 'string', default: '—', description: 'Anchor href' },
  { name: 'className', type: 'string', default: '—', description: 'Additional classes' },
]

export default function LinkPage() {
  return (
    <ComponentBlock
      num="02.P2"
      title="Link"
      tag="inline · nav · external · disabled"
      description="Accessible anchor element with inline, nav, and external variants. External links automatically receive rel=noopener noreferrer and an icon."
      preview={
        <div className="space-y-4 w-full">
          <PreviewRow label="variants">
            <Link href="#">Inline link</Link>
            <Link href="#" variant="nav">Nav link</Link>
            <Link href="https://example.com" variant="external">External link</Link>
          </PreviewRow>
          <PreviewRow label="disabled">
            <Link href="#" disabled>Disabled link</Link>
            <Link href="#" variant="nav" disabled>Disabled nav</Link>
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="Link.tsx"
      props={PROPS}
    />
  )
}
