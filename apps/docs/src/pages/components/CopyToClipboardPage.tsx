import { CopyToClipboard } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { CopyToClipboard } from '@shieldai/ds'

// Icon button (default) — used inside toolbars
<CopyToClipboard value="npm install @shieldai/ds" />

// Button variant — standalone copy trigger
<CopyToClipboard value="npm install @shieldai/ds" variant="button">
  npm install @shieldai/ds
</CopyToClipboard>

// Inline — wraps code snippets
<CopyToClipboard value="agt_01j9z" variant="inline">
  agt_01j9z
</CopyToClipboard>`

const PROPS = [
  { name: 'value', type: 'string', required: true, description: 'Text copied to clipboard on click' },
  { name: 'variant', type: '"icon" | "button" | "inline"', default: '"icon"', description: 'Visual presentation style' },
  { name: 'children', type: 'ReactNode', description: 'Label for button/inline variants (defaults to value)' },
]

export default function CopyToClipboardPage() {
  return (
    <ComponentBlock
      num="02.31"
      title="Copy to Clipboard"
      tag="3 variants · check confirm · 2s reset"
      description="One-click copy with a 2-second check-icon confirmation. Three variants for different contexts — icon for toolbars, button for standalone, inline for code snippets."
      preview={
        <div className="space-y-4 w-full">
          <PreviewRow label="icon (toolbar use)">
            <CopyToClipboard value="npm install @shieldai/ds" />
            <CopyToClipboard value="agt_01j9z4xk" />
          </PreviewRow>
          <PreviewRow label="button variant">
            <CopyToClipboard value="npm install @shieldai/ds" variant="button">
              npm install @shieldai/ds
            </CopyToClipboard>
            <CopyToClipboard value="pnpm add @shieldai/ds" variant="button">
              pnpm add @shieldai/ds
            </CopyToClipboard>
          </PreviewRow>
          <PreviewRow label="inline variant">
            <CopyToClipboard value="agt_01j9z4xk" variant="inline">agt_01j9z4xk</CopyToClipboard>
            <CopyToClipboard value="bd93f9" variant="inline">#bd93f9</CopyToClipboard>
          </PreviewRow>
        </div>
      }
      code={CODE}
      filename="CopyToClipboard.tsx"
      props={PROPS}
    />
  )
}
