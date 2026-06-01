import { useState } from 'react'
import { Button, CodeBlock, NeuCard, Badge } from '@shieldai/ds'
import { Download, Copy, Check, Package, FileCode, Palette } from 'lucide-react'

const INSTALL_CMD = `pnpm add @shieldai/ds`
const IMPORT_CMD = `// In your main entry point
import '@shieldai/ds'          // loads CSS tokens

// Use components
import { Button, Table, ChatMessage } from '@shieldai/ds'`

const TOKENS_PREVIEW = `:root {
  --ds-bg:      #050101;
  --ds-panel:   #0b0b11;
  --ds-purple:  #bd93f9;
  --ds-green:   #50fa7b;
  --ds-cyan:    #8be9fd;
  --ds-orange:  #ffb86c;
  --ds-red:     #ff5555;
  --ds-pink:    #ff79c6;
  /* ... 62 tokens total */
}`

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={copy}
      leftIcon={copied ? <Check className="h-3.5 w-3.5 text-ds-green" /> : <Copy className="h-3.5 w-3.5" />}
    >
      {copied ? 'Copied!' : label}
    </Button>
  )
}

const ASSETS = [
  {
    icon: <Package className="h-5 w-5" />,
    title: 'NPM Package',
    description: '@shieldai/ds — components, tokens, and TypeScript types',
    badge: 'v1.0.0',
    color: 'text-ds-purple',
    action: <CopyButton text="pnpm add @shieldai/ds" label="Copy install command" />,
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: 'tokens.css',
    description: 'Raw CSS custom properties — drop into any project',
    badge: '62 tokens',
    color: 'text-ds-cyan',
    action: <Button variant="outline" size="sm" leftIcon={<Download className="h-3.5 w-3.5" />} disabled>Download</Button>,
  },
  {
    icon: <FileCode className="h-5 w-5" />,
    title: 'Tailwind Preset',
    description: 'tailwind-preset.ts — plug into any Tailwind project',
    badge: 'TS',
    color: 'text-ds-green',
    action: <Button variant="outline" size="sm" leftIcon={<Download className="h-3.5 w-3.5" />} disabled>Download</Button>,
  },
]

export default function DownloadsPage() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">08.01</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Downloads</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Install via pnpm/npm, or download individual assets to use in any project.
        </p>
      </div>

      {/* Install */}
      <div className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Install</h2>
        <CodeBlock code={INSTALL_CMD} lang="bash" showLineNumbers={false} />
        <CodeBlock code={IMPORT_CMD} lang="tsx" />
      </div>

      {/* Assets */}
      <div className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Assets</h2>
        <div className="space-y-3">
          {ASSETS.map((asset) => (
            <NeuCard key={asset.title} className="p-4">
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 mt-0.5 ${asset.color}`}>{asset.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-ds-fg text-sm">{asset.title}</span>
                    <Badge variant="purple" className="text-[9px]">{asset.badge}</Badge>
                  </div>
                  <p className="text-xs text-ds-comment">{asset.description}</p>
                </div>
                <div className="flex-shrink-0">{asset.action}</div>
              </div>
            </NeuCard>
          ))}
        </div>
      </div>

      {/* Token preview */}
      <div className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Token preview</h2>
        <CodeBlock code={TOKENS_PREVIEW} lang="css" />
      </div>
    </div>
  )
}
