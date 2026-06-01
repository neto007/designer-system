import { useState } from 'react'
import { Token, TokenGroup } from '@shieldai/ds'
import type { TokenType } from '@shieldai/ds'
import { ComponentBlock, PreviewRow } from '../../components/docs'

const CODE = `import { Token, TokenGroup } from '@shieldai/ds'

// Token — pill chip
<Token label="ml-agent" variant="purple" />
<Token label="scanner" variant="green" onDismiss={() => {}} />

// TokenGroup — labelled list with collapse
<TokenGroup
  label="Active filters"
  tokens={[
    { label: 'threat-level:critical', value: 'threat-critical', variant: 'red' },
    { label: 'region:us-east-1',      value: 'region-us',       variant: 'cyan' },
    { label: 'status:live',           value: 'status-live',     variant: 'green' },
  ]}
  onDismiss={(value) => console.log('removed', value)}
  maxVisible={3}
/>`

const PROPS_TOKEN = [
  { name: 'label', type: 'string', default: '—', description: 'Text inside the token' },
  { name: 'variant', type: '"purple" | "green" | "cyan" | "pink" | "orange" | "yellow" | "red"', default: '"purple"', description: 'Color palette applied to border and background' },
  { name: 'onDismiss', type: '() => void', default: '—', description: 'When provided, renders an × button' },
  { name: 'className', type: 'string', default: '—', description: 'Additional classes' },
]

const PROPS_GROUP = [
  { name: 'tokens', type: 'TokenType[]', default: '—', description: 'Array of { label, value, variant? } objects' },
  { name: 'label', type: 'string', default: '—', description: 'Label shown above the token list' },
  { name: 'onDismiss', type: '(value: string) => void', default: '—', description: 'Called with the token value when × is clicked, or all values joined when "Dismiss all" is clicked' },
  { name: 'maxVisible', type: 'number', default: '5', description: 'Tokens beyond this count are hidden behind a "+N more" button' },
]

const INITIAL_TOKENS: TokenType[] = [
  { label: 'threat-level:critical', value: 'threat-critical', variant: 'red' },
  { label: 'region:us-east-1',      value: 'region-us',       variant: 'cyan' },
  { label: 'status:live',           value: 'status-live',     variant: 'green' },
  { label: 'agent-type:scanner',    value: 'type-scanner',    variant: 'purple' },
  { label: 'priority:high',         value: 'priority-high',   variant: 'orange' },
  { label: 'owner:team-alpha',      value: 'owner-alpha',     variant: 'pink' },
  { label: 'env:production',        value: 'env-prod',        variant: 'yellow' },
]

function LiveDemo() {
  const [tokens, setTokens] = useState<TokenType[]>(INITIAL_TOKENS)
  const dismiss = (value: string) => {
    if (value.includes(',')) {
      setTokens([])
    } else {
      setTokens((prev) => prev.filter((t) => t.value !== value))
    }
  }
  return (
    <div className="space-y-4 w-full">
      <PreviewRow label="token variants">
        <Token label="purple"  variant="purple" />
        <Token label="green"   variant="green" />
        <Token label="cyan"    variant="cyan" />
        <Token label="pink"    variant="pink" />
        <Token label="orange"  variant="orange" />
        <Token label="yellow"  variant="yellow" />
        <Token label="red"     variant="red" />
      </PreviewRow>
      <PreviewRow label="dismissible">
        <Token label="ml-agent"  variant="purple" onDismiss={() => {}} />
        <Token label="scanner"   variant="green"  onDismiss={() => {}} />
        <Token label="critical"  variant="red"    onDismiss={() => {}} />
      </PreviewRow>
      <div className="w-full bg-ds-panel border border-ds-current rounded-ds-md p-4">
        <TokenGroup
          label="Active filters"
          tokens={tokens}
          onDismiss={dismiss}
          maxVisible={4}
        />
        {tokens.length === 0 && (
          <button
            onClick={() => setTokens(INITIAL_TOKENS)}
            className="mt-2 text-xs text-ds-purple hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  )
}

export default function TokenPage() {
  return (
    <ComponentBlock
      num="02.P4"
      title="Token / TokenGroup"
      tag="7 colors · dismissible · collapse"
      description="Token is a pill chip representing a removable selection. TokenGroup wraps multiple tokens with a label, dismiss-all action, and +N overflow collapse."
      preview={<LiveDemo />}
      code={CODE}
      filename="Token.tsx"
      props={[...PROPS_TOKEN, ...PROPS_GROUP]}
    />
  )
}
