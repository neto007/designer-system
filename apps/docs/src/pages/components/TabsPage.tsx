import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shieldai/ds'
import { ComponentBlock } from '../../components/docs'

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
    />
  )
}
