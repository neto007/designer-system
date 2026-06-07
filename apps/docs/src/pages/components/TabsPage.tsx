import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shieldai/ds'
import { ComponentBlock, DocSection, PlaygroundBlock } from '../../components/docs'
import type { ControlValues } from '../../components/docs'

const CODE = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shieldai/ds'

<Tabs defaultValue="preview">
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
    <TabsTrigger value="props">Props</TabsTrigger>
  </TabsList>

  <TabsContent value="preview">
    Live component preview
  </TabsContent>
  <TabsContent value="code">
    Code snippet here
  </TabsContent>
  <TabsContent value="props">
    Props table here
  </TabsContent>
</Tabs>

// Controlled
<Tabs value={activeTab} onValueChange={setActiveTab}>
  ...
</Tabs>`

const PLAYGROUND_CONTROLS = [
  { type: 'text' as const, key: 'tab1Label', label: 'tab1Label', default: 'Tab One' },
  { type: 'text' as const, key: 'tab2Label', label: 'tab2Label', default: 'Tab Two' },
  { type: 'text' as const, key: 'tab3Label', label: 'tab3Label', default: 'Tab Three' },
]

function generateCode(v: ControlValues): string {
  return `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shieldai/ds'

<Tabs defaultValue="1">
  <TabsList>
    <TabsTrigger value="1">{${v.tab1Label}}</TabsTrigger>
    <TabsTrigger value="2">{${v.tab2Label}}</TabsTrigger>
    <TabsTrigger value="3">{${v.tab3Label}}</TabsTrigger>
  </TabsList>
  <TabsContent value="1"><p>Content for ${v.tab1Label}</p></TabsContent>
  <TabsContent value="2"><p>Content for ${v.tab2Label}</p></TabsContent>
  <TabsContent value="3"><p>Content for ${v.tab3Label}</p></TabsContent>
</Tabs>`
}

const PROPS = [
  { name: 'defaultValue', type: 'string', description: 'Initial active tab (uncontrolled)' },
  { name: 'value', type: 'string', description: 'Active tab (controlled)' },
  { name: 'onValueChange', type: '(value: string) => void', description: 'Called when active tab changes' },
]

export default function TabsPage() {
  return (
    <ComponentBlock
      num="02.11"
      title="Tabs"
      tag="Radix UI · accessible · animated"
      description="Keyboard-accessible tab navigation built on Radix Tabs. Active tab gets a purple underline indicator with glow. Supports controlled and uncontrolled modes."
      preview={
        <div className="w-full max-w-lg">
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Overview</TabsTrigger>
              <TabsTrigger value="tab2">Details</TabsTrigger>
              <TabsTrigger value="tab3">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <div className="p-4 text-ds-comment text-sm">Overview content — agent summary and status.</div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="p-4 text-ds-comment text-sm">Detailed execution logs and trace output.</div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="p-4 text-ds-comment text-sm">Agent configuration and model parameters.</div>
            </TabsContent>
          </Tabs>
        </div>
      }
      code={CODE}
      filename="Tabs.tsx"
      props={PROPS}
    >
      <DocSection title="Interactive Playground">
        <p className="text-ds-comment text-[13px] leading-relaxed mb-4">
          Tweak tab labels and see the result live. The generated code updates instantly.
        </p>
        <PlaygroundBlock
          controls={PLAYGROUND_CONTROLS}
          render={(v) => {
            const [tab, setTab] = useState('1')
            return (
              <div className="w-full max-w-lg">
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList>
                    <TabsTrigger value="1">{v.tab1Label as string}</TabsTrigger>
                    <TabsTrigger value="2">{v.tab2Label as string}</TabsTrigger>
                    <TabsTrigger value="3">{v.tab3Label as string}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="1">
                    <div className="p-4 text-ds-comment text-sm">Content for {v.tab1Label as string}</div>
                  </TabsContent>
                  <TabsContent value="2">
                    <div className="p-4 text-ds-comment text-sm">Content for {v.tab2Label as string}</div>
                  </TabsContent>
                  <TabsContent value="3">
                    <div className="p-4 text-ds-comment text-sm">Content for {v.tab3Label as string}</div>
                  </TabsContent>
                </Tabs>
              </div>
            )
          }}
          generateCode={generateCode}
          filename="Tabs.tsx"
        />
      </DocSection>
    </ComponentBlock>
  )
}
